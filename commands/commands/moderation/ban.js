const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    commands: 'ban',
    cooldown: 0,
    permlevel: 2,
    callback: (message, args) => {
        const channel = message.guild.channels.cache.get(config.modlogs)

        if(message.member.hasPermission('BAN_MEMBERS')){
            let reason = args.slice(1).join(' ')

            const user = message.mentions.members.first()
            if(!user){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Please mention a member to ban!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)
            }

            if(!reason) reason = 'No Reason Specified!'
            
            if(user.hasPermission('MANAGE_GUILD') || user.hasPermission("BAN_MEMBERS")){
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} That user is a mod/admin! I can't ban them!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)
            } else {
                message.guild.members.ban(user.id, {days: 7, reason: reason})
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.yes} Successfully banned <@${user.id}>!`)
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                message.channel.send(embed)

                const logembed = new MessageEmbed()
                .setTitle('Member Banned!')
                .setColor('GREEN')
                .setFooter(config.botname)
                .setTimestamp()
                .addFields(
                    {
                        name: 'Action',
                        value: 'Ban',
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
                .setDescription(`${config.emojis.no} You were banned from **${message.guild.name}** for reason: **${reason}**!`)
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