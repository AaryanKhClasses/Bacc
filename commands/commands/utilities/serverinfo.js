const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'serverinfo',
    cooldown: 10,
    callback: (client, message, args) => {
        const { guild } = message
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor('#3498DB')
        .setFooter(config.botname)
        .setThumbnail(guild.iconURL())
        .setTimestamp()
        .setTitle(`Server Info for ${guild.name}`)
        .setDescription(
            `**General Information:**\n` +
            `${config.emojis.blank}**Owner Name:** ${guild.owner.user.tag} (<@${guild.ownerID}>)\n` +
            `${config.emojis.blank}**Owner ID:** ${guild.owner.id}\n` +
            `${config.emojis.blank}**Server Created:** ${(new Date(guild.createdTimestamp)).toLocaleDateString()}\n` +
            `${config.emojis.blank}**Server Name & ID:** ${guild.name} | ${guild.id}\n` +
            `${config.emojis.blank}**MemberCount:** ${guild.memberCount}\n` +
            `${config.emojis.blank}**is Partnered:** ${(guild.partnered).toString().replace('true', 'Yes').replace('false', 'No')}\n` + 
            `${config.emojis.blank}**Is Verified:** ${(guild.verified).toString().replace('true', 'Yes').replace('false', 'No')}\n` + 
            `${config.emojis.blank}**Boosts:** ${guild.premiumSubscriptionCount} (Boost Level ${guild.premiumTier})\n` +
            `${config.emojis.blank}**Emojis:** ${guild.emojis.cache.size}\n` +
            `${config.emojis.blank}**Roles:** ${(guild.roles.cache.size) - 1}\n\n` + 
            `**Channels Information**\n` +
            `${config.emojis.blank}**Total Channels:** ${guild.channels.cache.size}\n` +
            `${config.emojis.blank}**Rules Channel:** ${guild.rulesChannel}\n` +
            `${config.emojis.blank}**AFK Channel:** ${guild.afkChannel || 'No AFK Channel'}\n` +
            `${config.emojis.blank}**System Messages Channel:** ${guild.systemChannel}\n` +
            `${config.emojis.blank}**Server Description:** ${guild.description || 'No Server Description!'}`
        )
        message.channel.send(embed)
    }
}