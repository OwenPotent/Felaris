const BaseCommand = require('../../registry/Base/BaseCommand')

module.exports = class PingCommand extends BaseCommand {
    constructor() {
        super({
            name: 'ping',
            description: 'A simple ping pong command!'
        })
    }

    async run(message, client, args) {
        return message.reply('Pong!')
    }
}