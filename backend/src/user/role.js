module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      "Role",
      {
        Role_authority: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
      },
      {
        freezeTableName: true,
        timestamps: false
      },
  );
};