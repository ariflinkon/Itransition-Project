// src/server/models/image.model.js
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
      image: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Image;
  };
  