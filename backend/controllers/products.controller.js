const pool = require('../config/db')

//GetAll
const getAllProducts = async (req, res) =>{
    try {
        const result = await pool.query("SELECT * FROM products")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//GetProductByID
const getProductByID = async (req, res) =>{
    const { id } = req.params
    try {
        const result = await pool.query("SELECT * from products where idproduct = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Product no found"})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Create
const createProdut = async (req, res) =>{
    const { codeproduct, descriptionproduct, priceproduct } = req.body
    try {
        const result = await pool.query("INSERT INTO products (codeproduct, descriptionproduct, priceproduct, statusproduct) values ($1, $2, $3, true) RETURNING *", [codeproduct, descriptionproduct, priceproduct])
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Update
const updateProduct = async(req, res) =>{
    const { id } = req.params
    const { codeproduct, descriptionproduct, priceproduct } = req.body
    try {
        const result = await pool.query("UPDATE products SET codeproduct=$2, descriptionproduct=$3, priceproduct=$4 WHERE idproduct=$1 RETURNING *", [id, codeproduct, descriptionproduct, priceproduct])
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Error - Product no update"})
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Delete
const deleteProduct = async (req, res) =>{
    const { id } = req.params
    try {
        const result = await pool.query("DELETE FROM products where idproduct = $1", [id])
        if (result.rowCount === 0) {
            return res.status(404).json({message: "Product no found"})
        }
        return res.sendStatus(204);
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