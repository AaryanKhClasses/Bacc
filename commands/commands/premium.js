const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'premium',
    cooldown: 5,
    description: 'See the perks of purchasing **Bacc Premium**',
    usage: '!premium',
    permLevel: 0,
    callback: (client, message, args) => {
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(
            `${config.emojis.badge1} **Perks for getting Bacc Premium!**\n` +
            `${config.emojis.blank} ${config.emojis.slowmode} **Reduced Cooldowm:** All the command cooldowns will be reduced to \`HALF\`!\n` +
            `${config.emojis.blank} ${config.emojis.bed} **AFK Command:** Members can set their AFK!\n` +
            `${config.emojis.blank} ${config.emojis.currency} **Monthly Currency:** Members can get access the the \`!monthly\` command!\n` +
            `${config.emojis.blank} ${config.emojis.slowmode} **Slowmode Command:** Slowmode commands can be accessed!`
        )
        message.reply({ embed: embed })
    }
}