const Invoice = require('./invoice.model');
const InvoiceDetail = require('./invoicedetail.model');
const Customer = require('./customer.model');
const Product = require('./product.model');

// Relación entre Invoice y Customer
Invoice.belongsTo(Customer, {
    foreignKey: "idcustomer",
    as: "customer", // 🔴 Este alias debe ser único
});

// Relación entre Invoice e InvoiceDetail
Invoice.hasMany(InvoiceDetail, {
    foreignKey: "idinvoice",
    as: "details", // 🔴 Este alias debe ser único
});

// Relación entre InvoiceDetail y Product
InvoiceDetail.belongsTo(Product, {
    foreignKey: "idproduct",
    as: "product", // 🔴 Este alias debe ser único
});

// Relación entre InvoiceDetail e Invoice
InvoiceDetail.belongsTo(Invoice, {
    foreignKey: "idinvoice",
    as: "invoice", // 🔴 Este alias debe ser único
});