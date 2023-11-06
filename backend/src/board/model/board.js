module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Posts',
    {
      Posts_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Posts_title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Posts_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Posts_writer: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Posts_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      Posts_hit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Posts_like: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    },
  );
};
