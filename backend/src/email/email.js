module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      "Mail",
      {
        Mail_link: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        // Users_uid: {
        //   type: DataTypes.INTEGER,
        //   allowNull: true,
        // },
        Mail_check: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        Mail_created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('now()')
        },
      },
      {
        freezeTableName: true,
        timestamps: false

      },
  );
};