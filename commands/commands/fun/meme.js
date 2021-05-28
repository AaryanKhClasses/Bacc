const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const got = require('got')

module.exports = {
    commands: 'meme',
    cooldown: 10,
    callback: (client, message, args) => {
        got('https://www.reddit.com/r/meme/random.json').then((response) => {
            const content = JSON.parse(response.body)
            const image = content[0].data.children[0].data.url
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter(config.botname)
                .setImage(image)
                .setTimestamp()
            message.channel.send(embed)
        })
    }
}