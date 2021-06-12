const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'serverinfo',
    cooldown: 10,
    description: 'Shows the server info of the server!',
    usage: '!serverinfo',
    permLevel: 0,
    callback: (client, message, args) => {
        let isPartnered
        if(message.guild.partnered === true) {
            isPartnered = `${config.emojis.yes}`
        } else if(message.guild.partnered === false) {
            isPartnered = `${config.emojis.no}`
        }

        let isVerified
        if(message.guild.partnered === true) {
            isVerified = `${config.emojis.yes}`
        } else if(message.guild.partnered === false) {
            isVerified = `${config.emojis.no}`
        }

        const { guild } = message
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('#3498DB')
        .setFooter(config.botname)
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setTitle(`Server Info for ${guild.name}`)
        .setDescription(
            `${config.emojis.verifiedUser} **General Information:**\n` +
            `${config.emojis.blank} ${config.emojis.user} **Owner Name:** ${guild.owner.user.tag} (<@${guild.ownerID}>)\n` +
            `${config.emojis.blank} ${config.emojis.id} **Owner ID:** ${guild.owner.id}\n` +
            `${config.emojis.blank} ${config.emojis.cake} **Server Created:** ${(new Date(guild.createdTimestamp)).toLocaleDateString()}\n` +
            `${config.emojis.blank} ${config.emojis.badge} **Server Name & ID:** ${guild.name} | ${guild.id}\n` +
            `${config.emojis.blank} ${config.emojis.group} **MemberCount:** ${guild.memberCount}\n` +
            `${config.emojis.blank} ${config.emojis.admin} **is Partnered:** ${isPartnered}\n` + 
            `${config.emojis.blank} ${config.emojis.verified} **Is Verified:** ${isVerified}\n` + 
            `${config.emojis.blank} ${config.emojis.starHalf} **Boosts:** ${guild.premiumSubscriptionCount} (Boost Level ${guild.premiumTier})\n` +
            `${config.emojis.blank} ${config.emojis.emoji} **Emojis:** ${guild.emojis.cache.size}\n` +
            `${config.emojis.blank} ${config.emojis.badge1} **Roles:** ${(guild.roles.cache.size) - 1}\n\n` + 
            `${config.emojis.info} **Channels Information**\n` +
            `${config.emojis.blank} ${config.emojis.topic} **Total Channels:** ${guild.channels.cache.size}\n` +
            `${config.emojis.blank} ${config.emojis.rules} **Rules Channel:** ${guild.rulesChannel}\n` +
            `${config.emojis.blank} ${config.emojis.bed} **AFK Channel:** ${guild.afkChannel || 'No AFK Channel'}\n` +
            `${config.emojis.blank} ${config.emojis.system} **System Messages Channel:** ${guild.systemChannel}\n` +
            `${config.emojis.blank} ${config.emojis.description} **Server Description:** ${guild.description || 'No Server Description!'}`
        )
        message.reply(embed)
    }
}