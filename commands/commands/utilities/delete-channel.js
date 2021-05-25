const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'delete-channel',
    cooldown: 10,
    callback: (client, message, args) => {
        if(message.member.hasPermission('ADMINISTARTOR')) {
            const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
            const channel = message.guild.channels.cache.get(channell)

            let channelId
            if(message.mentions.channels.first()) {
                channelId = message.mentions.channels.first().id
            } else if(args[0]){
                channelId = message.guild.channels.cache.find(ch => ch.id === args[0]).id
            } else {
                channelId = message.channel.id
            }
            const Channel = message.guild.channels.cache.find(ch => ch.id === channelId)

            Channel.delete()
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${config.emojis.yes} Successfully deleted **#${Channel.name}**!`)
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
            .setTitle('Channel Deleted!')
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Channel Deleted',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Channel',
                    value: `${Channel.name}`
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