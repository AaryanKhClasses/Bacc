const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'boostPerks',
    callback: (client, message, args) => {
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(config.botname)
        .setTimestamp()
        .setTitle(`Booster Perks for ${message.guild.name}`)
        .setDescription(
            `**If you boost this server, you will get lots of perks!**\n` +
            `**#1:** Get the <@&840516016047390740> and <@&840516017645027378> roles!\n` +
            `**#2:** Access to Exclusive channels and <#840494797525745674>!\n` +
            `**#3:** Permission to post promotion links in <#840494804630372372>!\n` +
            `**#4:** Perms to Attach Files and Embed Links!\n` +
            `**#5:** ~~Small~~ Chance to become staff!\n`
        )
        message.channel.send(embed)
    }
}