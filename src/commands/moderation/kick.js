const { Message, MessageEmbed, Client } = require('discord.js')
const { error } = require('../../util/Logger')

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",
    aliases: ["k"],
    usage: "<member> [reason]",
    cooldown: 3000,
    userPermissions: ["KICK_MEMBERS"],
    guildOnly: true,
    args: true,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */
    execute: async (message, client, args) => {

        const member = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(m => m.name === args[0])

        let reason = args[1]

        if (!member) {

            let embed = new MessageEmbed()
                .setDescription('Could not find that member.')
                .setColor('RED')

            return message.channel.send(embed)
        } else if (!member.kickable) {

            let embed = new MessageEmbed()
                .setDescription('This member is not kickable.')
                .setColor('RED')

            return message.channel.send(embed)
        } else if (member.hasPermission('ADMINISTRATOR')) {

            let embed = new MessageEmbed()
                .setDescription('This member has administration permissions. I could not kick them.')
                .setColor('RED')

            return message.channel.send(embed)
        }

        if (!reason) {
            reason = 'No reason provided.'
        }

        try {

            await member.kick({
                reason: reason
            })

            let embed = new MessageEmbed()
                .setDescription(`***${member.user.tag} has been kicked.***`)
                .setColor('GREEN')

            return message.channel.send(embed)
        } catch (e) {

            let embed = new MessageEmbed()
                .setDescription('An error occured.')
                .setColor('RED')

            error(`An error occured while executing the kick command.\n${e}`)

            return message.channel.send(embed)
        }
    }
}