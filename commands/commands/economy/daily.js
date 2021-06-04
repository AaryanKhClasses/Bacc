const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { economy, economyModel } = require('bacclib')

module.exports = {
    commands: 'daily',
    cooldown: 86400,
    permLevel: 0,
    callback: async(client, message, args) => {
        let min = 500
        let max = 1500
        let amount = Math.floor(Math.random() * (max - min + 1)) + min
        const user = await economyModel.findOne({ userID: message.author.id, guildID: message.guild.id })
        if(!user) return false

        if(86400000 - (Date.now() - user.lastDaily) > 0) {
            return
        }
        
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(`${config.emojis.yes} You claimed your dailies! You can now claim you dailies again tomorrow! You got ${config.emojis.currency} ${amount}`)
        .setFooter(config.botname)
        .setTimestamp()
        message.channel.send(embed)

        economy.addCoins(userID, guildID, coins)
        user.lastDaily = Date.now()
        user.save().catch(e => console.log(`Failed to make daily command: ${e}`))
        return user
        
        
    }
}