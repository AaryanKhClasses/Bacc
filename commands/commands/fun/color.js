const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['color', 'hexcolor'],
    description: 'Sends the color you specified into an embed!',
    permLevel: 0,
    usage: '!color [color hex or name]',
    cooldown: 10,
    callback: (client, message, args) => {
        if(!args[0]) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.no} Please specify a color name or an hex color!`)
            return message.lineReply(embed)
        }

        const embed = new MessageEmbed()
        .setColor(args[0].toUpperCase())
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`${config.emojis.yes} This is the color you specified: ${args[0]}`)
        message.lineReply(embed)
    }
}