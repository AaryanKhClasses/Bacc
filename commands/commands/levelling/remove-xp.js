const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { levelling } = require('bacclib')

module.exports = {
    commands: 'remove-xp',
    cooldown: 10,
    description: 'Removes XP from the specified member!',
    usage: '!remove-xp [member] [number of xp]',
    permLevel: 3,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

            let target
            if(message.mentions.members.first()) {
                target = message.mentions.members.first()
            } else if(args[0]) {
                target = message.guild.members.cache.get(args[0])
            } else {
                target = message.author
            }

            const xp = args[1]
            if(!xp) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify the amount of XP to remove!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply({ embed: embed }).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(isNaN(xp)) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a valid amount of XP to remove!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply({ embed: embed }).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            levelling.subtractXp(target.id, message.guild.id, xp)
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully removed ${xp} XP from <@${target.id}>!`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Member XP Removed!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Member XP Removed',
                },
                {
                    name: 'User',
                    value: `${target.user.tag} (<@${target.id}>)`,
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Amount of XP',
                    value: xp
                }
            )
            channel.send(logembed)
    }
}