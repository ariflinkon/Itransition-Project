module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      formId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Form',
          key: 'id'
        }
      },
      open: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      questionText: {
        type: DataTypes.STRING
      },
      questionImage: {
        type: DataTypes.STRING,
        defaultValue: ""
      }
    }, {
      timestamps: false,
      tableName: 'Questions'
    });
  
    Question.associate = (models) => {
      Question.hasMany(models.Option, { foreignKey: 'questionId' });
    };
  
    return Question;
  };
  