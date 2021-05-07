const { MessageEmbed } = require('discord.js')
const Levelling = require('./levelling')
const config = require('../config.json')

Levelling.setURL(config.mongoPass)

module.exports = async(client) => {
    client.on('message', async(message) => {
        if(!message.guild) return
        if(message.author.bot) return
        if(message.content.startsWith('!')) return

        const randomXp = Math.floor(Math.random() * 9) + 1
        const hasLevelledUp = await Levelling.appendXp(message.author.id, message.guild.id, randomXp)
        const user = await Levelling.fetch(message.author.id, message.guild.id);
        if(hasLevelledUp) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(`Yay <@${message.author.id}>! You have levelled up to ${user.level}!\nLevel up more to get various rewards!`)
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed)
        }
        if(user.level === 1) {
            const lvl1role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl1)
            message.guild.member(message.author.id).roles.add(lvl1role)
        }
        if(user.level === 10) {
            const lvl1role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl1)
            const lvl10role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl10)
            message.guild.member(message.author.id).roles.remove(lvl1role)
            message.guild.member(message.author.id).roles.add(lvl10role)
        }
        if(user.level === 20) {
            const lvl10role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl10)
            const lvl20role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl20)
            message.guild.member(message.author.id).roles.remove(lvl10role)
            message.guild.member(message.author.id).roles.add(lvl20role)
        }
        if(user.level === 35) {
            const lvl20role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl20)
            const lvl35role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl35)
            message.guild.member(message.author.id).roles.remove(lvl20role)
            message.guild.member(message.author.id).roles.add(lvl35role)
        }
        if(user.level === 50) {
            const lvl35role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl35)
            const lvl50role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl50)
            message.guild.member(message.author.id).roles.remove(lvl35role)
            message.guild.member(message.author.id).roles.add(lvl50role)
        }
        if(user.level === 75) {
            const lvl50role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl50)
            const lvl75role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl75)
            message.guild.member(message.author.id).roles.remove(lvl50role)
            message.guild.member(message.author.id).roles.add(lvl75role)
        }
        if(user.level === 100) {
            const lvl75role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl75)
            const lvl100role = message.guild.roles.cache.find(r => r.id === config.levelRoles.lvl100)
            message.guild.member(message.author.id).roles.remove(lvl75role)
            message.guild.member(message.author.id).roles.add(lvl100role)
        }
    })
}