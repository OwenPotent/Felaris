const { Message, MessageEmbed, Client } = require('discord.js')
const { error } = require('../../util/Logger')
const axios = require('axios')

module.exports = {
    name: "fact",
    description: "Gives a fact",
    guildOnly: true,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */
    execute: async (message, client, args) => {

        axios.get('https://nekos.life/api/v2/fact')
            .then((res) => {
                const embed = new MessageEmbed()
                    .setTitle('Fact!')
                    .addField('Did you know?', `${res.data.fact}!`)
                    .setColor('87ceeb')

                return message.channel.send(embed)
            }).catch((e) => {
                error(e)
            })
    }
}