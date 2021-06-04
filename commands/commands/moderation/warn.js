const { MessageEmbed } = require('discord.js')
const config = require('../../../config.json')
const modlogsModel = require("../../../models/modlogsModel")
const mongo = require("../../../utils/mongo")

module.exports = {
    commands: 'warn',
    cooldown: 10,
    description: 'Warns the specified member! Requires the `Manage Messages` Permission!',
    usage: '!kick [member] (optional reason)',
    permLevel: 1,
    callback: async(client, message, args) => {
        if(message.content.startsWith("!warnings")){
            return
        } else {
            const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
            const channel = message.guild.channels.cache.get(channell)

            if(message.member.hasPermission('MANAGE_MESSAGES')){
                let reason = args.slice(1).join(' ')
                let user
                if(message.mentions.members.first()) {
                    user = message.mentions.members.first()
                } else if(args[0]) {
                    user = message.guild.members.cache.get(args[0])
                }

                if(!user){
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please mention a member to warn!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }

                if(user.id === message.author.id) {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} You can't warn yourself! Why do you even wanna do that?`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                }

                if(reason.length < 1) reason = 'No Reason Supplied!'

                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} The member has been warned!`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
                message.delete()

                const logembed = new MessageEmbed()
                .setTitle('Member Warned!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Warn',
                    },
                    {
                        name: 'User',
                        value: `${user.user.tag} (<@${user.id}>)`,
                    },
                    {
                        name: 'Moderator',
                        value: `${message.author.tag} (<@${message.author.id}>)`,
                    },
                    {
                        name: 'Reason',
                        value: reason,
                    }
                )
                channel.send(logembed)

                const userEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`${config.emojis.no} You were warned in **${message.guild.name}** for reason: **${reason}**!`)
                .setFooter(config.botname)
                .setTimestamp()
                user.send(userEmbed)

                const guildID = message.guild.id
                const userID = user.id
                const modlog = {
                    logtype: 'Warn',
                    author: message.member.user.tag,
                    authorId: message.member.id,
                    moderator: message.author.tag,
                    timestamp: new Date().getTime(),
                    reason
                }

                await mongo().then(async(mongoose) => {
                    try {
                        await modlogsModel.findOneAndUpdate(
                            {
                                guildID,
                                userID,
                            },
                            {
                                guildID,
                                userID,
                                $push: {
                                    modlog: modlog
                                }
                            },
                            {
                                upsert: true
                            }
                        )
                    } finally {
                        mongoose.connection.close()
                    }
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
        }
    }
}
        
    
