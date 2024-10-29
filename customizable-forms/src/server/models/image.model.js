module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true,
    tableName: 'Images'
  });

  return Image;
};
