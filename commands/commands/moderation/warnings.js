// const { MessageEmbed } = require("discord.js")
// const config = require('../../../config.json')
// const modlogsModel = require("../../../models/modlogsModel")

// module.exports = {
//     commands: 'warnings',
//     cooldown: 1,
//     permLevel: 1,
//     callback: async(client, message, args) => {
//         let target
//         if(message.mentions.members.first()) {
//             target = message.mentions.members.first()
//         } else if(args[0]) {
//             target = message.guild.members.cache.get(args[0])
//         } else {
//             target = message.guild.members.cache.get(message.author.id)
//         }

//         if(!target){
//             const embed = new MessageEmbed()
//             .setDescription(`${config.emojis.no} Please mention a member to see warnings of!`)
//             .setColor('RED')
//             .setFooter(config.botname)
//             .setTimestamp()
//             return message.reply({ embed: embed }).then((message) => {
//                 client.setTimeout(() => message.delete(), 5000)
//             })
//         }

//         const guildID = message.guild.id
//         const userID = target.id

//         const result = await modlogsModel.findOne({ guildID, userID, modlogs: { logtype: 'Warn' } })
//         if(!result){
//             const embed = new MessageEmbed()
//             .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
//             .setDescription(`${config.emojis.no} The mentioned member doesn't have any warnings!`)
//             .setColor('RED')
//             .setFooter(config.botname)
//             .setTimestamp()
//             return message.reply({ embed: embed })
//         }
//         for(const log of result.modlogs){
//             const { author, authorId, moderator, timestamp, reason } = log
//             let arr = []
//             arr.push(`**Author:** ${author} <@${authorId}>\n**Moderator:** ${moderator}\n**Date:** ${new Date(timestamp).toLocaleDateString()}\n**Reason:** ${reason}\n`)
        
//             const embed = new MessageEmbed()
//             .setTitle(`Modlogs for ${author}`)
//             .setColor('GREEN')
//             .setAuthor(`${author}`, message.guild.members.cache.get(authorId).user.user.displayAvatarURL())
//             .setDescription(arr.join('\n'))
//             .setTimestamp()
//             .setFooter(config.botname)
//             message.reply({ embed: embed })
//         }
//     }
// }