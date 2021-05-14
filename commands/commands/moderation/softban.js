const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')
const modlogsSchema = require("../../../schemas/modlogsSchema.js")
const mongo = require('../../../utils/mongo.js')

module.exports = {
    commands: 'softban',
    cooldown: 10,
    callback: async(client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

        if(message.member.hasPermission('BAN_MEMBERS')){
            let reason = args.slice(1).join(' ')

            let user
            if(message.mentions.members.first()) {
                user = message.mentions.members.first()
            }else if(args[0]) {
                user = message.guild.members.cache.get(args[0])
            }
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Please mention a member to soft-ban!`)
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
                .setDescription(`${config.emojis.no} You can't soft-ban yourself! Why do you even wanna do that?`)
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
                .setDescription(`${config.emojis.no} That user is a mod/admin! I can't soft-ban them!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })

            } else {
                message.guild.members.ban(user.id, {days: 7, reason: `Softbanned: ${reason}`})
                message.guild.members.unban(user.id, 'Softbanned')
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully Soft banned <@${user.id}>!`)
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
                .setTitle('Member Softbanned!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Softban',
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
                .setDescription(`${config.emojis.no} You were softbanned from **${message.guild.name}** for reason: **${reason}**!`)
                .setFooter(config.botname)
                .setTimestamp()
                user.send(userEmbed)

                const guildId = message.guild.id
                const userId = user.id
                const modlogs = {
                    logtype: 'Soft-Ban',
                    author: message.member.user.tag,
                    authorId: message.member.id,
                    moderator: message.author.tag,
                    timestamp: new Date().getTime(),
                    reason
                }

                await mongo().then(async(mongoose) => {
                    try {
                        await modlogsSchema.findOneAndUpdate(
                            {
                                guildId,
                                userId,
                            },
                            {
                                guildId,
                                userId,
                                $push: {
                                    modLog: modlogs
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