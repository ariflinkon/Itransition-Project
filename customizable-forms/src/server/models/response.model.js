module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    formId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Form',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    tableName: 'Responses'
  });

  Response.associate = (models) => {
    Response.hasMany(models.ResponseDetail, { foreignKey: 'responseId' });
  };

  return Response;
};
