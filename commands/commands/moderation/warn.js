const { MessageEmbed } = require('discord.js')
const fs = require('fs')
const ms = require('ms')
const db = require('quick.db')
const config = require('../../../config.json')

module.exports = {
    commands: 'warn',
    permlevel: 1,
    cooldown: 3,
    callback: async(message, args) => {
        if(message.content === "!warnings"){
            return
        } else {
            const channel = message.guild.channels.cache.get(config.modlogs)

            if(message.member.hasPermission('MANAGE_MESSAGES')){
                let reason = args.slice(1).join(' ')
                const user = message.mentions.members.first()
                let warns = JSON.parse(fs.readFileSync('commands/commands/moderation/warnings.json', 'utf-8'))

                if(!user){
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Please mention a member to warn!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(embed)
                }

                if(reason.length < 1) reason = 'No Reason Supplied!'

                if(!warns[`${user.id}, ${message.guild.id}`]) warns[`${user.id}, ${message.guild.id}`] = {
                    warns: 0
                }

                warns[`${user.id}, ${message.guild.id}`].warns++

                fs.writeFile('commands/commands/moderation/warnings.json', JSON.stringify(warns), err => {
                    if(err) throw err
                })

                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} The member has been warned!`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)

                db.push(`modlogs.${user.id}.log`, `**LogType:** Warn\n**Moderator:** ${message.author.id} (<@${message.author.id}>)\n**Reason:** ${reason}`)

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

                if(warns[`${user.id}, ${message.guild.id}`].warns == 2){
                    const mutedRole = message.guild.roles.cache.find(config.mutedRole)
                    const mutedTime = '60s'

                    message.guild.member(user).roles.add(mutedRole)
                    const mEmbed = new MessageEmbed()
                    .setDescription(`${config.emojis.yes} The member had 2 warns and is muted temporarily!`)
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(mEmbed)

                    setTimeout(function(){
                        message.guild.member(user).roles.remove(mutedRole)
                    }, ms(mutedTime));
                }

                if(warns[`${user.id}, ${message.guild.id}`].warns == 5){
                    message.guild.member(user).kick(`5 Warns by ${config.botname}!`)
                    const kEmbed = new MessageEmbed()
                    .setDescription(`${config.emojis.yes} The member had 5 warns and is kicked from the server!`)
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(kEmbed)
                }

                if(warns[`${user.id}, ${message.guild.id}`].warns == 10){
                    message.guild.member(user).ban(`10 Warns by ${config.botname}!`)
                    const bEmbed = new MessageEmbed()
                    .setDescription(`${config.emojis.yes} The member had 10 warns and is banned from the server!`)
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(bEmbed)
                }
            } else {
                const embed = new MessageEmbed()
                .setDescription(`<:emojino:779190801598775317> You don't have permissions to use this command!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)
            }
        }
    }
}