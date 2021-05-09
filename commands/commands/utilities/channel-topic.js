const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'channel-topic',
    cooldown: 10,
    callback: (client, message, args) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
            const channel = message.guild.channels.cache.get(channell)

            const channelId = args[0]
            const topic = args.slice(1).join(' ')
            const Channel = message.guild.channels.cache.find(ch => ch.id === channelId)

            if(!topic) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a sentence to make it the topic of the channel!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            message.guild.channels.cache.find(ch => ch.id === channelId).setTopic(`${topic}`)
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${config.emojis.yes} Successfully set topic of channel **${Channel}** as\n**${topic}**!`)
            .setFooter(config.botname)
            .setColor('GREEN')
            .setTimestamp()
            message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Channel Topic Edited!')
            .setColor('#F1C40F')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Channel Topic Edited',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Channel Name',
                    value: `${Channel}`
                },
                {
                    name: 'Topic',
                    value: topic
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
