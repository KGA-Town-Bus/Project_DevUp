module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Comments',
    {
      Comment_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Posts_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Posts',
          key: 'Posts_uid',
        },
      },
      Comment_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Comment_writer: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      Comment_created_at: {
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
