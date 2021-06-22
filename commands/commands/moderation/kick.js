// const { MessageEmbed } = require("discord.js")
// const config = require('../../../config.json')
// const modlogsModel = require("../../../models/modlogsModel.js")
// const mongo = require('../../../utils/mongo.js')

// module.exports = {
//     commands: 'kick',
//     description: 'Kicks the specified member! Requires the `Kick Members` Permission!',
//     usage: '!kick [member] (optional reason)',
//     permLevel: 2,
//     cooldown: 10,
//     callback: async(client, message, args) => {
//         const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
//         const channel = message.guild.channels.cache.get(channell)

//             let reason = args.slice(1).join(' ')

//             let user
//             if(message.mentions.members.first()) {
//                 user = message.mentions.members.first()
//             }else if(args[0]) {
//                 user = message.guild.members.cache.get(args[0])
//             }

//             if(!user){
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Please mention a member to kick!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.reply({ embed: embed }).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(user.id === message.author.id) {
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} You can't kick yourself! Why do you even wanna do that?`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.reply({ embed: embed }).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(!reason) reason = 'No Reason Specified!'
            
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} That user is a mod/admin! I can't kick them!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.reply({ embed: embed }).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })

//             } else {
//                 user.kick(reason)
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.yes} Successfully kicked <@${user.id}>!`)
//                 .setColor('GREEN')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 message.reply({ embed: embed }).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//                 message.delete()

//                 const logembed = new MessageEmbed()
//                 .setTitle('Member Kicked!')
//                 .setColor('GREEN')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .addFields(
//                     {
//                         name: 'Action',
//                         value: 'Kick',
//                     },
//                     {
//                         name: 'User',
//                         value: `${user.user.tag} (<@${user.id}>)`,
//                     },
//                     {
//                         name: 'Moderator',
//                         value: `${message.author.tag} (<@${message.author.id}>)`,
//                     },
//                     {
//                         name: 'Reason',
//                         value: reason,
//                     }
//                 )
//                 channel.send(logembed)

//                 const userEmbed = new MessageEmbed()
//                 .setColor('RED')
//                 .setDescription(`${config.emojis.no} You were kicked from **${message.guild.name}** for reason: **${reason}**!`)
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 user.send(userEmbed)

//                 const guildID = message.guild.id
//                 const userID = user.id
//                 const modlog = {
//                     logtype: 'Kick',
//                     author: message.guild.members.cache.get(message.author.id).user.tag,
//                     authorId: message.guild.members.cache.get(message.author.id).id,
//                     moderator: message.author.tag,
//                     timestamp: new Date().getTime(),
//                     reason
//                 }

//                 await mongo().then(async(mongoose) => {
//                     try {
//                         await modlogsModel.findOneAndUpdate(
//                             {
//                                 guildID,
//                                 userID,
//                             },
//                             {
//                                 guildID,
//                                 userID,
//                                 $push: {
//                                     modlog: modlog
//                                 }
//                             },
//                             {
//                                 upsert: true
//                             }
//                         )
//                     } finally {
//                         mongoose.connection.close()
//                     }
//                 })
//             }
//     }
// }