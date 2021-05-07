const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    const joinLogs = config.joinlogs
    client.on('guildMemberRemove', async(member) => {
        const { guild } = member
        if(!joinLogs){
            return
        }else if(joinLogs){
            const embed = new MessageEmbed()
            .setAuthor('Member Left', member.user.displayAvatarURL())
            .addField('Member ID', member.id)
            .addField('Member Roles', member.roles ? member.roles.cache.map(r => `${r}`).join(' ') : "")
            .setDescription(`<@${member.id}> ${member.user.tag}`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            guild.channels.cache.get(joinLogs).send(embed)
        }
    })
}