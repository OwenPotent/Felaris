const { Message, MessageEmbed, Collection } = require('discord.js')
const client = require('../..')
const { error } = require('../../util/Logger')
const { prefix } = require('../../config.json')
const Timeout = new Collection()

/**
 * @param {Message} message 
 * @returns 
 */
module.exports = (client, message) => {

    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    let command = client.commands.get(commandName);

    if (!command) {
        command = client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    }

    if (command.args && !args.length) {
        let embed = new MessageEmbed()
            .setTitle('Error!')
            .setDescription('No arguments specified!')
            .setColor('RED')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        if (command.usage) {
            embed.addField('Command Usage:', `\`${prefix}${command.name} ${command.usage}\``)
        }

        return message.channel.send(embed)
    }

    if (command.guildOnly && message.channel.type === 'dm') {
        let embed = new MessageEmbed()
            .setTitle('Error')
            .setDescription('This command may only be ran in the server!')
            .setColor('RED')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        return message.channel.send(embed)
    }
    if (command.cooldown) {
        if (Timeout.has(`${command.name}${message.author.id}`)) {
            let embed = new MessageEmbed()
                .setTitle('Error')
                .setDescription(`You are on a cooldown! Please wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` before using this command!`)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
            return message.channel.send(embed)
        }
        
        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)

        setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
        }, command.cooldown)
    }
    // let embed = new MessageEmbed()
    // .setTitle('Error')
    // .setDescription(`You are on a cooldown! Please wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` before using this command!`)
    // .setColor('RED')
    // .setTimestamp()
    // .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

    try {
        command.execute(message, client, args)
    } catch (e) {
        error('An error occured while executing the command!')
        error(e)

        let embed = new MessageEmbed()
            .setTitle('Error')
            .setDescription('An error occured while executing the command!')
            .setColor('RED')
            .setTimestamp()
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }))

        return message.channel.send(embed)
    }
}