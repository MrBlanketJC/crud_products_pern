/**
 * Para sincronizar la DB al implementar en un tabla Sequelice
 * SOlo se eejcuta una vez con node sync.js
 */

const sequelize = require("./config/db");
const Model = require("./models/product.model");

async function syncDB() {
  try {
    await sequelize.authenticate();
    console.log("Conexión con la base de datos establecida.");

    await sequelize.sync({ alter: true }); // `alter: true` ajusta la estructura de la tabla sin borrar datos
    console.log("Modelo sincronizado con la base de datos.");
  } catch (error) {
    console.error("Error al conectar la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

syncDB();
