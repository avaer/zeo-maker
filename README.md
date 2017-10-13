# zeo-maker

Make signed valid [zeo](https://github.com/modulesio/zeo) items from a keypair and asset specification.

Pass keypair as JWT JSON on stdin. Args are asset name, quantity, owner.

#### Input

```
$ echo '{"privateKey":{"crv":"P-256","d":"xfud757LZVtHzgPvpp-pHkOJdTeGcCXyzvQCROOqROE","ext":true,"key_ops":["sign"],"kty":"EC","x":"-PiEitmrgXYzJQQCnaDgy0R1-D5qdQDM-tjB4H4KW8","y":"J3ELB8qZNRmcCLi0fQ7eQGTM3jB3hyjDtEtJApai8sE"},"publicKey":{"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"-PiEitmrgXYzJQQCnaDgy0R1e-D5qdQDM-tjB4H4KW8","y":"J3ELB8qZNRmcCLi0fQ7eQGTM3jB3hyjDtEtJApai8sE"}}' | node index.js ITEM.WOOD 10 noob
```

#### Output

```
{
  "_zeo_item": true,
  "asset": "ITEM.WOOD",
  "quantity": 10,
  "owner": "noob",
  "timestamp": 1507903177313,
  "certificate": [
    {
      "vrid": "noob",
      "publicKey": {
        "usages": [
          "verify"
        ],
        "native_": {
          "type": 408
        },
        "extractable": true,
        "algorithm": {
          "name": "ECDSA",
          "namedCurve": "P-256"
        },
        "type": "public"
      },
      "timestamp": 1507903177313,
      "signature": "+ZDRmH3I7fbdnlgkTbHGO/lgSRx7LevqLc9JYGXxoJrvtoNGHe6u6GYKxJVL0bGabH/eK/kYdvFW1HulQwhokg=="
    }
  ]
}
```
