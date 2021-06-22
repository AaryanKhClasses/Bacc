const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('guildMemberAdd', async(member) => {
        const joinLogs = member.guild.channels.cache.find(ch => ch.name.includes('join-logs')).id
        if(!joinLogs){
            return
        }else if(joinLogs){
            const embed = new MessageEmbed()
            .setAuthor(`Member Joined`, member.user.displayAvatarURL())
            .addField(`${config.emojis.date} Member Joined Date`, new Date(member.user.createdTimestamp).toLocaleDateString())
            .addField(`${config.emojis.id} Member ID`, member.id)
            .setDescription(`${config.emojis.personAdd} <@${member.id}> ${member.user.tag}`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            member.guild.channels.cache.get(joinLogs).send({ embed: embed })
        }
    })
}