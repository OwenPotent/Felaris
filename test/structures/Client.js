const { Client } = require('discord.js')
const { error } = require('../util/Logger')

class FelarisClient extends Client {
    constructor(options) {
        super(options)
    }

    async init(token) {
        this.token = token

        if (!token) {
            error('No token provided!')

            process.exit()
        }

        await this.login(this.token)
    }
}

module.exports = FelarisClient;