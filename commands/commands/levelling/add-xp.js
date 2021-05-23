const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { levelling } = require('BaccLib')

module.exports = {
    commands: 'add-xp',
    cooldown: 10,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

        if(message.member.hasPermission('ADMINISTRATOR')){
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
                .setDescription(`${config.emojis.no} Please specify the amount of XP to add!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(isNaN(xp)) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a valid amount of XP to add!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            levelling.addXp(target.id, message.guild.id, xp)
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully added ${xp} XP to <@${target.id}>!`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Member XP Added!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Member XP Added',
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
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }
    }
}