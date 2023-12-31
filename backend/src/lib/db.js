const Sequelize = require('sequelize');
const {upgrade} = require('nodemailer/.ncurc');
require('dotenv').config();
const db = {};

const config = {
  host: process.env['DB_HOST'],
  dialect: process.env['DB_DIALECT'],
};

const sequelize = new Sequelize(
  process.env['DB_DATABASE'],
  process.env['DB_USERNAME'],
  process.env['DB_PASSWORD'],
  config
);

const entityList = [
  `../user/user`,
  '../user/role',
  `../email/email`,
  `../board/model/board`,
  '../comment/comment',
  // `../board/model/comments`,
  `../board/model/likes`,
  `../chat/model/chat`,
];

entityList.forEach((entity, index) => {
  const model = require(entityList[index])(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

db.Users.hasOne(db.Mail, {
  foreignKey: 'Users_uid',
});
db.Mail.belongsTo(db.Users, {
  foreignKey: 'Users_uid',
});

db.Users.hasMany(db.Posts, {
  foreignKey: 'Users_uid',
});
db.Posts.belongsTo(db.Users, {
  foreignKey: 'Users_uid',
});

db.Posts.hasMany(db.Likes, {
  foreignKey: 'Posts_uid',
});
db.Likes.belongsTo(db.Posts, {
  foreignKey: 'Posts_uid',
});

db.Users.hasMany(db.Likes, {
  foreignKey: 'Users_uid',
});
db.Likes.belongsTo(db.Users, {
  foreignKey: 'Users_uid',
});

db.Role.hasMany(db.Users, {
  foreignKey: 'Role_authority',
});

db.Users.belongsTo(db.Role, {
  foreignKey: 'Role_authority',
});

db.Comments.belongsTo(db.Posts, {
  foreignKey: 'Posts_uid',
});

db.Posts.hasMany(db.Comments, {
  foreignKey: 'Posts_uid',
});

db.Comments.belongsTo(db.Users, {
  foreignKey: 'Users_uid',
});

db.Users.hasMany(db.Comments, {
  foreignKey: 'Users_uid',
});

db.Comments.belongsTo(db.Comments, {
  foreignKey: 'Comments_uid2',
  as: "ParentComment"
});

db.Comments.hasMany(db.Comments, {
  foreignKey: 'Comments_uid2',
  as: "Replies"
});

db.Messages.belongsTo(db.Users, {
  foreignKey: 'Users_uid',
});

db.Users.hasMany(db.Messages, {
  foreignKey: 'Users_uid',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
