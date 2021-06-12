const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'purge',
    description: 'Purges(or clears) the specified amount of messages!',
    usage: '!purge [number of messages]',
    permLevel: 1,
    cooldown: 5,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

            if(!args[0]) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a number to purge the amount of messages!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(isNaN(args[0])) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a valid number to purge the amount of messages as **${args[0]}** is not a valid number!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${config.emojis.yes} Successfully purged ${args[0]} messages!!`)
            .setFooter(config.botname)
            .setColor('RED')
            .setTimestamp()
            message.reply(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete().then(() => {
                setTimeout(
                    message.channel.bulkDelete(args[0]), 2000
                )
            })
            

            const logembed = new MessageEmbed()
            .setTitle('Message(s) Purged!')
            .setColor('#3498DB')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Message(s) Purged',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Channel',
                    value: message.channel
                },
                {
                    name: 'Number of Messages Purged',
                    value: args[0]
                }
            )
            channel.send(logembed)
    }
}