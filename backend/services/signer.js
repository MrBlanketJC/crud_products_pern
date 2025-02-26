const fs = require('fs');
const { SignedXml } = require('xml-crypto');
const forge = require('node-forge');

const signXML = (xmlPath, signedXmlPath, p12Path, password) => {
    try {
        // Cargar el certificado .p12
        const p12Buffer = fs.readFileSync(p12Path);
        const p12Asn1 = forge.asn1.fromDer(p12Buffer.toString('binary'), false);
        const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, false, password);

        // Extraer clave privada
        const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag });
        const privateKey = forge.pki.privateKeyToPem(keyBags[forge.pki.oids.pkcs8ShroudedKeyBag][0].key);

        // Extraer certificado
        const certBags = p12.getBags({ bagType: forge.pki.oids.certBag });
        const certificate = forge.pki.certificateToPem(certBags[forge.pki.oids.certBag][0].cert);

        // Leer el XML a firmar
        const xml = fs.readFileSync(xmlPath, 'utf-8');

        // Crear firma
        const sig = new SignedXml();
        sig.addReference("//*[local-name(.)='factura']", [
            "http://www.w3.org/2000/09/xmldsig#enveloped-signature"
        ]);
        sig.signingKey = privateKey;
        sig.computeSignature(xml);

        // Guardar el XML firmado
        const signedXml = sig.getSignedXml();
        fs.writeFileSync(signedXmlPath, signedXml);
        console.log("Factura firmada con éxito.");
        return signedXml;
    } catch (error) {
        console.error("Error al firmar el XML:", error);
        throw new Error("No se pudo firmar el XML.");
    }
};

module.exports = { signXML };
