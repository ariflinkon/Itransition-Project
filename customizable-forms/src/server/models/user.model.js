module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user"
      },
      isBlocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    return User;
  };
  