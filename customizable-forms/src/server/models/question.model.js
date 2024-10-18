module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define('question', {
/*     title: {
      type: Sequelize.STRING,
      allowNull: false,
    }, */
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    templateId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'templates',
        key: 'id',
      },
    },
  });

  // Define association: A Question belongs to a Template
  Question.associate = (models) => {
    Question.belongsTo(models.Template, { foreignKey: 'templateId' });
  };

  return Question;
};
