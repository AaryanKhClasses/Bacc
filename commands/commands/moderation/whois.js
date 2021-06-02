const { MessageButton } = require("discord-buttons")
const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    commands: ['whois', 'userinfo'],
    cooldown: 10,
    callback: (client, message, args) => {
        const btn1 = new MessageButton().setID('main').setLabel('◀ General Info').setStyle('blurple')
        const btn2 = new MessageButton().setID('user').setLabel('▶ Member Info').setStyle('blurple')
        const del = new MessageButton().setID('del').setLabel('✖ Delete').setStyle('red')

        let target
        if(message.mentions.members.first()){
            target = message.mentions.members.first()
        } else if(args[0]){
            target = message.guild.members.cache.get(args[0])
        } else {
            target = message.member
        }   

        let permlevel
        if(target.hasPermission("SEND_MESSAGES")) permlevel = '0 (Normal Member)'
        if(target.hasPermission("MANAGE_MESSAGES")) permlevel = '1 (Helper)'
        if(target.hasPermission("BAN_MEMBERS")) permlevel = '2 (Moderator)'
        if(target.hasPermission("MANAGE_GUILD")) permlevel = '3 (Administrator)'
        if(target.roles.cache.find(r => r.name.includes('Trusted'))) permlevel = '4 (Trusted Admin)'
        if(target.id === message.guild.ownerID) permlevel = '5 (Server Owner)'
        if(target.id === config.botOwner) permlevel = '6 (Bot Owner)'
        
        let isBot
        if(target.user.bot === true) {
            isBot = `${config.emojis.yes}`
        } else if(target.user.bot === false) {
            isBot = `${config.emojis.no}`
        }

        let perm1, perm2, perm3, perm4, perm5, perm6, perm7, perm8, perm9, perm10, perm11, perm12, perm13
        if(target.hasPermission('ADMINISTRATOR')) { perm1 = 'Administrator, ' } else { perm1 = '' }
        if(target.hasPermission('MANAGE_GUILD')) { perm2 = 'Manage Server, ' } else { perm2 = '' }
        if(target.hasPermission('MANAGE_CHANNELS')) { perm3 = 'Manage Channels, ' } else { perm3 = '' }
        if(target.hasPermission('MANAGE_ROLES')) { perm4 = 'Manage Roles, ' } else { perm4 = '' }
        if(target.hasPermission('MANAGE_MESSAGES')) { perm5 = 'Manage Messages, ' } else { perm5 = '' }
        if(target.hasPermission('MANAGE_EMOJIS')) { perm6 = 'Manage Emojis, ' } else { perm6 = '' }
        if(target.hasPermission('KICK_MEMBERS')) { perm7 = 'Kick Members, ' } else { perm7 = '' }
        if(target.hasPermission('BAN_MEMBERS')) { perm8 = 'Ban Members, ' } else { perm8 = '' }
        if(target.hasPermission('MENTION_EVERYONE')) { perm9 = 'Mention Everyone, ' } else { perm9 = '' }
        if(target.hasPermission('MUTE_MEMBERS')) { perm10 = 'Mute Members, ' } else { perm10 = '' }
        if(target.hasPermission('DEAFEN_MEMBERS')) { perm11 = 'Deafen Members, ' } else { perm11 = '' }
        if(target.hasPermission('MOVE_MEMBERS')) { perm12 = 'Move Members' } else { perm12 = '' }
        if(!target.hasPermission('ADMINISTRATOR') && !target.hasPermission('MANAGE_GUILD') && !target.hasPermission('MANAGE_CHANNELS') && !target.hasPermission('MANAGE_MESSAGES') && !target.hasPermission('MANAGE_EMOJIS')
            && !target.hasPermission('KICK_MEMBERS') && !target.hasPermission('BAN_MEMBERS') && !target.hasPermission('MENTION_EVERYONE') && !target.hasPermission('MUTE_MEMBERS') && !target.hasPermission('DEAFEN_MEMBERS') && !target.hasPermission('MOVE_MEMBERS')) {
                perm13 = 'Normal Perms!'
            } else { perm13 = '' }

        const perms = perm1 + perm2 + perm3 + perm4 + perm5 + perm6 + perm7 + perm8 + perm9 + perm10 + perm11 + perm12 + perm13

        const embed1 = new MessageEmbed()
        .setTitle(`User Info for ${target.user.tag}`)
        .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
        .setColor(target.roles.highest.hexColor)
        .setFooter(config.botname)
        .setTimestamp()
        .setThumbnail(target.user.displayAvatarURL())
        .setDescription(
            `${config.emojis.verifiedUser} **General Info**\n` +
            `${config.emojis.blank}${config.emojis.account} **Username:** ${target.user.tag}\n` +
            `${config.emojis.blank}${config.emojis.badge} **Nickname:** ${target.nickname || 'None'}\n` +
            `${config.emojis.blank}${config.emojis.id} **User ID:** ${target.id}\n` +
            `${config.emojis.blank}${config.emojis.bot} **isBot:** ${isBot}\n` +
            `${config.emojis.blank}${config.emojis.cake} **Creation Date:** ${new Date(target.user.createdTimestamp).toLocaleDateString()}\n` +
            `${config.emojis.blank}${config.emojis.analytics} **Status:** ${(target.presence.status).toUpperCase()}\n\n`
        )

        let str
        const rolestr = ((target.roles ? target.roles.cache.map(r => `${r}`).join(`${config.emojis.seperator}`) : '').replace('@everyone', ''))
        if(rolestr.length > 340) {
            str = `${rolestr.slice(0, 340)} \`+ ${target.roles.highest.position - 7}\``
        } else {
            str = rolestr
        }

        const embed2 = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(
            `${config.emojis.user} **Member Info:**\n` +
            `${config.emojis.blank}${config.emojis.palette} **Color:** ${(target.roles.highest.hexColor).toUpperCase()}\n` +
            `${config.emojis.blank}${config.emojis.join} **Joining Date:** ${new Date(target.joinedTimestamp).toLocaleDateString()}\n` +
            `${config.emojis.blank}${config.emojis.nav} **Permission Level:** ${permlevel}\n`
        )
        .addField(`${config.emojis.badge1} Roles:`, str)
        .addField(`${config.emojis.perms} Permissions:`, perms)

            
        message.channel.send({ embed: embed1, buttons: [btn2, del] })

        client.on('clickButton', async(button) => {
            if(button.id === 'main') {
                button.message.edit({ embed: embed1, buttons: [btn2, del] })
            } else if(button.id === 'user') {
                button.message.edit({ embed: embed2, buttons: [btn1, del] })
            } else if(button.id === 'del') {
                button.message.delete()
                message.delete()
            }
        })
    }
}