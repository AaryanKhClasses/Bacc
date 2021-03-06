const { MessageEmbed } = require("discord.js")
const config = require('../../../../config.json')

module.exports = {
    commands: 'avatar',
    description: 'Sends the avatar of the specified member',
    usage: '!avatar (optional member)',
    permLevel: 0,
    cooldown: 10,
    callback: async(client, message, args) => {
        let user
        if(message.mentions.members.first()) {
            user = message.mentions.members.first()
        }else if(args[0]) {
            user = message.guild.members.cache.get(args[0])
        } else {
            user = message.guild.members.cache.get(message.author.id)
        }

        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(user.roles.highest.color)
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`Avatar of <@${user.user.id}>`)
        .setImage(user.user.displayAvatarURL())
        message.reply({ embed: embed })
    }
}