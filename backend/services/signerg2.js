const fs = require('fs');
const { SignedXml } = require('xml-crypto');
const { DOMParser } = require('xmldom');

async function firmarXml(xmlPath, pemPrivateKeyPath, pemCertificatePath, outputPath) {
  try {
    const privateKey = fs.readFileSync(pemPrivateKeyPath, 'utf8');
    const certificate = fs.readFileSync(pemCertificatePath, 'utf8');

    const xml = fs.readFileSync(xmlPath, 'utf8');
    console.log("contenido de xml: ", xml); // Agregar esta línea
    const xmlDoc = new DOMParser().parseFromString(xml);

    const sig = new SignedXml();
    sig.signingKey = privateKey;
    sig.addReference("//*[local-name(.)='test']", ["http://www.w3.org/2000/09/xmldsig#enveloped-signature", "http://www.w3.org/2001/10/xml-exc-c14n#"], "http://www.w3.org/2001/04/xmlenc#sha256");
    sig.addCert(certificate);
    sig.computeSignature(xmlDoc);
    const signedXml = sig.getSignedXml();

    fs.writeFileSync(outputPath, signedXml);
    console.log(`XML firmado y guardado en: ${outputPath}`);
  } catch (error) {
    console.error('Error al firmar el XML:', error);
  }
}

// Ejemplo de uso
firmarXml('test.xml', 'privatekey.pem', 'certificate.pem', 'test_firmado.xml');