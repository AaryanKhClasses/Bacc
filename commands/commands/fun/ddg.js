const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const search = require('node-ddg').default

module.exports = {
    commands: 'ddg',
    cooldown: 10,
    description: 'Searches for the specified information on DDG',
    usage: '!ddg [query]',
    permLevel: 0,
    callback: (client, message, args) => {
        const query = args.join(' ')
        if(!query) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.no} Please specify a query to search on DDG!`)
            message.reply(embed)
        }

        let options = {
            count: 0,
            offset: 0,
            lang: 'en-US,en;q=0.9',
            debug: false,
            show: false,
            screenshot: false,
            wait: 0
        }

        let string = ''
        let embed = new MessageEmbed()

        search({ query: query, maxResults: 1 }).then((results) => {
            for(let i = 0; i < 10; i++) {
                if(i > results.length - 1) {
                    break
                }

                string = string + `\n**${results[i].title}**\n${results[i].body}\n${results[i].url}`

                embed
                .setColor('GREEN')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(config.botname)
                .setTimestamp()
                .setDescription(`${string}`)
            }
            message.reply(embed)
        })
    }
}