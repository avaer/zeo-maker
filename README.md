# zeo-maker

Make signed [Zeo](https://github.com/modulesio/zeo) items from a keypair and asset specification.

#### Usage

```
$ node index.js <assetName> <keysJsonFile> [-d <data>] [-s <skinImgFile>]
```

#### How it works

1. Download your VRID's `keys.json` from [my.zeovr.io](https://my.zeovr.io/)
1. Use `zeo-maker` with your `keys.json` to generate the item you want. If the item is free you don't have to do anything else. If the item is secure your `keys.json` must be the keypair for the public key of the item, or else the item won't work if you try to load it.
1. Import your item to your VRID at [my.zeovr.io](https://my.zeovr.io/)

#### Example: wood

```
$ cat keys.json
{"privateKey":{"crv":"P-256","d":"BXHWuE1sHVHg1PlZLDqr7mrbD8AnFFXznCds2zJfL_0","ext":true,"key_ops":["sign"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"},"publicKey":{"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"}}
$ node index.js ITEM.WOOD keys.json >wood.json
$ cat wood.json
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

#### Example: skin

```
$ cat skin.png
skin.png: PNG image data, 64 x 64, 8-bit/color RGBA, non-interlaced
$ node index.js ITEM.SKIN keys.json -s skin.png >skin.json
$ cat skin.json
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
