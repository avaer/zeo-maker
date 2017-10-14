const crypto = require('crypto');

const program = require('commander');
const cryptoSubtle = (new (require('node-webcrypto-ossl'))).subtle;

function _importPublicKey(publicKey) {
  return cryptoSubtle.importKey('jwk', publicKey, {
    name:'ECDSA',
    namedCurve: 'P-256',
  }, true, ['verify']);
}
function _importPrivateKey(privateKey) {
  return cryptoSubtle.importKey('jwk', privateKey, {
    name:'ECDSA',
    namedCurve: 'P-256',
  }, true, ['sign']);
}
function _importKey(key) {
  return Promise.all([
    _importPublicKey(key.publicKey),
    _importPrivateKey(key.privateKey),
  ])
    .then(([
      publicKey,
      privateKey,
    ]) => ({
      publicKey,
      privateKey,
    }));
}

program
  .version('0.0.1')
  .option('-d, --data <json>', 'Json data')
  .arguments('<asset> <cert>')
  .action((asset, cert) => {
    const j = JSON.parse(cert);
    const timestamp = Date.now();
    _importKey(j)
      .then(({publicKey, privateKey}) => {
        const assetSpec = {
          _zeo_item: true,
          asset,
          quantity: 1,
          nonce: crypto.randomBytes(32).toString('hex'),
          timestamp,
        };
        if (program.data) {
          assetSpec.json = JSON.parse(program.data);
        }

        return cryptoSubtle.sign({
          name: 'ECDSA',
          hash: {
            name: 'SHA-256',
          },
        }, privateKey, new Buffer(JSON.stringify(assetSpec), 'utf8'))
          .then(signature => new Buffer(signature, 'utf8').toString('base64'))
          .then(signature => {
            assetSpec.certificate = [
              {
                publicKey,
                signature,
              },
            ];

            process.stdout.write(JSON.stringify(assetSpec, null, 2));
          });
      })
      .catch(err => {
        console.warn(err);
      });
  })
  .parse(process.argv);
