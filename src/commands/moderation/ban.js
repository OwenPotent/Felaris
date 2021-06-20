const { Message, MessageEmbed, Client } = require('discord.js')
const { error } = require('../../util/Logger')

module.exports = {
    name: "ban",
    description: "Bans a member from the server!",
    aliases: ["b", "hackban" , "forceban"],
    usage: "<member> [reason]",
    cooldown: 3000,
    userPermissions: ["BAN_MEMBERS"],
    guildOnly: true,
    args: true,
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * @param {String[]} args 
     */
    execute: async (message, client, args) => {

        let member = message.mentions.members.first() ||
            message.guild.members.cache.get(args[0]) ||
            message.guild.members.cache.find(m => m.name === args[0])

        let reason = args[1]

        if (!member) {
            try {

                member = client.users.fetch(args[0])

            } catch (e) {

                let embed = new MessageEmbed()
                    .setDescription(`Could not find user ${member}`)
                    .setColor('RED')

                error(e)

                return message.channel.send(embed)
            }
        } else if (!member.bannable) {
            
            let embed = new MessageEmbed()
                .setDescription('This member is not bannable.')
                .setColor('RED')

            return message.channel.send(embed)
        } else if (member.user.id === message.author.id) {

            let embed = new MessageEmbed()
                .setDescription('You may not ban yourself.')
                .setColor('RED')

            return message.channel.send(embed)
        } else if (member.hasPermission('ADMINISTRATOR')) {

            let embed = new MessageEmbed()
                .setDescription('This member has administrator permissions. You may not ban them.')
                .setColor('RED')

            return message.channel.send(embed)
        }

        if (!reason) {
            reason = 'No reason provided'
        }

        try {
            
            await member.ban({
                reason: reason
            })

            let embed = new MessageEmbed()
                .setDescription(`***${member.user.tag} has been banned.***`)
                .setColor('GREEN')

            return message.channel.send(embed)
        } catch (e) {
            
            let embed = new MessageEmbed()
                .setDescription('An error occured.')
                .setColor('RED')
            
            error(`An error occured while executing the ban command!\n${e}`)

            return message.channel.send(embed)
        }
    }
}