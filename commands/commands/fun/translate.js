const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    commands: 'translate',
    cooldown: 10,
    callback: (client, message, args) => {
        const text = args.slice(1).join(' ')
        const language = args[0]
        translate(text, { to: language }).then(res => {
            const embed = new MessageEmbed()
            .setTitle(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(
                `**Translate to:** ${language}\n` +
                `**Original Text:** ${text}\n` +
                `**Translated Text:** ${res.text}`
            )
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed)
        })
    }
}