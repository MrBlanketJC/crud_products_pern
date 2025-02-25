const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Product = require('./product.model')

const InvoiceDetail = sequelize.define("InvoiceDetail", {
    idinvoicedetail: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idinvoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "invoice",
            key: "idinvoice"
        }
    },
    idproduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "idproduct"
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unitprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    totalprice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: "invoice_details",
    timestamps: false
})

//Relacion definir
InvoiceDetail.belongsTo(Product, {
    foreignKey: "idproduct",
    as: "products"
})

module.exports = InvoiceDetail;