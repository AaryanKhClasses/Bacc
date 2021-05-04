const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    commands: 'kick',
    cooldown: 0,
    permlevel: 2,
    callback: (message, args) => {
        const channel = message.guild.channels.cache.get(config.modlogs)

        if(message.member.hasPermission('KICK_MEMBERS')){
            let reason = args.slice(1).join(' ')

            const user = message.mentions.members.first()
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Please mention a member to kick!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)
            }

            if(!reason) reason = 'No Reason Specified!'
            
            if(user.hasPermission('MANAGE_GUILD') || user.hasPermission("BAN_MEMBERS")){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} That user is a mod/admin! I can't kick them!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)
            } else {
                user.kick(reason)
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully kicked <@${user.id}>!`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)

                const logembed = new MessageEmbed()
                .setTitle('Member Kicked!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Kick',
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
                .setDescription(`${config.emojis.no} You were kicked from **${message.guild.name}** for reason: **${reason}**!`)
                .setFooter(config.botname)
                .setTimestamp()
                user.send(userEmbed)
            }
        } else {
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.no} You don't have permissions to use this command!`)
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            message.channel.send(embed)
        }
    }
}