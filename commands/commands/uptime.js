const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'uptime',
    cooldown: 10,
    description: 'Sends the uptime of the bot',
    usage: '!uptime',
    permLevel: 0,
    callback: (client, message, args) => {
        var milliseconds = parseInt((client.uptime % 1000) / 100),
            seconds = parseInt((client.uptime / 1000) % 60),
            minutes = parseInt((client.uptime / (1000 * 60)) % 60),
            hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24),
            days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60)

        days = (days < 10) ? "0" + days : days
        hours = (hours < 10) ? "0" + hours : hours
        minutes = (minutes < 10) ? "0" + minutes : minutes
        seconds = (seconds < 10) ? "0" + seconds : seconds

        const str = `${days} days, ${hours} hours, ${minutes} minutes ${seconds} seconds`

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription('Getting uptime...')
        message.reply(embed).then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(
                `${config.emojis.arrowRight} **API Latency:** \`${ping}ms\`\n` + 
                `${config.emojis.slowmode} **Uptime:** \`${str}\`\n`
            )
            resultMessage.edit(embed)
        }) 
    }
}