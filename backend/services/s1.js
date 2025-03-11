const fs = require('fs');
const {signInvoiceXml} = require('ec-sri-invoice-signer')
/* Puedes user require() si usas módulos commonJS. */

/* El XML de la factura a firmarse. */
// const invoiceXml = '<factura id="comprobante>...</factura>';
const invoiceXml = '<?xml version="1.0" encoding="UTF-8"?><factura Id="comprobante" version="1.1.0"> <infoTributaria>...</infoTributaria><infoFactura>...</infoFactura><detalles>...</detalles><factura>';

/* El contenido del archivo pkcs12 (.p12/.pfx extension) del firmante representado como Node Buffer o string base64.
En este caso es un Node Buffer. */
const p12FileData = fs.readFileSync('d.p12');

/* Firma la factura. Si no se pasa la opción pkcs12Password, '' será usada como contraseña. */
const signedInvoice = signInvoiceXml(invoiceXml, p12FileData, { pkcs12Password: 'Minchala2023' });

console.log(signedInvoice);