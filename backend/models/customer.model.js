const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Customer = sequelize.define("Customer", {
  idcustomer: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  documentcustomer: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  firstnamecustomer: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  lastnamecustomer: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  emailcustomer: {
    type: DataTypes.STRING(20),
    validate: {
      isEmail: true, // Valida que sea un correo electrónico
    },
  },
  phonecustomer: {
    type: DataTypes.STRING(20),
  },
  statuscustomer: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Por defecto, los clientes estarán activos
  },
}, {
  tableName: "customers", // Especificamos el nombre exacto de la tabla en la BD
  timestamps: false, // Evita que agregue createdAt y updatedAt automáticamente
});

module.exports = Customer;
