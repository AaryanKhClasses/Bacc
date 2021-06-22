// const config = require('../../../config.json')
// const { MessageEmbed } = require('discord.js')

// module.exports = {
//     commands: 'unlock',
//     cooldown: 10,
//     description: 'Unlocks a locked channel!',
//     usage: '!unlock (optional channel/all)',
//     permLevel: 4,
//     callback: (client, message, args) => {
//         let channelID
//         if(message.mentions.channels.first()) {
//             channelID = message.mentions.channels.first()
//         } else if(args[0]) {
//             if(args[0] !== 'all') { channelID = message.guild.channels.cache.get(args[0]) }
//         } else {
//             channelID = message.channel
//         }

//         if(message.guild.members.cache.get(message.author.id).roles.cache.find(r => r.name.includes('Trusted')) || message.author.id === message.guild.ownerID) {
//             if(args[0] && args[0].toLowerCase() === 'all') {
//                 const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category' && ch.name.includes('-🔒'))
//                 channels.forEach(channel => {
//                     channel.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true, CONNECT: true }).then(() => { channel.setName(channel.name.replace('-🔒', '')) })
//                 })
//                 const embed = new MessageEmbed()
//                 .setColor('GREEN')
//                 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .setDescription(`${config.emojis.yes} Successfully unlocked \`ALL\` channels!`)
//                 message.reply({ embed: embed })
//                 return message.reply({ embed: embed })
//             }

//             if(!channelID.name.includes('-🔒')) {
//                 const embed = new MessageEmbed()
//                 .setColor('RED')
//                 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .setDescription(`${config.emojis.no} Channel \`${channelID.name}\` is already unlocked!`)
//                 message.reply({ embed: embed })
//                 return message.reply({ embed: embed })
//             }
//             channelID.updateOverwrite(message.guild.roles.everyone, { SEND_MESSAGES: true, CONNECT: true }).then(() => channelID.setName(channelID.name.replace('-🔒', '')))
//             const embed = new MessageEmbed()
//             .setColor('GREEN')
//             .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//             .setFooter(config.botname)
//             .setTimestamp()
//             .setDescription(`${config.emojis.yes} Successfully unlocked \`${channelID.name}\`!`)
//             message.reply({ embed: embed })
//             return message.reply({ embed: embed })
//         }
//     }
// }