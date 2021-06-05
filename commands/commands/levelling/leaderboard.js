const { levelling } = require('bacclib')
const { MessageEmbed } = require('discord.js')
const config = require('../../../config.json')

module.exports = {
    commands: ['leaderboard', 'lb'],
    cooldown: 10,
    description: 'Shows the XP Leaderboardof the top 10 members!',
    usage: '!leaderboard',
    permLevel: 0,
    callback: async(client, message, args) => {
        const rawleaderboard = await levelling.fetchXpLeaderboard(message.guild.id, 10)
        if(rawleaderboard.length < 1) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('Oop! Looks like no one here has any XP at all! Keep chatting to get on the leaderboard!')
            .setFooter(config.botname)
            .setTimestamp()
            return message.lineReply(embed)
        }

        const leaderboard = await levelling.computeXpLeaderboard(client, rawleaderboard)
        const lb = leaderboard.map(e => `${e.position}. ${e.username}${e.discriminator}\n**Level:** ${e.level} | **XP:** ${e.xp.toLocaleString()}`)
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(lb.join('\n'))
        .setFooter(config.botname)
        .setTimestamp()
        return message.lineReply(embed)
    }
}

/*
 => {
        const board = levelModel.findOne({ guildID: message.guild.id }, (data) => {
            var limit = 10

            let lastPage = Math.ceil(Object.keys(data).length / limit)
            let page = parseInt(args[0])
            if(!page) page = 1
            if(page > lastPage) page = lastPage

            let fromPages = limit * (page - 1)
            let pageslimit = 10 * page

            let list = Object.entries(data).sort((a, b) => b[1].xp - a[1].xp).slice(fromPages, pageslimit)
            let arr = []

            for(var i  in list) {
                arr.push(`**${i * 1 + 1 + fromPages}.** ${message.guild.members.cache.get(list[i][0]) ? message.guild.members.cache.get(list[i][0]).user.tag : 'UnknownUser'}\n**Levels:** ${(parseInt(`${list[i][1].level}`))} **XP:** ${(parseInt(`${list[i][1].xp}`))}`)
            }
        })

        const embed = new MessageEmbed()
        .setTitle(`XP Leaderboard for ${message.guild.id}`)
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('GREEN')
        .setDescription(arr.join('\n'))
        .setFooter(config.botname)
        .setTimestamp()
        return message.lineReply(embed)
    }
*/