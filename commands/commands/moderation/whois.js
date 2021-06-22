// const { MessageEmbed, Permissions } = require('discord.js')
// const { Menu } = require('discord.js-menu')
// const config = require('../../../config.json')

// module.exports = {
//     commands: ['whois', 'userinfo'],
//     description: 'Sends the userinfo of the specified member!',
//     cooldown: 10,
//     permLevel: 0,
//     callback: (client, message, args) => {
//         // const btn1 = new MessageButton().setID('main').setLabel('◀ General Info').setStyle('blurple')
//         // const btn2 = new MessageButton().setID('user').setLabel('▶ Member Info').setStyle('blurple')
//         // const del = new MessageButton().setID('del').setLabel('✖ Delete').setStyle('red')

//         let target
//         if(message.mentions.members.first()){
//             target = message.mentions.members.first()
//         } else if(args[0]){
//             target = message.guild.members.cache.get(args[0])
//         } else {
//             target = message.guild.members.cache.get(message.author.id)
//         }   

//         let permlevel
//         if(target.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) permlevel = `${config.emojis.user} Normal Member`
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) permlevel = `${config.emojis.info} Helper`
//         if(target.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) permlevel = `${config.emojis.mod} Moderator`
//         if(target.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) permlevel = `${config.emojis.admin} Administrator`
//         if(target.roles.cache.find(r => r.name.includes(`Trusted`))) permlevel = `${config.emojis.manage} Trusted Admin`
//         if(target.id === message.guild.ownerID) permlevel = `${config.emojis.star} Server Owner`
//         if(target.id === config.botOwner) permlevel = `${config.emojis.copyright} Bot Owner`
        
//         let isBot
//         if(target.user.bot === true) {
//             isBot = `${config.emojis.yes}`
//         } else if(target.user.bot === false) {
//             isBot = `${config.emojis.no}`
//         }

//         let perm1, perm2, perm3, perm4, perm5, perm6, perm7, perm8, perm9, perm10, perm11, perm12, perm13
//         if(target.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { perm1 = 'Administrator, ' } else { perm1 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) { perm2 = 'Manage Server, ' } else { perm2 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) { perm3 = 'Manage Channels, ' } else { perm3 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) { perm4 = 'Manage Roles, ' } else { perm4 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) { perm5 = 'Manage Messages, ' } else { perm5 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)) { perm6 = 'Manage Emojis, ' } else { perm6 = '' }
//         if(target.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) { perm7 = 'Kick Members, ' } else { perm7 = '' }
//         if(target.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { perm8 = 'Ban Members, ' } else { perm8 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MENTION_EVERYONE)) { perm9 = 'Mention Everyone, ' } else { perm9 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) { perm10 = 'Mute Members, ' } else { perm10 = '' }
//         if(target.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS)) { perm11 = 'Deafen Members, ' } else { perm11 = '' }
//         if(target.permissions.has(Permissions.FLAGS.MOVE_MEMBERS)) { perm12 = 'Move Members' } else { perm12 = '' }
//         if(!target.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !target.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && !target.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS) && !target.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !target.permissions.has(Permissions.FLAGS.MANAGE_ROLES) && !target.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS)
//             && !target.permissions.has(Permissions.FLAGS.KICK_MEMBERS) && !target.permissions.has(Permissions.FLAGS.BAN_MEMBERS) && !target.permissions.has(Permissions.FLAGS.MENTION_EVERYONE) && !target.permissions.has(Permissions.FLAGS.MUTE_MEMBERS) && !target.permissions.has(Permissions.FLAGS.DEAFEN_MEMBERS) && !target.permissions.has('MOVE_MEMBERS')) {
//                 perm13 = 'Normal Perms!'
//             } else { perm13 = '' }

//         const perms = perm1 + perm2 + perm3 + perm4 + perm5 + perm6 + perm7 + perm8 + perm9 + perm10 + perm11 + perm12 + perm13

//         const embed1 = new MessageEmbed()
//         .setTitle(`User Info for ${target.user.tag}`)
//         .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
//         .setColor(target.roles.highest.hexColor)
//         .setFooter(config.botname)
//         .setTimestamp()
//         .setThumbnail(target.user.displayAvatarURL())
//         .setDescription(
//             `${config.emojis.verifiedUser} **General Info**\n` +
//             `${config.emojis.blank}${config.emojis.account} **Username:** ${target.user.tag}\n` +
//             `${config.emojis.blank}${config.emojis.badge} **Nickname:** ${target.nickname || 'None'}\n` +
//             `${config.emojis.blank}${config.emojis.id} **User ID:** ${target.id}\n` +
//             `${config.emojis.blank}${config.emojis.bot} **isBot:** ${isBot}\n` +
//             `${config.emojis.blank}${config.emojis.cake} **Creation Date:** ${new Date(target.user.createdTimestamp).toLocaleDateString()}\n` +
//             `${config.emojis.blank}${config.emojis.analytics} **Status:** ${(target.presence.status).toUpperCase()}\n\n`
//         )

//         let str
//         const rolestr = ((target.roles ? target.roles.cache.map(r => `${r}`).join(`${config.emojis.seperator}`) : '').replace('@everyone', ''))
//         if(rolestr.length > 340) {
//             str = `${rolestr.slice(0, 340)} \`+ ${target.roles.highest.position - 7}\``
//         } else {
//             str = rolestr
//         }

//         const embed2 = new MessageEmbed()
//         .setColor('GREEN')
//         .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//         .setFooter(config.botname)
//         .setTimestamp()
//         .setDescription(
//             `${config.emojis.user} **Member Info:**\n` +
//             `${config.emojis.blank}${config.emojis.palette} **Color:** ${(target.roles.highest.hexColor).toUpperCase()}\n` +
//             `${config.emojis.blank}${config.emojis.join} **Joining Date:** ${new Date(target.joinedTimestamp).toLocaleDateString()}\n` +
//             `${config.emojis.blank}${config.emojis.nav} **Permission Level:** ${permlevel}\n`
//         )
//         .addField(`${config.emojis.badge1} Roles:`, str || 'No Roles')
//         .addField(`${config.emojis.perms} Permissions:`, perms)

            
//         // message.reply({ embed: embed1, buttons: [btn2, del] })

//         // client.on('clickButton', async(button) => {
//         //     if(button.id === 'main') {
//         //         button.message.edit({ embed: embed1, buttons: [btn2, del] })
//         //     } else if(button.id === 'user') {
//         //         button.message.edit({ embed: embed2, buttons: [btn1, del] })
//         //     } else if(button.id === 'del') {
//         //         button.message.delete()
//         //         message.delete()
//         //     }
//         // })

//         const menu1 = new Menu(message.channel, message.author.id, [
//             {
//                 name: 'general',
//                 content: embed1,
//                 reactions: {
//                     '849591003417542686' : 'member',
//                     '849572880596860988' : 'delete'
//                 }
//             },
//             {
//                 name: 'member',
//                 content: embed2,
//                 reactions: {
//                     '849572880564224040' : 'general',
//                     '849572880596860988' : 'delete'
//                 }
//             }
//         ])

//         menu1.start()
//     }
// }