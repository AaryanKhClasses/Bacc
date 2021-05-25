const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
    commands: 'dog',
    cooldown: 10,
    callback: async(client, message, args) => {
        const { body } = await superagent.get('https://random.dog/woof.json')
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`Here's a cute little dog 🐶!`)
        .setImage(body.url)
        message.channel.send(embed)
    }
}