const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql',
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Import models
db.user = require('./user.model.js')(sequelize, Sequelize);
db.template = require('./template.model.js')(sequelize, Sequelize);
db.form = require('./form.model.js')(sequelize, Sequelize);
db.question = require('./question.model.js')(sequelize, Sequelize);

// Associations
db.template.hasMany(db.question, { foreignKey: 'templateId' });  // A Template has many Questions
db.question.belongsTo(db.template, { foreignKey: 'templateId' }); // A Question belongs to a Template

module.exports = db;
