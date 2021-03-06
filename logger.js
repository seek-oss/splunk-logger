'use strict';

const levels = { error : 5, warn : 4, info : 3, debug : 2 };

/**
 Generates Splunk consumable logs in node 4.3.2 AWS Lambdas.

### Install
```
npm install --save @seek/splunk-logger
```

### Usage
Provides the usual {@link Logger#error}, {@link Logger#warn}, {@link Logger#info}, and {@link Logger#debug}

Log messages are formatted like this where the `name` component will only be used if given in the logger's constructor :
```
name=<name>, level=<level>, msg=<msg>
```

*/
class Logger {
    /**
     * Create a logger
     *
     * @param  {string} [name]  Optional name to give the logger. This will be added to all log bodies.
     * @param  {string} [level=info] Optional minimum level to output. Defaults to `info`
     */
    constructor(name, level) {
        level = level || 'info'
        // 'name' will be used as the third keyval pair of the log string... if given
        this.name = name
        this.formattedName = name ? `, name=${JSON.stringify(name)}` : '';
        this.setLevel(level);
    }

    /**
     * Set the minimum log level to output
     *
     * @param  {string} level Should be one of `error`, `warn`, `info`, `debug`
     * @return {Logger}       this Logger instance
     */
    setLevel(level) {
        if (!levels[level]) {
            throw new TypeError(`unknown error level ${level}`);
        }
        this.level = levels[level];
        return this;
    }


    /**
     * Emit a log message at the given level
     *
     * @param  {*} msg   Thing to be logged. If given an object literal it will be appended to the log in the format `<code>key1=value1, key2=value2</code>`
     * @param  {string} level log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`.
     */
    log(msg, level) {
        if (!level || typeof level !== 'string' || !levels[level]) {
            throw new TypeError(`Level must be one of [${levels.keys.join(', ')}].`)
        }
        let keyVals = {}
        if (levels[level] >= this.level) {
            if (Object.prototype.toString.call(msg) === '[object Object]') {
                keyVals = msg
            } else {
                keyVals = { msg: `${msg}`}
            }
            // Append all the items in the object to the output string in the desired format.
            console.log(Object.keys(keyVals).reduce((acc, key) => {
                if (key === 'name' || key === 'level' || key === 'time'){
                    return acc; //ignore
                }
                else {
                    let val = keyVals[key]
                    val = Object.prototype.toString.call(val) === '[object Object]' ? val : `${val}`;
                    // Append and escape/quote
                    return `${acc}, ${key}=${JSON.stringify(val)}`;
                }
                // This  might look a bit gnarly -> it's the initial value for the reduce function's accumulator
                // i.e the first component of our log string!
            }, `time=${new Date().toISOString()}, level=${level}${this.formattedName}`));
        }
    }

    /**
     * Emit error level log
     * @param  {*} msg   Thing to be logged. See {@link log}
     */
    error(msg) { this.log(msg, 'error'); }
    /**
     * Emit warn level log
     * @param  {*} msg   Thing to be logged. See {@link log}
     */
    warn(msg) { this.log(msg, 'warn'); }
    /**
     * Emit info level log
     * @param  {*} msg   Thing to be logged. See {@link log}
     */
    info(msg) { this.log(msg, 'info'); }
    /**
     * Emit debug level log
     * @param  {*} msg   Thing to be logged. See {@link log}
     */
    debug(msg) { this.log(msg, 'debug'); }
}

module.exports = Logger;
