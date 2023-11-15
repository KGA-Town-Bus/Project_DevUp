const db = require('./backend/src/lib/db');
const frontApp = require('./frontend/app');
const backApp = require('./backend/app');
const {parsing: tokenParsing} = require("./backend/src/lib/jwtAuthMiddleware")

const {createServer} = require('node:http');

const {Server} = require('socket.io');
const {BadRequest} = require("./backend/src/lib/customException");

const server = createServer(backApp);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  const user = await tokenParsing(token)

  if (user !== null) {
    console.log(user)
    next()
  } else {
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

  const data = ["admin", "user" ];

  for (const row of data) {
    await db.Role.findOrCreate({
      where: { Role_authority:row },
      defaults: row,
    });
  }
  console.log(`Backend START: 4000`);
});

io.on('connection', async socket => {
  console.log('a user connected');

  if (!socket.recovered) {
    try {
      const missedMessages = await Messages.findAll();

      missedMessages.forEach(message => {
        socket.emit('chat message', message.content, message.id);
      });
    } catch (e) {
    }
  }

  socket.on('chat message', async msg => {
    let result;
    try {
      result = await Messages.create(
          {content: msg},
          {
            raw: true,
          },
      );
    } catch (e) {
      console.error('error saving message:', e);
    }
    io.emit('chat message', msg);
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

module.exports = io;