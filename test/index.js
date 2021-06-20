const FelarisClient = require('./structures/Client')
const RegisterCommands = require('./registry/RegisterCommands')
const RegisterEvents = require('./registry/RegisterEvents')
const { Collection } = require('discord.js')

const client = new FelarisClient()

client.commands = new Collection()
client.events = new Collection()

const cmd = new RegisterCommands('./test/commands', client)
const evnt = new RegisterEvents('./test/events', client)

cmd.init()
evnt.init()

client.init()

