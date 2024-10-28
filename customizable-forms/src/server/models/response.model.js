// src/server/models/response.model.js
module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define('Response', {
    formId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Forms', 
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.STRING
    },
    response: {
      type: DataTypes.JSON // Storing responses as JSON
    }
  }, {
    timestamps: true,
    tableName: 'Responses'
  });

  return Response;
};
