const { Client } = require("discord.js")
const { readdirSync } = require('fs')
const { join } = require('path')
const { log } = require("../util/Logger")

module.exports = class RegisterEvents {

    /**
     * 
     * @param {String} mainDir - Main directory for the events folder
     * (example: "./test/events")
     * @param {Client} client - discord.js Client
     */
    constructor(mainDir, client) {
        this.mainDir = mainDir
        this.client = client
    }

    init() {
        const eventFolders = readdirSync(this.mainDir)

        for (const folder of eventFolders) {
            const eventFiles = readdirSync(`${this.mainDir}/${folder}`).filter(file => file.endsWith('.js'))

            for (const file of eventFiles) {
                const event = require(`${this.mainDir}/${folder}/${file}`)

                if (event.once) {
                    this.client.once(event.name, (...args) => event.run(...args, this.client))
                } else {
                    this.client.on(event.name, (...args) => event.run(...args, this.client))
                }
            }
        }
    }
}