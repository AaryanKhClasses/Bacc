const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'botGuilds',
    callback: (client, message, args) => {
        if(message.author.id === config.botOwner) {
            const embed = new MessageEmbed() 
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.yes} Currently the total number of servers I am in is ${client.guilds.cache.size}`)
            message.channel.send(embed)
        }
    }
}