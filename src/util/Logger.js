const chalk = require('chalk')
const moment = require('moment')

/**
 * @description Console logs the content recieve
 * 
 * @param {any} content 
 * @param {String} type
 * @returns {void}
 */

exports.log = (content, type = 'log') => {
    const timestamp = `[${moment().format("DD-MM-YY H:m:s")}]`
    switch (type) {
        case "log" : {
            return console.log(`${timestamp} ${chalk.blue(type.toUpperCase())} | ${content}`)
        }

        case "warn": {
            return console.log(`${timestamp} ${chalk.yellow(type.toUpperCase())} | ${content}`)
        }

        case "error": {
            return console.log(`${timestamp} ${chalk.red(type.toUpperCase())} | ${content}`)
        }
        default: throw new TypeError('You used the wrong type of log!')
    }
}

/**
 * 
 * @param  {...any} args 
 * @returns {void}
 */

exports.error = (...args) => this.log(...args, 'error');

exports.warn = (...args) => this.log(...args, 'warn');