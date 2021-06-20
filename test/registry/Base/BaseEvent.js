const { Client } = require("discord.js")
const { error } = require("../../util/Logger")

module.exports = class BaseEvent {
    constructor({ name, once }) {
        this.name = name
        this.once = once

        if (!this.once) {
            this.once = false
        }

        if (!this.name) {
            error('No event name specified!')

            process.exit()
        }
    }

    /**
     * 
     * @param  {...any} args 
     * @param {Client} client 
     */
    run(...args, client) {
        this.args = args
        this.client = client
    }
}