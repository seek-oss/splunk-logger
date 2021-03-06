'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

const Logger = require('../logger')

describe('Logger', () => {
    let logger;
    beforeEach(function() {
        sinon.spy(console, 'log');
    });

    afterEach(function() {
        console.log.restore();
    });

    describe('constructor', () => {

        it('should build a default instance with no name and info log level', () => {
            logger = new Logger();
            expect(logger.name).to.be.undefined;
            logger.level.should.equal(3)
        });

        it('should build a logger instance with the given level and name', () => {
            logger = new Logger('test', 'error');
            logger.name.should.equal('test');
            logger.level.should.equal(5)
        });

        it('should throw TypeError if given a bogus level', () => {
            expect(() => { new Logger('test', 'bogus')}).to.throw(TypeError);
        });
    });

    describe('setLevel', () => {

        it('should set the level correctly', () => {
            logger = new Logger();
            logger.setLevel('error')
            logger.level.should.equal(5)
        });

        it('should throw TypeError if given a bogus level', () => {
            logger = new Logger();
            expect(() => { logger.setLevel('bogus') }).to.throw(TypeError)
        });
    });

    describe('log', () => {

        it('should throw TypeError if given a bogus level', () => {
            logger = new Logger();
            expect(() => { logger.log('msg', 'bogus') }).to.throw(TypeError)
        });

        it('should throw TypeError not given a level', () => {
            logger = new Logger();
            expect(() => { logger.log('msg') }).to.throw(TypeError)
        });

        it('should throw TypeError if level is not a string', () => {
            logger = new Logger();
            expect(() => { logger.log('msg', {}) }).to.throw(TypeError)
        });

        it('should print the correct log mesage when given a message string', () => {
            logger = new Logger();
            logger.log('this is a message', 'info');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=info, msg="this is a message"$/));
        });

        it('should print the correct log mesage when given undefined', () => {
            logger = new Logger();
            logger.log(undefined, 'info');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=info, msg="undefined"$/));
        });

        it('should print the correct log mesage when given a message string and constructed with a name', () => {
            logger = new Logger('test');
            logger.log('this is a message', 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, name="test", msg="this is a message"$/));
        });

        it('should print the correct log mesage when passed an Error', () => {
            logger = new Logger();
            logger.log(new Error('Error message'), 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="Error: Error message"$/));
        });

        it('should print the correct log mesage when passed an object', () => {
            logger = new Logger();
            logger.log({ msg : 'some message', foo : 'custom string', err : new Error('Error message')  }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="some message", foo="custom string", err="Error: Error message"$/));
        });

        it('should print the correct log mesage when passed an object containing an object', () => {
            logger = new Logger();
            logger.log({ msg : 'some message', obj : { foo: 'bar', baz: 'luhrmann'}  }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="some message", obj={"foo":"bar","baz":"luhrmann"}$/));
        });

        it('should print the correct log mesage when passed an object containing undefined values', () => {
            logger = new Logger();
            logger.log({ msg: undefined }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="undefined"$/));
        });

        it('should ignore \'level\' if passed in the message object', () => {
            logger = new Logger();
            logger.log({ msg : 'some message', level : 'warn' }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="some message"$/));
        });

        it('should ignore \'time\' if passed in the message object', () => {
            logger = new Logger();
            logger.log({ msg : 'some message', time : 'bogus' }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, msg="some message"$/));
        });

        it('should ignore \'name\' if passed in the message object', () => {
            logger = new Logger('test name');
            logger.log({ msg : 'some message', name : 'bogus' }, 'error');
            expect(console.log).to.have.been.calledWith(sinon.match(/^time=\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z, level=error, name="test name", msg="some message"$/));
        });
    });

    describe('helpers', () => {
        it('#debug should print an debug level log', () => {
            logger = new Logger('test', 'debug');
            logger.debug('message');
            expect(console.log).to.have.been.calledWith(sinon.match(/time=.*, level=debug, name="test", msg="message"/));
        });

        it('#info should print an info level log', () => {
            logger = new Logger('test', 'debug');
            logger.info('message');
            expect(console.log).to.have.been.calledWith(sinon.match(/time=.*, level=info, name="test", msg="message"/));
        });

        it('#warn should print an warn level log', () => {
            logger = new Logger('test', 'debug');
            logger.warn('message');
            expect(console.log).to.have.been.calledWith(sinon.match(/time=.*, level=warn, name="test", msg="message"/));
        });

        it('#error should print an error level log', () => {
            logger = new Logger('test', 'info');
            logger.error('message');
            expect(console.log).to.have.been.calledWith(sinon.match(/time=.*, level=error, name="test", msg="message"/));
        });
    });
});
