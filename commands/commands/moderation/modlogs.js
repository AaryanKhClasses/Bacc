// const { MessageEmbed } = require("discord.js")
// const modlogsModel = require("../../../models/modlogsModel")
// const mongo = require("../../../utils/mongo")
// const config = require('../../../config.json')

// module.exports = {
//     commands: 'modlogs',
//     cooldown: 10,
//     description: 'Shows the modlogs the specified member',
//     usage: '!modlogs (optional member)',
//     permLevel: 2,
//     callback: async(client, message, args) => {
//             let user
//             if(message.mentions.members.first()) {
//                 user = message.mentions.members.first()
//             } else if(args[0]) {
//                 user = message.guild.members.cache.get(args[0])
//             } else {
//                 user = message.guild.members.cache.get(message.author.id)
//             }

//             if(!user){
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Please specify a member to see modlogs of!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.reply({ embed: embed }).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             const guildID = message.guild.id
//             const userID = user.id

//             await mongo().then(async(mongoose) => {
//                 try {
//                     const result = await modlogsModel.findOne({
//                         guildID: guildID,
//                         userID: userID
//                     })
//                     if(!result){
//                         const embed = new MessageEmbed()
//                         .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL())
//                         .setDescription(`${config.emojis.no} The mentioned member doesn't have any modlogs!`)
//                         .setColor('RED')
//                         .setFooter(config.botname)
//                         .setTimestamp()
//                         return message.reply({ embed: embed })
//                     }
//                     for(const log of result.modlog){
//                         const { logtype, author, authorId, moderator, timestamp, reason } = modlog
//                         let arr = []
//                         arr.push(`**LogType:** ${logtype}\n**Author:** ${author} <@${authorId}>\n**Moderator:** ${moderator}\n**Date:** ${new Date(timestamp).toLocaleDateString()}\n**Reason:** ${reason}\n`)
                    
//                         const embed = new MessageEmbed()
//                         .setTitle(`Modlogs for ${author}`)
//                         .setColor('GREEN')
//                         .setAuthor(`${author}`, message.guild.members.cache.get(authorId).user.displayAvatarURL())
//                         .setDescription(arr.join('\n'))
//                         .setTimestamp()
//                         .setFooter(config.botname)
//                         message.reply({ embed: embed })
//                     }
//                 }finally {
//                     mongoose.connection.close()
//                 }
//             })
//     }
// }