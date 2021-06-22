const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const translate = require('@iamtraction/google-translate')

module.exports = {
    commands: 'translate',
    description: 'Translate the specified text to a specified langauge',
    usage: '!translate [language name] [text to translate]',
    permLevel: 0,
    cooldown: 10,
    callback: (client, message, args) => {
        const text = args.slice(1).join(' ')
        const language = args[0]
        translate(text, { to: language }).then(res => {
            const embed = new MessageEmbed()
            .setTitle(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(
                `${config.emojis.badge} **Translate to:** ${language}\n` +
                `${config.emojis.arrowRight} **Original Text:** ${text}\n` +
                `${config.emojis.translate} **Translated Text:** ${res.text}`
            )
            .setFooter(config.botname)
            .setTimestamp()
            message.reply({ embed: embed })
        })
    }
}