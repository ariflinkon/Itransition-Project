module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdForms: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'Users'
  });

  return User;
};
