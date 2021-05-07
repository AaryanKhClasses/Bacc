const levelling = require('../../../utils/levelling')
const { MessageEmbed } = require('discord.js')
const config = require('../../../config.json')

module.exports = {
    commands: ['leaderboard', 'lb'],
    cooldown: 10,
    callback: async(message, args, client) => {
        const rawleaderboard = await levelling.fetchLeaderboard(message.guild.id, 2)
        if(rawleaderboard.length < 1) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('Oop! Looks like no one here has any XP at all! Keep chatting to get on the leaderboard!')
            .setFooter(config.botname)
            .setTimestamp()
            return message.channel.send(embed)
        }

        const leaderboard = await levelling.computeLeaderboard(client, rawleaderboard)
        const lb = leaderboard.map(e => `${e.position}. ${e.username}${e.discriminator}\n**Level:** ${e.level} | **XP:** ${e.xp.toLocaleString()}`)
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(lb.join('\n'))
        .setFooter(config.botname)
        .setTimestamp()
        return message.channel.send(embed)
    }
}