// src/server/models/form.model.js
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    questions: {
      type: DataTypes.JSON,
      allowNull: false
    },
    stared: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    formType: {
      type: DataTypes.STRING,
      defaultValue: "anonymous"
    }
  }, {
    timestamps: true,
    tableName: 'Forms'
  });

  return Form;
};
