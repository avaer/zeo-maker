# zeo-maker

Make signed valid [zeo](https://github.com/modulesio/zeo) items from a keypair and asset specification.

Pass keypair as JWT JSON on stdin. Args are asset name, quantity, owner.

#### Example: wood

```
$ node index.js ITEM.WOOD '{"privateKey":{"crv":"P-256","d":"BXHWuE1sHVHg1PlZLDqr7mrbD8AnFFXznCds2zJfL_0","ext":true,"key_ops":["sign"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"},"publicKey":{"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"}}'
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

#### Example: skin

```
$ node index.js ITEM.SKIN '{"privateKey":{"crv":"P-256","d":"BXHWuE1sHVHg1PlZLDqr7mrbD8AnFFXznCds2zJfL_0","ext":true,"key_ops":["sign"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"},"publicKey":{"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"}}' -d '{"name": "Rey","data": "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"}'
```

#### Output

```
{
  "_zeo_item": true,
  "asset": "ITEM.SKIN",
  "quantity": 1,
  "nonce": "7d25284bf7ff2e121e5c0fe24bd702d9210cd2b299879f3fbae8a525f91cea5d",
  "timestamp": 1507966164205,
  "json": {
    "name": "Rey",
    "data": "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"
  },
  "certificate": [
    {
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
      "signature": "Nha/KQ7NHuXvwUwWttz2ZrtY/1hIhmhJn0fsjykv4K+9POu3esdnYBQU8lrIVvW4DviNv2G7GHxYJq9jwnBKIw=="
    }
  ]
}
```
