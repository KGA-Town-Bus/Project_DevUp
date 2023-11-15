module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Likes',
    {
      Likes_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Likes_create_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
