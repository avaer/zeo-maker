const WebCrypto = require('node-webcrypto-ossl');
const crypto = new WebCrypto();

function _importPublicKey(publicKey) {
  return crypto.subtle.importKey('jwk', publicKey, {
    name:'ECDSA',
    namedCurve: 'P-256',
  }, true, ['verify']);
}
function _importPrivateKey(privateKey) {
  return crypto.subtle.importKey('jwk', privateKey, {
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

const asset = process.argv[2];
const quantity = parseInt(process.argv[3], 10);
const vrid = process.argv[4];

const bs = [];
process.stdin.on('data', d => {
  bs.push(d);
});
process.stdin.on('end', () => {
  const b = Buffer.concat(bs);
  const s = b.toString('utf8');
  const j = JSON.parse(s);
  const timestamp = Date.now();
  _importKey(j)
    .then(({publicKey, privateKey}) => {
      const assetSpec = {
        asset,
        quantity,
        owner: vrid,
        timestamp,
      };

      crypto.subtle.sign({
        name: 'ECDSA',
        hash: {
          name: 'SHA-256',
        },
      }, privateKey, new Buffer(JSON.stringify(assetSpec), 'utf8'))
        .then(signature => new Buffer(signature, 'utf8').toString('base64'))
        .then(signature => {
          assetSpec.certificate = [
            {
              vrid,
              publicKey,
              timestamp,
              signature,
            },
          ];

          process.stdout.write(JSON.stringify(assetSpec, null, 2));
        })
        .catch(err => {
          console.warn(err);
        });
    });
});
