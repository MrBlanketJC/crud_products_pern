const { Sequelize } = require("sequelize");
const { db } = require('./config')

const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: "postgres",
  logging: false, // Puedes activar esto si quieres ver las consultas en la consola
});


module.exports = sequelize;