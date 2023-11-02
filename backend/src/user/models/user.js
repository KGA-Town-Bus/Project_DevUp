module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      "Users",
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        pw: {
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