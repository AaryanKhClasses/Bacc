const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('channelCreate', (channel) => {
        const channell = channel.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        
        let str, str2
        if(channel.type === 'text') {
            str = `Text Channel (\`text\`)`
            str2 = `${config.emojis.text}`
        }else if(channel.type === 'voice') {
            str = `Voice CHannel (\`voice\`)`
            str2 = `${config.emojis.unmute}`
        } else if(channel.type === 'news') {
            str = `Announcement Channel (\`news\`)`
            str2 = `${config.emojis.megaphone}`
        } else if(channel.type === 'category') {
            str = `Category Channel (\`category\`)`
            str2 = `${config.emojis.groups}`
        }

        const logEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setFooter(config.botname)
        .setTimestamp()
        .setAuthor(`Channel Created`, channel.guild.iconURL())
        .addField(`${config.emojis.badge} Channel Name`, `<#${channel.id}> (${channel.id})`)
        .addField(`${str2} Channel Type`, str, true)
        .addField(`${config.emojis.topic} Channel Category`, `<#${channel.parentID}> (${channel.parentID})`, true)
        channel.guild.channels.cache.get(channell).send(logEmbed)
    })
}