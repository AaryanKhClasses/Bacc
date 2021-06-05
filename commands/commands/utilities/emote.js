const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'emote',
    description: 'Emote related commands:\n' +
    `${config.emojis.blank} ${config.emojis.add} **Add-Emote:** Adds an emoji to the server\n` +
    `${config.emojis.blank} ${config.emojis.no} **Delete-Emote:** Deletes an emoji from the server\n` +
    `${config.emojis.blank} ${config.emojis.rename} **Rename-Emote:** Renames an emoji\n` +
    `${config.emojis.blank} ${config.emojis.analytics} **Emote-Stats:** Shows the emoji stats of the server`,
    usage: 'The usages of the emoji commands are:\n' +
    `${config.emojis.blank} ${config.emojis.add} **Add-Emote:** !emote add [emoji link] [emoji name]\n` +
    `${config.emojis.blank} ${config.emojis.no} **Delete-Emote:** !emote delete [emoji name]\n` +
    `${config.emojis.blank} ${config.emojis.rename} **Rename-Emote:** !emote rename [old emoji] [new emoji]\n` +
    `${config.emojis.blank} ${config.emojis.analytics} **Emote-Stats:** !emote stats`,
    permLevel: 2,
    cooldown: 10,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)
        if(args[0] === 'add') {
            if(message.member.hasPermission('MANAGE_EMOJIS')) {
                message.guild.emojis.create(args[1], args[2]).then(() => {
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('GREEN')
                    .setDescription(`${config.emojis.yes} Successfully added emoji: :${args[2]}:`)
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()

                    const logembed = new MessageEmbed()
                    .setTitle('Emote Added!')
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    .addFields(
                        {
                            name: 'Action',
                            value: 'Emote Added',
                        },
                        {
                            name: 'Moderator',
                            value: `${message.author.tag} (<@${message.author.id}>)`,
                        },
                        {
                            name: 'Emote',
                            value: `:${args[2]}:`,
                        }
                    )
                    channel.send(logembed)
                })
            } else {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }
        
        } else if(args[0] === 'remove' || args[0] === 'delete') {
            if(message.member.hasPermission('MANAGE_EMOJIS')){
                message.guild.emojis.cache.get(args[1]).delete().then(() => {
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('GREEN')
                    .setDescription(`${config.emojis.yes} Successfully deleted emoji: :${args[1]}:`)
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()

                    const logembed = new MessageEmbed()
                    .setTitle('Emote Deleted!')
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    .addFields(
                        {
                            name: 'Action',
                            value: 'Emote Deleted',
                        },
                        {
                            name: 'Moderator',
                            value: `${message.author.tag} (<@${message.author.id}>)`,
                        },
                        {
                            name: 'Emote',
                            value: `:${args[2]}:`,
                        }
                    )
                    channel.send(logembed)
                })
            } else {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }
        }  else if(args[0] === 'rename') {
            if(message.member.hasPermission('MANAGE_EMOJIS')){
                message.guild.emojis.cache.get(args[1]).edit({ name: args[2] }).then(() => {
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('GREEN')
                    .setDescription(`${config.emojis.yes} Successfully renamed emoji from :${args[1]}: to :${args[2]}:`)
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()

                    const logembed = new MessageEmbed()
                    .setTitle('Emote Renamed!')
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    .addFields(
                        {
                            name: 'Action',
                            value: 'Emote Renamed',
                        },
                        {
                            name: 'Moderator',
                            value: `${message.author.tag} (<@${message.author.id}>)`,
                        },
                        {
                            name: 'Previous Emote',
                            value: `:${args[1]}:`
                        },
                        {
                            name: 'New Emote',
                            value: `:${args[2]}:`,
                        }
                    )
                    channel.send(logembed)
                })
            } else {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }
        } else if(args[0] === 'stats') {
            let total
            if(message.guild.premiumTier === 0) {
                total = 50
            } else if(message.guild.premiumTier === 1) {
                total = 100
            } else if(message.guild.premiumTier === 2) {
                total = 150
            } else if(message.guild.premiumTier === 3) {
                total = 250
            }

            const normalSize = message.guild.emojis.cache.filter(emoji => !emoji.animated).size
            const animatedSize = message.guild.emojis.cache.filter(emoji => emoji.animated).size
            
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('GREEN')
            .setDescription(
                `${config.emojis.yes} **Emoji Stats in ${message.guild.name}**\n` +
                `${config.emojis.blank} **Total Emojis:** ${normalSize} / ${total} (${(normalSize / total) * 100}%)\n` +
                `${config.emojis.blank} **Animated Emojis:** ${animatedSize} / ${total} (${(animatedSize / total) * 100}%)`
                )
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed)

        }
    }
}