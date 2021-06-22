const { MessageEmbed, Permissions } = require("discord.js")
const config = require('../../../config.json')
const modlogsModel = require('../../../models/modlogsModel')

module.exports = {
    commands: 'warn',
    cooldown: 10,
    description: 'Warns the specified member!',
    usage: '!warn [member] (optional reason)',
    permLevel: 2,
    callback: async(client, message, args) => {
        if(message.content.startsWith('!warnings')) return
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

        let reason = args.slice(1).join(' ')

        let target
        if(message.mentions.members.first()) {
            target = message.mentions.members.first()
        }else if(args[0]) {
            target = message.guild.members.cache.get(args[0])
        }
        if(!target){
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} Please mention a member to warn!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })
        }

        if(target.id === message.author.id) {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You can't warn yourself! Why do you even wanna do that?`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })
        }

        if(!reason) reason = 'No Reason Specified!'

        if(target.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || target.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} That user is a mod/admin! I can't warn them!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            return message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })

        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully warned <@${target.id}>!`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })

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
                    value: `${target.user.tag} (<@${target.id}>)`,
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
            channel.send({ embed: logembed })

            const userEmbed = new MessageEmbed()
            .setColor('RED')
            .setDescription(`${config.emojis.no} You were warned in **${message.guild.name}** for reason: **${reason}**!`)
            .setFooter(config.botname)
            .setTimestamp()
            target.send({ embed: userEmbed })

            const guildID = message.guild.id
            const userID = target.id
            const modlog = {
                logtype: 'Warn',
                author: target.user.tag,
                authorId: target.id,
                moderator: message.author.tag,
                timestamp: new Date().getTime(),
                reason
            }

            await modlogsModel.findOneAndUpdate({ guildID: guildID, userID: userID }, { guildID: guildID, userID: userID, $push: { modlog: modlog } }, { upsert: true })
        }
    }
}