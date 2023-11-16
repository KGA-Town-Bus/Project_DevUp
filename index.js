const db = require('./backend/src/lib/db');
const frontApp = require('./frontend/app');
const backApp = require('./backend/app');
const {parsing: tokenParsing} = require('./backend/src/lib/jwtAuthMiddleware');

const {createServer} = require('node:http');

const {Server} = require('socket.io');
const {BadRequest} = require('./backend/src/lib/customException');

const server = createServer(backApp);

const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://devup.hyunjun.kr',
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;

  const user = await tokenParsing(token);
  socket.user = user;
  if (user !== null) {
    console.log("성공")
    console.log(user);
    next();
  } else {
    console.log("실패")
    //예외처리
  }
});

const Messages = db.Messages;

console.log(Messages);

frontApp.listen(3000, () => {
  console.log(`Frontend START: 3000`);
});

// backApp.listen(4000, async () => {
//   await db.sequelize.sync({force: false});
//   console.log(`Backend START: 4000`);
// });

server.listen(4000, async () => {
  await db.sequelize.sync({force: false});

  const data = ['admin', 'user'];

  for (const row of data) {
    await db.Role.findOrCreate({
      where: {Role_authority: row},
      defaults: row,
    });
  }
  console.log(`Backend START: 4000`);
});

let users = {};

io.on('connection', async socket => {
  socket.emit('userinfo', socket.user);
  console.log('a userinfo has been handed to the client');

  socket.on('register', uid => {
    users[uid] = socket.id;
    console.log(`${uid} connected with ${socket.id}`);
  });

  if (!socket.recovered) {
    try {
      const missedMessages = await Messages.findAll({
        include: [
          {
            model: db.Users,
            attributes: ['Users_profile', 'Users_nickname'],
          },
        ],
      });

      missedMessages.forEach(message => {
        const userinfo = message.User.dataValues;

        const senderInfo = {
          profile: userinfo.Users_profile,
          nickname: userinfo.Users_nickname,
        };
        socket.emit(
            'chat message',
            message.content,
            message.createdAt.toLocaleString(),
            senderInfo,
        );
      });
    } catch (e) {
      console.error('Error retrieving missed messages:', e);
    }
  }

  socket.on('chat message', async msg => {
    let result;
    try {
      result = await Messages.create({
        content: msg,
        Users_uid: socket.user.Users_uid,
        Users_profile: socket.user.Users_profile,
      });
      const senderInfo = {
        profile: socket.user.Users_profile,
        nickname: socket.user.Users_nickname,
      };
      io.emit(
          'chat message',
          msg,
          result.createdAt.toLocaleString(),
          senderInfo,
      );
    } catch (e) {
      console.error('error saving message:', e);
    }
  });

  // specialized features

  // socket.on("chat message", (msg) => {
  //   if (msg === "join") {
  //     socket.join("room 1");
  //     console.log("you joined room 1");
  //   }
  // });

  // socket.on("chat message", (msg) => {
  //   if (msg.includes("to")) io.to("room 1").emit("roommsg", `you're included`);
  // });

  // socket.on("chat message", (msg) => {
  //   if (msg.includes("except"))
  //     io.except("room 1").emit("excluderoom", `you're not excluded`);
  // });

  // socket.on("chat message", (msg) => {
  //   if (msg === "leave") {
  //     socket.leave("room 1");
  //     console.log("A user left the room");
  //   }
  // });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});


io.of("/visitors").use(
    async (socket, next) => {
      const token = socket.handshake.auth.token;

      const user = await tokenParsing(token);
      socket.user = user;
      if (user !== null) {
        next();
      } else {
        //예외처리
      }
    }
)


let userList = []
io.of("/visitors").on("connection", (socket) => {
  userList.push(socket.user)
  io.of("/visitors").emit('userList', userList);


  socket.on('disconnect', () => {

    userList = userList.filter((user) => {
      return user.Users_uid !== socket.user.Users_uid
    })
    io.of("/visitors").emit('userExit', userList);
    clearInterval(socket.interval);
  });
})



module.exports = io;

