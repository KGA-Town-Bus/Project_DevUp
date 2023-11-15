module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Images', // 모델 이름
    {
      Files_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Posts_uid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Files_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Files_original_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Files_created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      freezeTableName: true, // Sequelize가 모델 이름을 복수형으로 바꾸지 않도록 설정
      timestamps: false, // Sequelize가 createdAt과 updatedAt 컬럼을 자동으로 추가하지 않도록 설정
    },
  );
};
