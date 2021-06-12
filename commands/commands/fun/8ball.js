const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { replies } = require('../../../json/8ball.json')

module.exports = {
    commands: '8ball',
    cooldown: 10,
    description: 'Get the answer to all your questions here :D',
    usage: '!8ball',
    permLevel: 0,
    callback: (client, message, args) => {
        const query = args.join(' ')
        if(!query) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.no} Please ask your question so that I can answer it!`)
            message.reply(embed)
        }

        const result = Math.floor((Math.random() * replies.length))
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`${config.emojis.magic} The Magical 8Ball!\n${config.emojis.info} **Question:** \`${query}\`\n${config.emojis.arrowRight} **Answer:** \`${replies[result]}\``)
        message.reply(embed)
    }
}