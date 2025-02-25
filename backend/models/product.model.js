const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    idproduct: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codeproduct: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    descriptionproduct: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    priceproduct: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true
    },
    stock:{
        type: DataTypes.DECIMAL(10, 4),
        allowNull: true
    },
    statusproduct: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false // Cambia esto a true si tienes campos createdAt y updatedAt en la tabla
});

module.exports = Product;
