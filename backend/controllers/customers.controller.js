const { json } = require('sequelize');
const Customer = require('../models/customer.model')


//GetCustomers
const getCustomers =  async (req, res) => {
    try {
        const customer = await Customer.findAll({order: [['idcustomer', 'ASC']]})
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

//GetCustomerByID
const getCustomerByID = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByPk(id)
        if(!customer) return res.status(404).json({error: 'Record not found!'})
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Create
const createCustomer = async (req, res) =>{
    try {
        const customer = await Customer.create(req.body)
        res.status(201).json(customer)
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "El documento ya está registrado" });
          }
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: "Formato de email imvalido" });
        }
        res.status(500).json({error: error.message})
    }
}

//Update
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    // const { documentcustomer, firstnamecustomer, lastnamecustomer, emailcustomer, phonecustomer } = req.body;
    
    try {
        const customer = await Customer.findByPk(id)
        if (!customer) return res.status(404).json({error: 'Record not found!'})
        await customer.update(req.body)
        // await customer.update({ firstnamecustomer, phonecustomer }); // Actualiza solo los campos proporcionados
        res.status(200).json(customer)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Delete 
const deleteCustomer = async (req, res) =>{
    const {id} = req.params;
    try {
        const customer = await Customer.findByPk(id);
        if(!customer) return res.status(404).json({error: 'Record not found!'})
        await customer.destroy();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const checkDuplicateCustomer = async (req, res) => {
    try {
      const { documentcustomer } = req.params; // Obtener el parámetro desde la URL
  
      if (!documentcustomer) {
        return res.status(400).json({ error: "El documento es requerido" });
      }
  
      const customer = await Customer.findOne({ where: { documentcustomer } });
  
      if (customer) {
        return res.json({ exists: true }); // El cliente ya existe
      } else {
        return res.json({ exists: false }); // No existe
      }
    } catch (error) {
      console.error("Error al verificar cliente:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };


module.exports = {
    getCustomers,
    getCustomerByID,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    checkDuplicateCustomer
}