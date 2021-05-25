const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { economy } = require('bacclib')
const { work } = require('./replies.json')

module.exports = {
    commands: 'work',
    cooldown: 43200, //12hrs
    callback: (client, message, args) => {
        let min = 250
        let max = 750
        let amount = Math.floor(Math.random() * (max - min + 1)) + min
        economy.addCoins(message.author.id, message.guild.id, amount)
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(`${config.emojis.yes} ${work[Math.floor(Math.random() * work.length)]} You got ${config.emojis.currency} ${amount}`)
        .setFooter(config.botname)
        .setTimestamp()
        message.channel.send(embed)
    }
}