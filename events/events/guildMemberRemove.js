const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('guildMemberRemove', async(member) => {
        const joinLogs = member.guild.channels.cache.find(ch => ch.name.includes('join-logs')).id
        if(!joinLogs){
            return
        }else if(joinLogs){
            const embed = new MessageEmbed()
            .setAuthor(`Member Left`, member.user.displayAvatarURL())
            .addField(`${config.emojis.id} Member ID`, member.id)
            .addField(`${config.emojis.badge1} Member Roles`, member.roles ? member.roles.cache.map(r => `${r}`).join(' ') : "")
            .setDescription(`${config.emojis.personRemove} <@${member.id}> ${member.user.tag}`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            member.guild.channels.cache.get(joinLogs).send(embed)
        }
    })
}