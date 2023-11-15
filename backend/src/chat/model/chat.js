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
        type: DataTypes.STRING,
        allowNull: false,
      },
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
