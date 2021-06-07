const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    client.on('roleCreate', async(role) => {
        const channell = role.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id

        let isHoisted
        if(role.hoist === true) {
            isHoisted = `${config.emojis.yes}`
        } else if(role.hoist === false) {
            isHoisted = `${config.emojis.no}`
        }

        let isMentionable
        if(role.mentionable === true) {
            isMentionable = `${config.emojis.yes}`
        } else if(role.mentionable === false) {
            isMentionable = `${config.emojis.no}`
        }

        const logEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setFooter(config.botname)
        .setTimestamp()
        .setAuthor(`Role Created`, role.guild.iconURL())
        .addField(`${config.emojis.badge1} Role`, `<@&${role.id}> (${role.id})`)
        .addField(`${config.emojis.badge} Role Name`, role.name , true)
        .addField(`${config.emojis.palette} Role Color`, role.hexColor , true)
        .addField(`${config.emojis.leaderboard} Role Position`, role.position , true)
        .addField(`${config.emojis.star} Hoisted`, isHoisted , true)
        .addField(`${config.emojis.mention} Mentionable`, isMentionable, true)
        await role.guild.channels.cache.get(channell).send(logEmbed)
    })
}