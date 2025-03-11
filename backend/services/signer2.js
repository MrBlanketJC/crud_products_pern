const fs = require('fs');
const { SignedXml } = require('xml-crypto');
const forge = require('node-forge');

// Leer el archivo P12
// const p12Buffer = fs.readFileSync('digital.p12');
// const p12Buffer = fs.readFileSync('digital.p12', { encoding: 'binary' });
const p12Buffer = fs.readFileSync('digital.p12', null);
console.log('P12 Buffer:', p12Buffer);
const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'), false);
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, 'Minchala2023');

// Extraer la clave privada y el certificado
const keyObj = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[forge.pki.oids.pkcs8ShroudedKeyBag][0];
const certObj = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag][0];

const privateKey = forge.pki.privateKeyToPem(keyObj.key);
const certificate = forge.pki.certificateToPem(certObj.cert);

// Leer el archivo XML
const xml = fs.readFileSync('factura.xml', 'utf-8');

// Crear una instancia de SignedXml
const sig = new SignedXml();

// Configurar la firma
sig.addReference("//*[local-name(.)='YourElementToSign']");
sig.signingKey = privateKey;
sig.keyInfoProvider = {
  getKeyInfo: () => `<X509Data><X509Certificate>${forge.util.encode64(certObj.cert.raw)}</X509Certificate></X509Data>`,
};

// Firmar el XML
sig.computeSignature(xml);

// Obtener el XML firmado
const signedXml = sig.getSignedXml();

// Guardar el XML firmado
fs.writeFileSync('signed_file.xml', signedXml);

console.log('XML firmado correctamente.');
