const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { economy } = require('bacclib')
const { crimeFailures, crimeSuccess } = require('./replies.json')

module.exports = {
    commands: 'crime',
    description: 'Do crime to earn coins!',
    permLevel: 0,
    usage: '!crime',
    cooldown: 43200, //12hrs
    callback: (client, message, args) => {
        let successMin = 300
        let successMax = 1000
        let successAmount = Math.floor(Math.random() * (successMax - successMin + 1)) + successMin
        
        let failureMin = 400
        let failureMax = 1250
        let failureAmount = Math.floor(Math.random() * (failureMax - failureMin + 1)) + failureMin
        
        let random = Math.floor(Math.random() * 10)
        if(random < 4.5) {
            economy.addCoins(message.author.id, message.guild.id, successAmount)
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`${config.emojis.yes} ${crimeSuccess[Math.floor(Math.random() * crimeSuccess.length)]} You got ${config.emojis.currency} ${successAmount}`)
            .setFooter(config.botname)
            .setTimestamp()    
            return message.reply(embed)
        }
        if(random >= 4.5) {
            economy.subtractCoins(message.author.id, message.guild.id, failureAmount)
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription(`${config.emojis.yes} ${crimeFailures[Math.floor(Math.random() * crimeFailures.length)]} You lost ${config.emojis.currency} ${failureAmount}`)
            .setFooter(config.botname)
            .setTimestamp()    
            return message.reply(embed)
        }
        
    }
}