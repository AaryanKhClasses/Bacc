const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const urban = require('urban') 

module.exports = {
    commands: ['urban', 'define'],
    cooldown: 10,
    description: 'Defines the specified word/sentence',
    usage: '!urban [query]',
    permLevel: 0,
    callback: (client, message, args) => {
        const query = args.join(' ')
        if(!query) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.no} Please specify a query to define!`)
            message.reply(embed)
        }

        urban(args).first(json => {
            if(!json) {
                const embed = new MessageEmbed()
                .setColor('RED')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(config.botname)
                .setTimestamp()
                .setDescription(`${config.emojis.no} Nothing found related to query: **${query}**`)
                message.reply(embed)
            }

            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(
                `${config.emojis.badge} Definition of **${json.word}**\n` +
                `${config.emojis.arrowRight} **Query:** ${json.word}\n` +
                `${config.emojis.description} **Definition:** ${json.definition}\n` +
                `${config.emojis.user} **Definition by user:** ${json.author}`
            )
            message.reply(embed)
        })
    }
}