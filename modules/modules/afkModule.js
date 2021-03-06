const afkModel = require("../../models/afkModel")
const { MessageEmbed } = require('discord.js')
const config = require('../../config.json')

module.exports = (client) => {
    client.on('message', async(message) => {
        if(message.author.bot) return
        const mentioned = message.mentions.members.first()
        if(mentioned) {
            const data = await afkModel.findOne({ userID: mentioned.id })
            if(data) {
                const embed = new MessageEmbed()
                .setColor('RED')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(config.botname)
                .setTimestamp()
                .setDescription(`<@${mentioned.id}> is currently AFK: ${data.reason}`)
                message.reply({ embed: embed }).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }
        }
        
        const mainData = await afkModel.findOne({ guildID: message.guild.id, userID: message.author.id })
        if(mainData) {
            const embed = new MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setFooter(config.botname)
            .setTimestamp()
            .setDescription(`${config.emojis.yes} Welcome back <@${message.author.id}>! I removed your AFK!`)
            message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })
            mainData.deleteOne({ guildID: message.guild.id, userID: message.author.id })
        }
    })
}