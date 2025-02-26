const { create } = require('xmlbuilder2');

function generateXML(invoice) {
    const { customer, details, totalinvoice, dateinvoice } = invoice;

    // Generar el XML
    const xml = create({ version: '1.0', encoding: 'UTF-8' })
        .ele('factura', { id: 'comprobante', version: '1.0.0' })
            .ele('infoTributaria')
                .ele('ambiente').txt('1').up() // 1: Producción, 2: Pruebas
                .ele('tipoEmision').txt('1').up() // 1: Normal, 2: Contingencia
                .ele('razonSocial').txt('Tu Empresa S.A.').up()
                .ele('nombreComercial').txt('Tu Empresa').up()
                .ele('ruc').txt('1234567890001').up()
                .ele('claveAcceso').txt('clave_acceso_generada').up() // Generar clave de acceso
                .ele('codDoc').txt('01').up() // 01: Factura
                .ele('estab').txt('001').up()
                .ele('ptoEmi').txt('001').up()
                .ele('secuencial').txt('000000001').up()
                .ele('dirMatriz').txt('Av. Principal 123').up()
            .up() // Cerrar infoTributaria
            .ele('infoFactura')
                .ele('fechaEmision').txt(dateinvoice).up()
                .ele('dirEstablecimiento').txt('Av. Principal 123').up()
                .ele('obligadoContabilidad').txt('NO').up()
                .ele('tipoIdentificacionComprador').txt('04').up() // 04: RUC
                .ele('razonSocialComprador').txt(customer.name).up()
                .ele('identificacionComprador').txt(customer.ruc).up()
                .ele('totalSinImpuestos').txt(totalinvoice).up()
                .ele('totalDescuento').txt('0.00').up()
                .ele('totalConImpuestos')
                    .ele('totalImpuesto')
                        .ele('codigo').txt('2').up() // 2: IVA
                        .ele('codigoPorcentaje').txt('2').up() // 12%
                        .ele('baseImponible').txt(totalinvoice).up()
                        .ele('valor').txt((totalinvoice * 0.12).toFixed(2)).up() // Calcular IVA
                    .up() // Cerrar totalImpuesto
                .up() // Cerrar totalConImpuestos
                .ele('propina').txt('0.00').up()
                .ele('importeTotal').txt((totalinvoice * 1.12).toFixed(2)).up() // Total con IVA
                .ele('moneda').txt('DOLAR').up()
            .up() // Cerrar infoFactura
            .ele('detalles')
                .ele('detalle')
                    .ele('codigoPrincipal').txt('001').up()
                    .ele('descripcion').txt('Producto 1').up()
                    .ele('cantidad').txt('2').up()
                    .ele('precioUnitario').txt('50.00').up()
                    .ele('descuento').txt('0.00').up()
                    .ele('precioTotalSinImpuesto').txt('100.00').up()
                    .ele('impuestos')
                        .ele('impuesto')
                            .ele('codigo').txt('2').up() // 2: IVA
                            .ele('codigoPorcentaje').txt('2').up() // 12%
                            .ele('tarifa').txt('12.00').up()
                            .ele('baseImponible').txt('100.00').up()
                            .ele('valor').txt('12.00').up()
                        .up() // Cerrar impuesto
                    .up() // Cerrar impuestos
                .up() // Cerrar detalle
            .up() // Cerrar detalles
        .up() // Cerrar factura
        .end({ prettyPrint: true }); // Formatear el XML para que sea legible

    return xml;
}

module.exports = generateXML;