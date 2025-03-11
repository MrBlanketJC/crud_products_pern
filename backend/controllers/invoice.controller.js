const { sequelize } = require("../config/db"); // Para transacciones
const Invoice = require('../models/invoice.model')
const Customer = require('../models/customer.model')
const InvoiceDetail = require("../models/invoicedetail.model"); // Asegúrate de importar el modelo correcto\

const generateXML = require('./xmlGenerator'); // Importar la función generadora de XML

//GetAll
// const getInvoices = async (req, res) => {
//     try {
//         const result = await Invoice.findAll({
//             include: [
//               {
//                 model: Customer,
//                 as: "customer",
//                 attributes: ["idcustomer", "firstnamecustomer", "lastnamecustomer"],
//               }
//             ],
//           });
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json({error: error.message });
//     }
// }

// //GetByID
// const getInvoiceByID = async (req, res) =>{
//     const { id } = req.params;
//     try {
//         const result = await Invoice.findByPk(id)
//         if (!result) return res.status(404).json({error: 'Record Not Found!'})
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }

//Create
// const createInvoice = async (req, res) =>{
//     try {
//         const result = await Invoice.create(req.body)
//         res.status(201).json(result)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }
// Crear una factura con detalles usando transacciones
// const createInvoice = async (req, res) => {
//     const { idcustomer, dateinvoice, totalinvoice, details } = req.body;
  
//     if (!idcustomer || !dateinvoice || !details || details.length === 0) {
//       return res.status(400).json({ error: "Datos insuficientes para crear la factura" });
//     }
  
//     const transaction = await sequelize.transaction(); // Iniciamos transacción
  
//     try {
//       // Crear la factura
//       const invoice = await Invoice.create({ idcustomer, dateinvoice, totalinvoice }, { transaction });
  
//       // Agregar detalles de la factura
//       const detailsWithInvoiceId = details.map(detail => ({
//         ...detail,
//         idinvoice: invoice.idinvoice,
//       }));
  
//       await InvoiceDetail.bulkCreate(detailsWithInvoiceId, { transaction }); // Insertar en bloque
  
//       await transaction.commit(); // Si todo va bien, confirmamos los cambios
  
//       // Obtener la factura con sus detalles después de guardarla
//       const fullInvoice = await Invoice.findByPk(invoice.idinvoice, {
//         include: [
//           { model: Customer, as: "customer", attributes: ["idcustomer", "firstnamecustomer", "lastnamecustomer"] },
//           {
//             model: InvoiceDetail,
//             as: "details",
//             include: [{ model: Product, as: "product", attributes: ["idproduct", "nameproduct", "price"] }],
//           },
//         ],
//       });
  
//       res.status(201).json(fullInvoice);
//     } catch (error) {
//       await transaction.rollback(); // Si algo falla, revertimos los cambios
//       res.status(500).json({ error: error.message });
//     }
//   };

// Crear una nueva factura
const createInvoice = async (req, res) => {
  const { idcustomer, dateinvoice, totalinvoice, invoiceDetails } = req.body;

  console.log("Cuerpo de la solicitud:", JSON.stringify(req.body, null, 2)); // Imprimir todo el cuerpo de la solicitud
  console.log("DETALLES:", JSON.stringify(invoiceDetails, null, 2)); // Intentar imprimir details

  try {
      // Calcular el total de la factura basado en los detalles
    //   let totalinvoice = 0;
    //   details.forEach(detail => {
    //       totalinvoice += detail.quantity * detail.unitprice;
    //   });

      // Crear la factura
      const newInvoice = await Invoice.create({
          idcustomer,
          dateinvoice,
          totalinvoice
      });

      // Crear los detalles de la factura
      const invoiceDetailsNew = invoiceDetails.map(detail => ({
          idinvoice: newInvoice.idinvoice, // Asignar el ID de la factura recién creada
          idproduct: detail.idproduct,
          quantity: detail.quantity,
          unitprice: detail.price,
          totalprice: detail.quantity * detail.price // Calcular el total por producto
      }));

      await InvoiceDetail.bulkCreate(invoiceDetailsNew); // Guardar los detalles en la base de datos


      //XML
      // Generar el XML de la factura
      const invoiceData = {
            customer: { name: 'Cliente S.A.', ruc: '0987654321001' }, // Datos del cliente
            details: invoiceDetailsNew, // Detalles de la factura
            totalinvoice: totalinvoice, // Total de la factura
            dateinvoice: dateinvoice // Fecha de emisión
        };

        const xml = generateXML(invoiceData);

        // Guardar el XML en un archivo (opcional)
        const fs = require('fs');
        fs.writeFileSync(`factura_${newInvoice.idinvoice}.xml`, xml);
      //FIN
      
      // Respuesta al frontend
      res.status(201).json({ message: 'Factura creada exitosamente', invoice: newInvoice, xml: xml });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear la factura', error: error.message });
  }
};

// //Update 
// const updateInvoice = async (req, res) =>{
//     try {
//         const { id } = req.params;
//         const result = await Invoice.findByPk(id)
//         if(!result) return res.status(404).json({error: 'Record not Found!'})
//         await Invoice.update(req.body)
//         res.status(200).json(result)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }

// //Delete 
// const deleteInvoice = async (req, res) =>{
//     try {
//         const {id} = req.params;
//         const result = await Invoice.findByPk(id)
//         if(!result) return res.status(404).json({error: 'Record not found!'})
//         await Invoice.destroy()
//         res.sendStatus(204)
//     } catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }

module.exports = {
    createInvoice
}