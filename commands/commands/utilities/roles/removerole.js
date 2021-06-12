const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'removerole',
    description: 'Removes a role from a member!',
    usage: '!removerole [role] [member]',
    permLevel: 2,
    cooldown: 10,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

            let role
            if(message.mentions.roles.first()) {
                role = message.mentions.roles.first()
            } else if(args[0]){
                role = message.guild.roles.cache.get(args[0])
            }

            let target
            if(message.mentions.members.first()) {
                target = message.mentions.members.first()
            } else if(args[1]) {
                target = message.guild.members.cache.get(args[1])
            }

            if(!role) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Specify a role(mention or id) to remove the role!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(!target) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Specify a member(mention or id) to remove the role to!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            if(!target.roles.has(role)) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Cannot remove the role as the specified member doesnt have the role!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            const userposition = message.guild.members.cache.get(message.author.id).roles.highest.position
            if(userposition <= role.position) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Cannot remove the role as the role you want to remove has a higher or similar position as your role position!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            message.guild.members.cache.find(target).roles.add(role)
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully removed role **<@&${role.id}>** from **<@${target.id}>**!`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.reply(embed).then((message) => {
                message.delete({
                    timeout: 5000
                })
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Role Removed!')
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Role Removed',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Role name',
                    value: `<@&${role.id}>`,
                    inline: true
                },
                {
                    name: 'User',
                    value: `<@${target.id}>`,
                    inline: true
                }
            )
            channel.send(logembed)
    }
}