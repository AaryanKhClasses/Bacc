const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const modlogsModel = require("../../../models/modlogsModel.js")
const mongo = require('../../../utils/mongo.js')

module.exports = {
    commands: 'mute',
    cooldown: 10,
    description: 'Mutes the specified member! Requires the `Manage Roles` Permission!',
    usage: '!mute [member] (optional reason)',
    permLevel: 2,
    callback: async(client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)
        const mutedRole = message.guild.roles.cache.find(r => r.name.includes("Muted")).id

        if(message.member.hasPermission('MANAGE_ROLES')){
            let reason = args.slice(1).join(' ')

            let user
            if(message.mentions.members.first()) {
                user = message.mentions.members.first()
            }else if(args[0]) {
                user = message.guild.members.cache.get(args[0])
            }

            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Please mention a member to mute!`)
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
                .setDescription(`${config.emojis.no} You can't mute yourself! Why do you even wanna do that?`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(user.roles.cache.find(r => r.name === "Muted")) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Cannot mute the user as they are already muted!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(!reason) reason = 'No Reason Specified!'
            
            if(user.hasPermission('MANAGE_GUILD') || user.hasPermission("BAN_MEMBERS")){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} That user is a mod/admin! I can't mute them!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })

            } else {
                user.roles.add(mutedRole, reason)
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully muted <@${user.id}>!`)
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
                .setTitle('Member Muted!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Mute',
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
                .setDescription(`${config.emojis.no} You were muted in **${message.guild.name}** for reason: **${reason}**!`)
                .setFooter(config.botname)
                .setTimestamp()
                user.send(userEmbed)

                const guildID = message.guild.id
                const userID = user.id
                const modlog = {
                    logtype: 'Mute',
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
            }
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