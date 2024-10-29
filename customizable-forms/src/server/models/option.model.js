module.exports = (sequelize, DataTypes) => {
    const Option = sequelize.define('Option', {
      questionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Question',
          key: 'id'
        }
      },
      optionText: {
        type: DataTypes.STRING
      },
      optionImage: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    }, {
      timestamps: false,
      tableName: 'Options'
    });
  
    return Option;
  };
  