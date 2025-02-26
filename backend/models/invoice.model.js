const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const Customer = require('./customer.model')

const Invoice = sequelize.define("Invoice", {
    idinvoice: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idcustomer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "customers",
            key: "idcustomer"
        }
    },
    dateinvoice: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalinvoice: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false
    }
}, {
    tableName: "invoice",
    timestamps: false
});

module.exports = Invoice;