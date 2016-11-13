<a name="Logger"></a>

## Logger
A bare-bones logger utility for generating structured
 logs inside a node 4.3.2 lambda.

### Install
```
npm install --save-dev node-lambda-tools-logger
```

### Usage
Provides the usual [error](#Logger+error), [warn](#Logger+warn), [info](#Logger+info), and [debug](#Logger+debug)

Logs messages are formatted like this where the `name` component will only be used if given in the logger's constructor :
```
name=<name>, level=<level>, msg=<msg>
```

**Kind**: global class  

* [Logger](#Logger)
    * [new Logger([name], [level])](#new_Logger_new)
    * [.setLevel(level)](#Logger+setLevel) ⇒ <code>[Logger](#Logger)</code>
    * [.log(msg, [level])](#Logger+log)
    * [.error(msg)](#Logger+error)
    * [.warn(msg)](#Logger+warn)
    * [.info(msg)](#Logger+info)
    * [.debug(msg)](#Logger+debug)

<a name="new_Logger_new"></a>

### new Logger([name], [level])
Create a logger


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>string</code> |  | Optional name to give the logger. This will be added to all log bodies. |
| [level] | <code>string</code> | <code>&quot;info&quot;</code> | Optional minimum level to output. Defaults to `info` |

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
| msg | <code>string</code> |  | Message to be logged |
| [level] | <code>string</code> | <code>&quot;info&quot;</code> | Optional log level to be used in `error`, `warn`, `info`, `debug`. Defaults to `info`. |

<a name="Logger+error"></a>

### logger.error(msg)
Emit error level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Error message to be logged |

<a name="Logger+warn"></a>

### logger.warn(msg)
Emit warn level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Warning message to be logged |

<a name="Logger+info"></a>

### logger.info(msg)
Emit info level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Info message to be logged |

<a name="Logger+debug"></a>

### logger.debug(msg)
Emit debug level log

**Kind**: instance method of <code>[Logger](#Logger)</code>  

| Param | Type | Description |
| --- | --- | --- |
| msg | <code>string</code> | Debug message to be logged |
