const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'botUsers',
    permLevel: 6,
    callback: (client, message, args) => {
            const embed = new MessageEmbed() 
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.yes} Currently the total number of users I have is ${client.users.cache.size}`)
            message.channel.send(embed)
    }
}