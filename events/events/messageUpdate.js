const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('messageUpdate', (oldMessage, newMessage) => {
        if(oldMessage.author.bot) return
        const channell = oldMessage.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id

        const logEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setFooter(config.botname)
        .setTimestamp()
        .setAuthor(`Message Edited`, oldMessage.author.displayAvatarURL())
        .addField(`${config.emojis.user} Message Author`, `<@${oldMessage.author.id}> (${oldMessage.author.id})`)
        .addField(`${config.emojis.topic} Channel`, `<#${oldMessage.channel.id}> (${oldMessage.channel.id})`)
        .addField(`${config.emojis.text} Old Message`, oldMessage)
        .addField(`${config.emojis.arrowRight} New Message`, newMessage)
        oldMessage.guild.channels.cache.get(channell).send(logEmbed)
    })
}