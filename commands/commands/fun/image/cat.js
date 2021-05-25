const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
    commands: 'cat',
    cooldown: 10,
    callback: async(client, message, args) => {
        const { body } = await superagent.get('https://aws.random.cat/meow')
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`Here's a cute little cat 😸!`)
        .setImage(body.file)
        message.channel.send(embed)
    }
}