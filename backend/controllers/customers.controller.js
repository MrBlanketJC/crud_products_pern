const pool = require('../config/db')

//GetCustomers
const getCustomers =  async (req, res) => {
    try {
        const result = await pool.query("select * from customers")
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getCustomers
}