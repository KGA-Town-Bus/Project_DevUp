module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Messages',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // uid: {
      //   type: DataTypes.BIGINT,
      //   allowNull: true,
      // },
      // role: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // rid: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
    },
    {
      freezeTableName: true,
    },
  );
};

// client_offset: {
//   type: DataTypes.STRING,
//   allowNull: true,
//   unique: true,
//   defaultValue: null,
// },
