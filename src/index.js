const { Client, Collection, Intents } = require('discord.js')
require('dotenv').config()
const { error, warn, log } = require('./util/Logger')
const fs = require('fs')
const mongoose = require('mongoose')
const chalk = require('chalk')

const client = new Client({
    intents: Intents.ALL,
    disableMentions: 'everyone'
})

client.commands = new Collection()
client.events = new Collection()
client.aliases = new Collection()


module.exports = client;

/**
 * Logs the bot, connects to the DB, register the events and commands files
 * 
 * @param {String} mongoURI - Your mongoURI
 * @param {String} token - Your bot token
 * 
 * @returns {void}
 */

async function init(token,mongoURI) {

    if (!token) {
        error('Invalid token!')

        process.exit()
    }
    if (mongoURI) {
        mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
            .then(() => {
                log(chalk.blueBright('Connected to the database!'))
            })
            .catch((err) => {
                error(chalk.redBright('Unable to connect to the database.\n') + err)

                process.exit()
            })
    } else if (!mongoURI) {
        warn(chalk.yellowBright('No mongoURI provided, skipping.'))
    }

    let folders = fs.readdirSync('./src/commands/')

    folders.forEach((dir) => {
        const commandFiles = fs.readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith('.js'))

        for (const file of commandFiles) {
            const command = require(`./commands/${dir}/${file}`)

            client.commands.set(command.name, command)

            log(chalk.green(`Command - ${command.name}.js has been loaded`))
        }
    })

    let eventFolder = fs.readdirSync('./src/events')

    eventFolder.forEach((dir) => {
        const eventFiles = fs.readdirSync(`./src/events/${dir}/`).filter(file => file.endsWith('.js'))

        for (const file of eventFiles) {
            const event = require(`./events/${dir}/${file}`)
            const eventNames = file.split('.')[0];

            log(chalk.yellow(`Event - ${eventNames}.js has been loaded`))
            client.on(eventNames, event.bind(null, client))
        }
    })

    await client.login(token)
}

init(process.env.DISCORD_TOKEN, process.env.MONGO_URI)

// process.env.DISCORD_TOKEN