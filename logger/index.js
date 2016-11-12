'use strict';

const levels = { error : 5, warn : 4, info : 3, debug : 2 };

/**
 A bare-bones logger utility for generating structured
 logs inside a node 4.3.1 lambda to be consumed by splunk.
*/
class Logger {

    /**
     * Create a logger
     *
     * @param  {type} name  description
     * @return {type}       description
     */
    constructor(name) {
        // 'name' will be used as the first keyval pair of the log string... if given
        this.formattedName = name ? `name=${name}, ` : '';
        this.level = levels.info; // Default to info
    }

    /**
     * Set the minimum log level to output
     *
     * @param  {string} level Should be one of `error`, `warn`, `info`, `debug`
     * @return {Logger}       this Logger instance
     */
    setLevel(level) {
        if (!levels[level]) {
            throw new Error(`unknown error level ${level}`);
        }
        this.level = levels[level];
        return this;
    }


    /**
     * Emit a log message at the given level
     *
     * @param  {type} msg   Message to be logged
     * @param  {type} [level] The log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`.
     */
    log(msg, level = 'info') {
        if (level && levels[level] && levels[level] >= this.level)
            console.log(`${this.formattedName}level=${level}, msg=${msg}`);
    }

    /**
     * Emit error level log
     * @param  {string} msg Message to be logged
     */
    error(msg) { this.log(msg, 'error'); }
    /**
     * Emit warn level log
     * @param  {string} msg Message to be logged
     */
    warn(msg) { this.log(msg, 'warn'); }
    /**
     * Emit info level log
     * @param  {string} msg Message to be logged
     */
    info(msg) { this.log(msg, 'info'); }
    /**
     * Emit debug level log
     * @param  {string} msg Message to be logged
     */
    debug(msg) { this.log(msg, 'debug'); }
}

module.exports = Logger;
