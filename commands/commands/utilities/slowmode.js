const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    commands: 'slowmode',
    cooldown: 5,
    description: 'Sets the slowmode of the channel!',
    usage: '!slowmode [duration]',
    permLevel: 2,
    premiumOnly: true,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)
            if(args[0] === 'channel'){ //!sm channel [channelid] [time]
                const channelId = args[1]
                const time = args[2]
    
                if(!channelId) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a channelID to set slowmode of!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.reply(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                if(!time) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a time to set slowmode!\nEx., 1s, 5s, 30m, 6h, etc.`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.reply(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                message.guild.channels.cache.setRateLimitPerUser((ms(time)) / 1000)
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully set slowmode of <#${channelId}> as ${time}`)
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
                .setTitle('Channel Slowmode Changed!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Slowmode Changed',
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Channel',
                        value: `<#${channelId}>`
                    },
                    {
                        name: 'Time',
                        value: time,
                    }
                )
                channel.send(logembed)
    
    
            } else { //!sm [time]
                const time = args[0]
    
                if(!time) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please specify a time to set slowmode!\nEx., 1s, 5s, 30m, 6h, etc.`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.reply(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }
    
                message.channel.setRateLimitPerUser((ms(time))/1000)
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully set slowmode of this channel as ${time}`)
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
                .setTitle('Channel Slowmode Changed!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Slowmode Changed',
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Channel',
                        value: `<#${message.channel.id}>`
                    },
                    {
                        name: 'Time',
                        value: time,
                    }
                )
                channel.send(logembed)
            }
    }
}