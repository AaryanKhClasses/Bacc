const { MessageEmbed } = require("discord.js")
const modlogsSchema = require("../../../schemas/modlogsSchema")
const mongo = require("../../../utils/mongo")
const config = require('../../../config.json')

module.exports = {
    commands: 'modlogs',
    permlevel: 2,
    callback: async(client, message, args) => {
        if(message.member.hasPermission('KICK_MEMBERS')){
            let user
            if(message.mentions.members.first()) {
                user = message.mentions.members.first()
            } else if(args[0]) {
                user = message.guild.members.cache.get(args[0])
            } else {
                user = message.member
            }

            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Please mention a member to see modlogs of!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            const guildId = message.guild.id
            const userId = user.id

            await mongo().then(async(mongoose) => {
                try {
                    const result = await modlogsSchema.findOne({
                        guildId,
                        userId
                    })
                    if(!result){
                        const embed = new MessageEmbed()
                        .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL())
                        .setDescription(`${config.emojis.no} The mentioned member doesn't have any modlogs!`)
                        .setColor('RED')
                        .setFooter(config.botname)
                        .setTimestamp()
                        message.channel.send(embed)
                    }
                    for(const log of result.modLog){
                        const { logtype, author, authorId, moderator, timestamp, reason } = modLog
                        let arr = []
                        arr.push(`**LogType:** ${logtype}\n**Author:** ${author} <@${authorId}>\n**Moderator:** ${moderator}\n**Date:** ${new Date(timestamp).toLocaleDateString()}\n**Reason:** ${reason}\n`)
                    
                        const embed = new MessageEmbed()
                        .setTitle(`Modlogs for ${author}`)
                        .setColor('GREEN')
                        .setAuthor(`${author}`, message.guild.members.cache.get(authorId).user.displayAvatarURL())
                        .setDescription(arr.join('\n'))
                        .setTimestamp()
                        .setFooter(config.botname)
                        message.channel.send(embed)
                    }
                }finally {
                    mongoose.connection.close()
                }
            })
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }
    }
}