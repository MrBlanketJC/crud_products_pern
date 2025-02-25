const Invoice = require('../models/invoice.model')
const Customer = require('../models/customer.model')

//GetAll
const getInvoice = async (req, res) => {
    try {
        const result = await Invoice.findAll({
            include: [
                {
                    model: Customer,
                    as: "customer", // Debe coincidir con el alias definido en la relación
                    attributes: ["idcustomer", "firstnamecustomer", "lastnamecustomer"],
                },
            ],
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message });
    }
}

//GetByID
const getInvoiceByID = async (req, res) =>{
    const { id } = req.params;
    try {
        const result = await Invoice.findByPk(id)
        if (!result) return res.status(404).json({error: 'Record Not Found!'})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Create
const createInvoice = async (req, res) =>{
    try {
        const result = await Invoice.create(req.body)
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Update 
const updateInvoice = async (req, res) =>{
    try {
        const { id } = req.params;
        const result = await Invoice.findByPk(id)
        if(!result) return res.status(404).json({error: 'Record not Found!'})
        await Invoice.update(req.body)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

//Delete 
const deleteInvoice = async (req, res) =>{
    try {
        const {id} = req.params;
        const result = await Invoice.findByPk(id)
        if(!result) return res.status(404).json({error: 'Record not found!'})
        await Invoice.destroy()
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    getInvoice,
    getInvoiceByID,
    createInvoice,
    updateInvoice,
    deleteInvoice
}