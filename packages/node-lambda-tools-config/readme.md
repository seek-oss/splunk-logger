<a name="module_config"></a>

## config ⇒ <code>Promise</code>
A tool to decrypt [KMS](https://aws.amazon.com/kms/) encrypted values saved in config files.

### Install
```
npm install --save node-lambda-tools-config
```

### Usage
The user that is running the lambda will need `kms:Decrypt` permission to the master key used for generating the ciphertext.
To reduce KMS overhead the config is only read in once. Subsequent requires will return the same config.

#### myConfig.json
```javascript
{
    "foo" : "bar",
    "kms" {
        "secretToHappiness" : "base64_encoded_ciphertext"
    }
}
```
#### handler.js
```javascript
const myConfig = require('./myConfig')
const config  = require('config')(myConfig)

config.then(resolved => {
    console.log(resolved.foo) // "bar"
    console.log(resolved.kms.secretToHappiness) // "eat more chocolate"
}).catch(err => {
    console.log(err, "Oh dear perhaps you are missing KMS permissions")
})
...
```

**Returns**: <code>Promise</code> - A (cached) promise to the loaded config which will be resolved with all kms values decrypted.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Object</code> | A config object which may contain a child `kms` object who's values are KMS ciphertext |

