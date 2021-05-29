// const { MessageEmbed } = require("discord.js")
// const modlogsSchema = require("../../../models/modlogsSchema")
// const mongo = require("../../../utils/mongo")
// const config = require('../../../config.json')

// module.exports = {
//     commands: 'warnings',
//     cooldown: 10,
//     callback: async(client, message, args) => {
//         if(message.member.hasPermission('MANAGE_MESSAGES')){
//             let user
//             if(message.mentions.members.first()) {
//                 user = message.mentions.members.first()
//             } else if(args[0]) {
//                 user = message.guild.members.cache.get(args[0])
//             } else {
//                 user = message.member
//             }

//             if(!user){
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Please mention a member to see warnings of!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             const guildID = message.guild.id
//             const userID = user.id

//             await mongo().then(async(mongoose) => {
//                 try {
//                     const result = await modlogsSchema.findOne({
//                         guildID,
//                         userID,
//                         modlogs: {
//                             logtype: 'Warn'
//                         }
//                     })
//                     if(!result){
//                         const embed = new MessageEmbed()
//                         .setAuthor(`${user.user.tag}`, user.user.displayAvatarURL())
//                         .setDescription(`${config.emojis.no} The mentioned member doesn't have any warnings!`)
//                         .setColor('RED')
//                         .setFooter(config.botname)
//                         .setTimestamp()
//                         message.channel.send(embed)
//                     }
//                     for(const log of result.log){
//                         const { author, authorId, moderator, timestamp, reason } = modlogs
//                         let arr = []
//                         arr.push(`**Author:** ${author} <@${authorId}>\n**Moderator:** ${moderator}\n**Date:** ${new Date(timestamp).toLocaleDateString()}\n**Reason:** ${reason}\n`)
                    
//                         const embed = new MessageEmbed()
//                         .setTitle(`Modlogs for ${author}`)
//                         .setColor('GREEN')
//                         .setAuthor(`${author}`, message.guild.members.cache.get(authorId).user.user.displayAvatarURL())
//                         .setDescription(arr.join('\n'))
//                         .setTimestamp()
//                         .setFooter(config.botname)
//                         message.channel.send(embed)
//                     }
//                 }finally {
//                     mongoose.connection.close()
//                 }
//             })
//         } else {
//             const embed = new MessageEmbed()
//             .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
//             .setColor('RED')
//             .setFooter(config.botname)
//             .setTimestamp()
//             message.channel.send(embed).then((message) => {
//                 message.delete({
//                     timeout: 5000
//                 })
//             })
//         }
//     }
// }