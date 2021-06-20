const { Client } = require("discord.js")
const { readdirSync } = require('fs')
const { join } = require('path')
const { log } = require("../util/Logger")

module.exports = class RegisterCommands {
    
    /**
     * This registers the commands in the directory specified in "mainDir"
     * 
     * @param {String} mainDir - Main directory to register commands
     * (Example: "./test/commands")
     * @param {Client} client - Discord.js Client
     */
    constructor(mainDir, client) {
        this.mainDir = mainDir
        this.client = client
    }

    init() {
        const commandFolders = readdirSync(this.mainDir)

        for (const folder of commandFolders) {

            const commandFiles = readdirSync(`${this.mainDir}/${folder}`).filter(file => file.endsWith('.js'))

            for (const file of commandFiles) {
                const command = require(`${this.mainDir}/${folder}/${file}`)

                this.client.commands.set(command.name, command)
                log(`Command - ${command.name}.js has been loaded!`)
            }
        }
    }
}