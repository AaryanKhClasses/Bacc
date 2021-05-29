const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const afkModel = require('../../../models/afkModel')

module.exports = {
    commands: 'afk',
    cooldown: 10,
    callback: async(client, message, args) => {
        if(message.mentions.roles.first() || message.mentions.members.first()) {
            const embed = new MessageEmbed()
            .setColor('RED')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.no} <@${message.author.id}>, You cannot ping roles or members while setting AFK!`)
            return message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }

        const data = await afkModel.findOne({ guildID: message.guild.id, userID: message.author.id })
        if(!data) {
            const reason = args.slice(0).join(' ') || 'No Reason Specified!'
            const embed = new MessageEmbed()
            .setColor('#3498DB')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.yes} <@${message.author.id}>, You are now **AFK**: ${reason}`)
            message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            const newAfk = new afkModel({
                guildID: message.guild.id,
                userID: message.author.id,
                reason: reason
            })
            newAfk.save()
        } else if(data) {
            await afkModel.deleteOne({ guildID: message.guild.id, userID: message.author.id })
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.yes} Welcome back <@${message.author.id}>! I removed your AFK!`)
            message.channel.send(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }
    }
}