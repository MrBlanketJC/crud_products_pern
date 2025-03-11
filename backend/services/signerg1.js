const fs = require('fs');
const { SignedXml } = require('xml-crypto');
const { DOMParser } = require('xmldom');
const forge = require('node-forge');

async function firmarXml(xmlPath, p12Path, p12Password, outputPath) {
  try {
    const p12Content = fs.readFileSync(p12Path).toString('binary');
    const p12Der = forge.util.decode64(forge.util.encode64(p12Content));
    const p12 = forge.pkcs12.pkcs12FromAsn1(forge.asn1.fromDer(p12Der), p12Password);
    const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
    const keyBag = keyBags[Object.keys(keyBags)[0]];
    const privateKey = forge.pki.privateKeyToPem(keyBag.key);

    const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
    if (certBags && Object.keys(certBags).length > 0) {
      const certBag = certBags[Object.keys(certBags)[0]];
      if (certBag && certBag.certificate) {
        const certificate = forge.pki.certificateToPem(certBag.certificate);

        const xml = fs.readFileSync(xmlPath, 'utf8');
        const xmlDoc = new DOMParser().parseFromString(xml);

        const sig = new SignedXml();
        sig.signingKey = privateKey;
        sig.addReference("//*[local-name(.)='factura']");
        sig.addReference("//*[local-name(.)='infoFactura']");
        sig.addReference("//*[local-name(.)='detalles']");
        sig.addReference("//*[local-name(.)='infoAdicional']");
        sig.addCert(certificate);
        sig.computeSignature(xmlDoc);
        const signedXml = sig.getSignedXml();

        fs.writeFileSync(outputPath, signedXml);
        console.log(`XML firmado y guardado en: ${outputPath}`);
      } else {
        console.error('Error: No se encontró el certificado en el archivo .p12.');
      }
    } else {
      console.error('Error: No se encontraron certificados en el archivo .p12.');
    }
  } catch (error) {
    console.error('Error al firmar el XML:', error);
  }
}

// Ejemplo de uso
firmarXml('factura.xml', 'digital.p12', 'Minchala2023', 'factura_firmada.xml');