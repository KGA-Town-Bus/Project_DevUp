module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
      "Comments",
      {
        Comments_uid: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },

        Comments_content: {
          type: DataTypes.STRING,
          allowNull: false,
        },

        Comments_created_at: {
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