const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { economy } = require('bacclib')

module.exports = {
    commands: ['bal', 'balance'],
    cooldown: 10,
    callback: async(client, message, args) => {
        let target
        if(message.mentions.members.first()) {
            target = message.mentions.members.first()
        }else if(args[0]) {
            target = message.guild.members.cache.get(args[0])
        } else {
            target = message.member
        }

        const user = await economy.fetchCoins(target.id, message.guild.id)
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`${config.emojis.currency} **Balance for <@${target.id}>:** ${user.coins} `)
        message.channel.send(embed)
    }
}