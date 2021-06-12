const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { levelling } = require('bacclib')

module.exports = {
    commands: 'set-xp',
    description: 'Sets XP of the specified member!',
    usage: '!set-xp [member] [number of levels]',
    permLevel: 3,
    cooldown: 10,
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
                .setDescription(`${config.emojis.no} Please specify the amount of XP to set!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(isNaN(xp)) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a valid amount of XP to set!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            levelling.setXp(target.id, message.guild.id, xp)
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully set XP of <@${target.id}> as ${xp}!`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.reply(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Member XP Changed!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Member XP Changed',
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
                    name: 'XP Set as',
                    value: xp
                }
            )
            channel.send(logembed)
    }
}