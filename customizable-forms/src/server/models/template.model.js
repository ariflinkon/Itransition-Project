module.exports = (sequelize, Sequelize) => {
  const Template = sequelize.define('template', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  // Define association: A Template has many Questions
  Template.associate = (models) => {
    Template.hasMany(models.Question, { foreignKey: 'templateId' });
  };

  return Template;
};
