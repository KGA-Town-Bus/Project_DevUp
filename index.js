require('dotenv').config();
const db = require('./backend/src/lib/db');
const frontApp = require('./frontend/app');
const backApp = require('./backend/app');

const frontPort = process.env.FRONTEND_SERVER_PORT;
const backPort = process.env.BACKEND_SERVER_PORT;

frontApp.listen(frontPort, () => {
  console.log(`Frontend START: ${frontPort}`);
});

backApp.listen(backPort, async () => {
  await db.sequelize.sync({force: false});
  console.log(`Backend START: ${backPort}`);
});
