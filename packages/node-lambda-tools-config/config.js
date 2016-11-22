'use strict';

const aws = require('aws-sdk');

// Cached config -> only need to load it when the container starts
let configPromise;

/**
 A tool to decrypt [KMS]{@link https://aws.amazon.com/kms/} encrypted values saved in config files.

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

@module config
@param  {Object} config  A config object which may contain a child `kms` object who's values are KMS ciphertext
@return {Promise}       A (cached) promise to the loaded config which will be resolved with all kms values decrypted.
*/
module.exports = (config) => {
    configPromise = configPromise || new Promise((resolve, reject) => {
        if(!config) {
            reject(new TypeError('Expected raw config object'))
        }
        let configRaw = JSON.parse(JSON.stringify(config)); // Clone
        // Decode the keys in the kms field
        const kms = new aws.KMS();
        const decryptedKeyPromises = [];
        Object.keys(configRaw.kms || {}).forEach((key) => {
            decryptedKeyPromises.push(
                new Promise((res, rej) => { // eslint-disable-line promise/param-names
                    kms.decrypt(
                        { CiphertextBlob: new Buffer(configRaw.kms[key], 'base64') },
                        (err, data) => {
                            if (err) {
                                rej(err.stack);
                            } else {
                                configRaw.kms[key] = data.Plaintext.toString('utf8');
                                res();
                            }
                        });
                }));
        });

        // Only resolve once all the keys have been decrypted
        Promise.all(decryptedKeyPromises)
            .then(() => {
                resolve(configRaw);
            })
            .catch((err) => { reject(err); });
    });

    return configPromise;
};
