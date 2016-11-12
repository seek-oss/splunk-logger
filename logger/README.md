<a name="Logger"></a>

## Logger
A bare-bones logger utility for generating structured
 logs inside a node 4.3.1 lambda to be consumed by splunk.

**Kind**: global class  

* [Logger](#Logger)
    * [new Logger(name)](#new_Logger_new)
    * [.setLevel(level)](#Logger+setLevel) ⇒ <code>[Logger](#Logger)</code>
    * [.log(msg, [level])](#Logger+log)
    * [.error(msg)](#Logger+error)
    * [.warn(msg)](#Logger+warn)
    * [.info(msg)](#Logger+info)
    * [.debug(msg)](#Logger+debug)

<a name="new_Logger_new"></a>

### new Logger(name)
Create a logger


| Param | Type | Description |
| --- | --- | --- |
| name | <code>type</code> | description |

<a name="Logger+setLevel"></a>

### logger.setLevel(level) ⇒ <code>[Logger](#Logger)</code>
Set the minimum log level to output

**Kind**: instance method of <code>[Logger](#Logger)</code>  
**Returns**: <code>[Logger](#Logger)</code> - this Logger instance  

| Param | Type | Description |
| --- | --- | --- |
| level | <code>string</code> | Should be one of `error`, `warn`, `info`, `debug` |

<a name="Logger+log"></a>

### logger.log(msg, [level])
Emit a log message at the given level

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| msg | <code>type</code> |  | Message to be logged |
| [level] | <code>type</code> | <code>info</code> | The log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`. |

<a name="Logger+error"></a>

### logger.error(msg)
Emit error level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message to be logged |

<a name="Logger+warn"></a>

### logger.warn(msg)
Emit warn level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message to be logged |

<a name="Logger+info"></a>

### logger.info(msg)
Emit info level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message to be logged |

<a name="Logger+debug"></a>

### logger.debug(msg)
Emit debug level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Message to be logged |
