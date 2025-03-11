const fs = require('fs');
const pkcs12 = require('pkcs12js');
const forge = require('node-forge');

const p12Buffer = fs.readFileSync('digital.p12');
const p12 = pkcs12.parse(p12Buffer, 'Minchala2023');

const privateKey = forge.pki.privateKeyToPem(p12.keys[0]);
const certificate = forge.pki.certificateToPem(p12.certs[0]);

// Leer el archivo XML
const xml = fs.readFileSync('factura.xml', 'utf-8');

// Crear una instancia de SignedXml
const { SignedXml } = require('xml-crypto');
const sig = new SignedXml();

// Configurar la firma
sig.addReference("//*[local-name(.)='YourElementToSign']");
sig.signingKey = privateKey;
sig.keyInfoProvider = {
  getKeyInfo: () => `<X509Data><X509Certificate>${forge.util.encode64(p12.certs[0].raw)}</X509Certificate></X509Data>`,
};

// Firmar el XML
sig.computeSignature(xml);

// Obtener el XML firmado
const signedXml = sig.getSignedXml();

// Guardar el XML firmado
fs.writeFileSync('signed_file.xml', signedXml);

console.log('XML firmado correctamente.');
