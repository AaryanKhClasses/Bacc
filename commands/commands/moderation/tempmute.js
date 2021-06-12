// const config = require('../../../config.json')
// const { MessageEmbed } = require('discord.js')
// const ms = require('ms')
// const modlogsModel = require("../../../models/modlogsModel.js")
// const mongo = require('../../../utils/mongo.js')

// module.exports = {
//     commands: 'tempmute',
//     cooldown: 10,
//     description: 'Temporarily mutes the specified member! Requires the `Manage Roles` Permission!',
//     usage: '!tempmute [member] [duration] (optional reason)',
//     permLevel: 2,
//     callback: async(client, message, args) => {
//         const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
//         const channel = message.guild.channels.cache.get(channell)
//         const mutedRole = message.guild.roles.cache.find(r => r.name.includes("Muted")).id
//         const mutedTime = args[1] / 1000

//             let reason = args.slice(2).join(' ')

//             let user
//             if(message.mentions.members.first()) {
//                 user = message.mentions.members.first()
//             }else if(args[0]) {
//                 user = message.guild.members.cache.get(args[0])
//             }

//             if(!user){
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Please mention a member to mute!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(user.id === message.author.id) {
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} You can't mute yourself! Why do you even wanna do that?`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(user.roles.cache.find(r => r.name === "Muted")) {
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Cannot mute the user as they are already muted!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(!mutedTime) {
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} Please specify a time to mute the user!\nEx., 60s, 10m, 2hr, etc.`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//             }

//             if(!reason) reason = 'No Reason Specified!'
            
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.no} That user is a mod/admin! I can't mute them!`)
//                 .setColor('RED')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 return message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })

//             } else {
//                 user.roles.add(mutedRole, reason)
//                 const embed = new MessageEmbed()
//                 .setDescription(`${config.emojis.yes} Successfully muted <@${user.id}>!`)
//                 .setColor('GREEN')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 message.channel.send(embed).then((message) => {
//                     message.delete({
//                         timeout: 5000
//                     })
//                 })
//                 message.delete()
//                 setTimeout(function(){
//                 message.guild.member(user).roles.remove(mutedRole)
//                 }, ms(mutedTime));


//                 const logembed = new MessageEmbed()
//                 .setTitle('Member Muted!')
//                 .setColor('GREEN')
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .addFields(
//                     {
//                         name: 'Action',
//                         value: 'Temp Mute',
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
//                 .setDescription(`${config.emojis.no} You were temperorily muted in **${message.guild.name}** for reason: **${reason}**!\nYou are muted for **${mutedTime}**!`)
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 user.send(userEmbed)

//                 const guildID = message.guild.id
//                 const userID = user.id
//                 const modlog = {
//                     logtype: 'Temp Mute',
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