module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      "Users",
      {
        Users_uid: {
          type: DataTypes.int,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        Users_id:{
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        Users_password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      },
  );
};