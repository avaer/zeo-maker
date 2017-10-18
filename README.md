# zeo-maker

Make signed [Zeo](https://github.com/modulesio/zeo) items from a keypair and asset specification.

#### Installation

```
$ npm i -g zeo-maker
```

#### Usage

```
$ zeo-maker <assetName> <keysJsonFile> [-d <data>] [-s <skinImgFile>] [-q <quantity>]
```

#### How it works

1. Download your VRID's `keys.json` from [my.zeovr.io](https://my.zeovr.io/)
1. Use `zeo-maker` with your `keys.json` to generate the item you want. If the item is free you don't have to do anything else. If the item is secure your `keys.json` must be the keypair for the public key of the item, or else the item won't work if you try to load it.
1. Import your item to your VRID at [my.zeovr.io](https://my.zeovr.io/)

#### Example: wood

```
$ cat keys.json
{"privateKey":{"crv":"P-256","d":"BXHWuE1sHVHg1PlZLDqr7mrbD8AnFFXznCds2zJfL_0","ext":true,"key_ops":["sign"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"},"publicKey":{"crv":"P-256","ext":true,"key_ops":["verify"],"kty":"EC","x":"S_8irE80Ci5uSTm-tfo4hEuAuNYnzHdDUavcMam-eRg","y":"dVJq5kdkXuKfSoKC7oOcqNkWV2JfHybqd9AGrjuD_zU"}}
$ zeo-maker ITEM.WOOD keys.json >wood.json
$ cat wood.json
{
  "_zeo_item": true,
  "id": "uHnk7nAnNiFh3Xseqlh3R0PVtYCTcnMpX4tSDeGMWHA=",
  "asset": "ITEM.WOOD",
  "quantity": 100,
  "timestamp": 1508365936705,
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
      "signature": "5zNosfy3AnVB7mgjoMfU0OHvl+PMipY0Y1NAujiu2aUufW86hFn8TfIX2WkssWDBd+ItlakY2zw8iYIyB2bjYw=="
    }
  ]
}
```

#### Example: skin

```
$ file skin.png
skin.png: PNG image data, 64 x 64, 8-bit/color RGBA, non-interlaced
$ zeo-maker ITEM.SKIN keys.json -s skin.png >skin.json
$ cat skin.json
{
  "_zeo_item": true,
  "id": "0B1/UEAPnEvr/CHoeO9IuoQsxnZSXg8pHrblPISPCCE=",
  "asset": "ITEM.SKIN",
  "quantity": 1,
  "timestamp": 1508365958337,
  "json": {
    "name": "skin",
    "data": "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADXElEQVR4Xu1aPWzTQBT+LrFjO4AYaAWyVPEXZWGAqSCFCQRiQKwwMTKyMkaZ2BlB3WFkQuwEiU5dWCKhYimKWqX8SRCnqZNDz3ZKm6YKzvmii3MnRYqj3Hf3vve9+3nPDAve2ILbD02AVsCCM6BDYMEFoBdB5UOgXC7zbreLYrEI3/dhmiboOZfLYTAYoNlsCtkg1HkW4VMqlUICtpvNcLhl14XjOAiCIHz2PE/IBqHOsyDAdV3ebrXQ26gdGu78gzXYto1GoyFkg1DnWRBgApyMf/SkitcvIxKG31fuv8p+CBSLRf7n47OxXDs3ntN6IOREoc6zUADfqHEa5+1aDZttwC4Al5aAu4+r4fDsWlXIBqHOsyTguLEyT0DnFPgOA1ZyAOjDAT/aAOAYAPshdpZRXgGyVaYJkM2w6vhaAap7SPb8tAJkM6w6vlaA6h6SPT+tANkMq46vFaC6h2TPTytANsOq42sFqO4h2fPTCpDNsOr4WgGjHqpUKmEamtqHp5tgD1uJSNo7TWlLwOjHIAYQ7CMC5i+xJCZ3wdd3I+yTDLiyI4Z3xDjHcTgVHfP5PDqdDo0zFQEhCTkgGPyj2MgD7HsyvFEHfV0G/9IHKiawNQAutMXwjhhn2zbnnIfVV2q+709NwLj4T0MB3h6wPQBWTYBtSSBgqAAqR4soYJQAgwHsp9iEP50B/82BW3aEzlpieMeGwO5uHGgiIZAHgngtIONpqqKFjLBUdq8Krx+p4Pq3lAmwLIuT/GPvp6oAAhMOgbhWuH67KicEqBrb7/eRhgKkrAExAYTt3anKWQQJnN7KiJtai+ABAkJ5pl0dLhQKnLZA1UNg3ztpE0D1V8uy5iIEpCggKkAfaosVAmkRQKdAovLgMTjNXUBmCIxbvDP7WyJ5Z5EFTUAWvZrEpiMK4G9cfvPFxX2Mer0+VyrpngWv7wHncsAJNvm6PM648BxA9wE6Evd6vbkiYJgwWS0AXjAFAcOECN0F6KXkpPmAJPKT8d/PS+DkeUqaUMZo0m1xrAJEDkIyjEqCOcwYXc5HvSZljDJHAK0BFhlP59l3tYmXpcwRQBmjqwZgvY/eLJ90W8wcAaECYuMXkoDh2+X/e1fInAI0AQkzRloBY/ZYoYRIkj1bxn+ThsBfAfBPUAvkqSIAAAAASUVORK5CYII="
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
      "signature": "M4731UmhrbYfqlOzZFs3BH6VJhUL7o5EVXctJ/Th8bjwkkWuZLCJrVWP/qFGYaeIWehUlRTlPnvCAHZcjHp7Yw=="
    }
  ]
}
```
