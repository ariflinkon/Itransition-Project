module.exports = (sequelize, DataTypes) => {
    const ResponseDetail = sequelize.define('ResponseDetail', {
      responseId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Response',
          key: 'id'
        }
      },
      questionId: {
        type: DataTypes.STRING
      },
      optionId: {
        type: DataTypes.STRING
      }
    }, {
      timestamps: false,
      tableName: 'ResponseDetails'
    });
  
    return ResponseDetail;
  };
  