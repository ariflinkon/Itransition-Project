module.exports = (sequelize, Sequelize) => {
  const Form = sequelize.define('form', {
    templateId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    responses: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  });

  return Form;
};
