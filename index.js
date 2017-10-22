#!/usr/bin/env node

const fs = require('fs');
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
function _readFile(p, opts) {
  return new Promise((accept, reject) => {
    fs.readFile(p, opts, (err, data) => {
      if (!err) {
        accept(data);
      } else {
        reject(err);
      }
    });
  });
}

program
  .version('0.0.1')
  .option('-d, --data <json>', 'Json data')
  .option('-s, --skin <img-file>', 'Skin data')
  .option('-q, --quantity <number>', 'Item quantity')
  .arguments('<asset> <keysJsonFile>')
  .action((asset, keysJsonFile) => {
    _readFile(keysJsonFile, 'utf8')
      .then(keysJsonFileString => {
        const j = JSON.parse(keysJsonFileString);
        const timestamp = Date.now();
        _importKey(j)
          .then(({publicKey, privateKey}) => {
            let quantity = parseInt(program.quantity);
            if (!(quantity > 0)) {
              quantity = 1;
            }

            const assetSpec = {
              _zeo_item: true,
              id: crypto.randomBytes(32).toString('hex'),
              asset,
              quantity,
              timestamp,
            };

            const _continue = assetSpec => cryptoSubtle.sign({
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

            if (program.data) {
              assetSpec.json = JSON.parse(program.data);
              return _continue(assetSpec);
            } else if (program.skin) {
              return _readFile(program.skin, 'base64')
                .then(data => {
                  const basename = program.skin.replace(/\.[^.]*$/, '');

                  assetSpec.json = {
                    name: basename,
                    data: data,
                  };
                  return _continue(assetSpec);
                });
            } else {
              return _continue(assetSpec);
            }
          })
          .catch(err => {
            console.warn(err);
          });
      });
  })
  .parse(process.argv);
