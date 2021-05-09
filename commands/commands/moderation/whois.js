const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')

String.prototype.toProperCase = function(opt_lowerCaseTheRest) {
    return (opt_lowerCaseTheRest ? this.toLowerCase() : this)
      .replace(/(^|[\s\xA0])[^\s\xA0]/g, function(s){ return s.toUpperCase(); });
  };

module.exports = {
    commands: ['whois', 'userinfo'],
    cooldown: 10,
    callback: (client, message, args) => {
        let target
        if(message.mentions.members.first()){
            target = message.mentions.members.first()
        } else if(args[0]){
            target = message.guild.members.cache.get(args[0])
        } else {
            target = message.member
        }   

        let permlevel
        if(target.hasPermission("SEND_MESSAGES")) permlevel = '0 (Normal Member)';
        if(target.hasPermission("MANAGE_MESSAGES")) permlevel = '1 (Helper)';
        if(target.hasPermission("BAN_MEMBERS")) permlevel = '2 (Moderator)';
        if(target.hasPermission("MANAGE_GUILD")) permlevel = '3 (Administrator)';
        if(target.id === message.guild.ownerID) permlevel = '4 (Server Owner)';
        if(target.id === config.botOwner) permlevel = '5 (Bot Owner)';

        const embed = new MessageEmbed()
        .setAuthor(`${target.user.tag}`, target.user.displayAvatarURL())
        .setColor(target.roles.highest.hexColor)
        .setFooter(config.botname)
        .setTimestamp()
        .setThumbnail(target.user.displayAvatarURL())
        .setDescription(
            `**General Information**\n` +
            `\t**Nickname:** ${target.nickname || 'None'}\n` +
            `\t**Username:** ${target.user.username}\n` +
            `\t**User ID:** ${target.id}\n` +
            `\t**isBot:** ${target.user.bot}\n` +
            `\t**Creation Date:** ${new Date(target.user.createdTimestamp).toLocaleDateString()}\n` +
            `\t**Status:** ${(target.presence.status).toUpperCase()}\n\n` +
            `**Member Information:**\n` +
            `\t**Color:** ${(target.roles.highest.hexColor).toUpperCase()}\n` +
            `\t**Joining Date:** ${new Date(target.joinedTimestamp).toLocaleDateString()}\n` +
            `\t**Roles:** ${(target.roles ? target.roles.cache.map(r => `${r}`).join(' ') : '').replace('@everyone', '')}\n` +
            `\t**Permission Level:** ${permlevel}\n` +
            `\t**Permissions:** ${(target.permissions.toArray().join(`, `).replace(/_/g, ' ')).toProperCase(true)}`)

            
        message.channel.send(embed)
    }
}