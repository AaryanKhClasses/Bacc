const { MessageEmbed, MessageAttachment } = require("discord.js")
const { levelling } = require("bacclib")
const config = require('../../../config.json')
const canvacord = require('canvacord')

module.exports = {
    commands: ['rank', 'level'],
    cooldown: 10,
    description: 'Shows the rank of the specified member!',
    usage: '!rank (optional member)',
    permLevel: 0,
    callback: async(client, message, args) => {
        let target
        if(message.mentions.users.first()) {
            target = message.mentions.users.first()
        }else if(args[0]) {
            target = message.guild.members.cache.get(args[0]).user
        } else {
            target = message.author
        }
        const user = await levelling.fetchXp(target.id, message.guild.id)
        const neededXp = levelling.xpFor(parseInt(user.level) + 1)
        if(!user) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('RED')
            .setDescription('The mentioned user doesn\' have any XP! Get started by participating in chat to earn XP!')
            .setFooter(config.botname)
            .setTimestamp()
            return message.channel.send(embed)
        }

        const rank = new canvacord.Rank()
        .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
        .setCurrentXP(user.xp)
        .setLevel(user.level)
        .setRequiredXP(neededXp)
        .setStatus(target.presence.status)
        .setProgressBar('#FFFFFF')
        .setUsername(target.username)
        .setDiscriminator(target.discriminator)
        rank.build().then(data => {
            const attachment = new MessageAttachment(data, 'rank.png')
            message.channel.send(attachment)
        })
    }
}