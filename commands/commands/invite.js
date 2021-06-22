const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: ['invite', 'support'],
    cooldown: 10,
    description: 'Sends the support and invite links!',
    usage: '!invite [or !support]',
    permLevel: 0,
    callback: (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(
            `${config.emojis.share} [**Invite Bacc to your server!**](https://dsc.gg/baccbot)\n` +
            `${config.emojis.contact} [**Join BaccBot Support Server!**](https://dsc.gg/bacc)`
        )
        message.reply({ embed: embed })
    }
}