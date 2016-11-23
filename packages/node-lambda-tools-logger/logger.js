'use strict';

const levels = { error : 5, warn : 4, info : 3, debug : 2 };

/**
 A bare-bones logger utility for generating structured
 logs inside a node 4.3.2 lambda.

### Install
```
npm install --save node-lambda-tools-logger
```

### Usage
Provides the usual {@link Logger#error}, {@link Logger#warn}, {@link Logger#info}, and {@link Logger#debug}

Logs messages are formatted like this where the `name` component will only be used if given in the logger's constructor :
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
        // 'name' will be used as the first keyval pair of the log string... if given
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
     * @param  {string|Object} msg   Message string to be logged or Object which will be appended to the log in the format <code>key1=value1, key2=value2</code>|
     * @param  {string} level log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`. Warning
     */
    log(msg, level) {
        if (!level || typeof level !== 'string' || !levels[level]) {
            throw new TypeError(`Level must be one of [${levels.keys.join(', ')}].`)
        }
        let keyVals = {}
        if (levels[level] >= this.level) {
            if (typeof msg === 'string') {
                keyVals = { msg }
            } else if (Object.prototype.toString.call(msg) === '[object Object]') {
                keyVals = msg
            } else {
                throw new TypeError(`Unsupported message type ${typeof msg}`)
            }
            // Append all the items in the object to the output string in the desired format.
            console.log(Object.keys(keyVals).reduce((acc, key) => {
                if (key === 'name' || key === 'level' || key === 'time'){
                    return acc; //ignore
                }
                else {
                    // Anything with a toString (inluding string and Errors)
                    let val = keyVals[key]
                    val = val.toString ? val.toString() : val;
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
     * @param  {string} msg Error message to be logged. If in the form of an object, the keys/values will be appended to the log in the format <code>key1=value1, key2=value2</code>
     */
    error(msg) { this.log(msg, 'error'); }
    /**
     * Emit warn level log
     * @param  {string} msg Warning message to be logged. If in the form of an object, the keys/values will be appended to the log in the format <code>key1=value1, key2=value2</code>
     */
    warn(msg) { this.log(msg, 'warn'); }
    /**
     * Emit info level log
     * @param  {string} msg Info message to be logged. If in the form of an object, the keys/values will be appended to the log in the format <code>key1=value1, key2=value2</code>
     */
    info(msg) { this.log(msg, 'info'); }
    /**
     * Emit debug level log
     * @param  {string} msg Debug message to be logged. If in the form of an object, the keys/values will be appended to the log in the format <code>key1=value1, key2=value2</code>
     */
    debug(msg) { this.log(msg, 'debug'); }
}

module.exports = Logger;
