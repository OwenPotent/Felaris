const { Message, Client } = require('discord.js')

module.exports = {
    name: "ping",
    description: "A simple ping pong command",
    aliases: ["p"],
    guildOnly: true,
    args: false,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {string[]} args 
     */
    execute: async (message) => {
        message.channel.send('Pong!')
    }
}