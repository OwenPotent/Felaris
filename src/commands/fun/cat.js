const { Message, MessageEmbed, Client } = require('discord.js')
const { error } = require('../../util/Logger')
const axios = require('axios')

module.exports = {
    name: "cat",
    description: "Provides an embed with a cat pic.",
    aliases: ["kitty", "kitten"],
    guildOnly: true,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */
    execute: async (message, client, args) => {

        axios.get('https://api.thecatapi.com/v1/images/search')
            .then((res) => {
                console.log('DATA:' + res.data[0].url)

                const embed = new MessageEmbed()
                    .setTitle('Cats!')
                    .setDescription("Here's a cat pic! Want the image link? Check below!")
                    .addField('Image URL:', `[Here](${res.data[0].url})`)
                    .setImage(res.data[0].url)
                    .setColor('#87ceeb')

                return message.channel.send(embed)
            })

            .catch((e) => {
                error(e)
            })
    }
}