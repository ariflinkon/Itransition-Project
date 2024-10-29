module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User', 
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: ""
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

  Form.associate = (models) => {
    Form.hasMany(models.Question, { foreignKey: 'formId' });
  };

  return Form;
};
