const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const modlogsSchema = require("../../../schemas/modlogsSchema.js")
const mongo = require('../../../utils/mongo.js')

module.exports = {
    commands: 'unmute',
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
                .setDescription(`${config.emojis.no} Please mention a member to unmute!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.channel.send(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(!user.roles.cache.find(r => r.name === "Muted")) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Cannot unmute the user as they are already unmuted!`)
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
            
            user.roles.remove(mutedRole, reason )
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully unmuted <@${user.id}>!`)
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
            .setTitle('Member Unmuted!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Unmute',
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
            .setDescription(`${config.emojis.no} You were successfully unmuted in **${message.guild.name}** for reason: **${reason}**!`)
            .setFooter(config.botname)
            .setTimestamp()
            user.send(userEmbed)

            const guildId = message.guild.id
            const userId = user.id
            const modlogs = {
                logtype: 'Unmute',
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