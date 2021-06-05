const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'create-channel',
    description: 'Creates a channel to the specified category!',
    usage: '!create-channel [category] [channel type(text/voice/news)] [channel name]',
    permLevel: 3,
    cooldown: 10,
    callback: (client, message, args) => {
        if(message.member.hasPermission('MANAGE_CHANNELS')){
            const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
            const channel = message.guild.channels.cache.get(channell)
            const categoryId = args[0]
            const channelType = args[1]
            const channelName = args.slice(2).join(' ')
            const e = ['text', 'voice', 'news']
            const category = message.guild.channels.cache.find(cat => cat.id === categoryId)

            if(!e.includes(channelType.toLowerCase())) {
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Channel Type must be either 'text', 'voice' or 'news'!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.lineReply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(!channelName){
                const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setDescription(`${config.emojis.no} Please specify a name to make the channel!`)
                .setFooter(config.botname)
                .setColor('RED')
                .setTimestamp()
                return message.lineReply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            message.guild.channels.create(channelName, { type: channelType }).then((channel) => channel.setParent(categoryId))
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setDescription(`${config.emojis.yes} Successfully made channel **${channelName}** of type **"${channelType}"** in category **${category}**!`)
            .setFooter(config.botname)
            .setColor('GREEN')
            .setTimestamp()
            message.lineReply(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Channel Created!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Channel Created',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Channel Name',
                    value: channelName,
                    inline: true
                },
                {
                    name: 'Channel Type',
                    value: channelType,
                    inline: true
                },
                {
                    name: 'Category Name',
                    value: category,
                    inline: true
                }
            )
            channel.send(logembed)
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.lineReply(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
        }
    }
}