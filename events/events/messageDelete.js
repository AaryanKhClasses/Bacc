const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('messageDelete', (message) => {
        // if(message.author.bot) return
        // const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
    
        // const logEmbed = new MessageEmbed()
        // .setColor('RED')
        // .setFooter(config.botname)
        // .setTimestamp()
        // .setAuthor(`Message Deleted`, message.author.displayAvatarURL())
        // .addField(`${config.emojis.user} Message Author`, `<@${message.author.id}> (${message.author.id})`)
        // .addField(`${config.emojis.topic} Channel`, `<#${message.channel.id}> (${message.channel.id})`)
        // .addField(`${config.emojis.text} Message`, message)
        // message.guild.channels.cache.get(channell).send({ embed: logEmbed })
    })
}