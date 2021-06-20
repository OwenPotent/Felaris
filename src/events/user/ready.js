const { Client } = require('discord.js')
const client = require('../..')
const { log } = require('../../util/Logger')

/**
 * 
 * @param {Client} client 
 */
module.exports = (client) => {
    log(`Logged in as ${client.user.tag}`)
}