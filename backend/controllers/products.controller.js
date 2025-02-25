const { json } = require('sequelize');
const Product = require('../models/product.model')

//GetAll
const getAllProducts = async (req, res) =>{
    try {
        const result = await Product.findAll({order: [['idproduct', 'ASC']]})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//GetProductByID
const getProductByID = async (req, res) =>{
    const { id } = req.params
    try {
        const result = await Product.findByPk(id)
        if(!result) return res.status(404).json({error: 'Record not found!'})
            res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Create
const createProdut = async (req, res) =>{
    const { codeproduct, descriptionproduct, priceproduct } = req.body
    try {
        const result = await Product.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Update
const updateProduct = async(req, res) =>{
    const { id } = req.params
    const { codeproduct, descriptionproduct, priceproduct } = req.body
    try {
        const result = await Product.findByPk(id)
        if (!result) return res.status(404).json({error: 'Record not found!'})
        await result.update(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Delete
const deleteProduct = async (req, res) =>{
    const { id } = req.params
    try {
        const result = await Product.findByPk(id)
        if(!result) return res.status(404).json({error: 'Record not found!'})
        await result.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getAllProducts,
    getProductByID,
    createProdut,
    updateProduct,
    deleteProduct
}