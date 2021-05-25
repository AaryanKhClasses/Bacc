const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { levelling } = require('bacclib')

module.exports = {
    commands: 'remove-levels',
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

            const levels = args[1]
            if(!levels) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify the number of levels to remove!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(isNaN(levels)) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a valid number of levels to remove!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            levelling.subtractLevel(target.id, message.guild.id, levels)
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully removed ${levels} levels from <@${target.id}>!`)
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
            .setTitle('Member Levels Removed!')
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Member Levels Removed',
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
                    name: 'Amount of Levels',
                    value: levels
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