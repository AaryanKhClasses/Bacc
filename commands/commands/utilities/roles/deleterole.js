const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'deleterole',
    description: 'Deletes a role from the server!',
    usage: '!deleterole [role]',
    permLevel: 2,
    cooldown: 10,
    callback: (client, message, args) => {
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)

            let role
            if(message.mentions.roles.first()) {
                role = message.mentions.roles.first()
            } else if(args[0]){
                role = message.guild.roles.cache.find(r => r.id === args[0])
            }

            if(!role) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Specify a role(mention or id) to delete the role!`)
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
                .setDescription(`${config.emojis.no} Cannot delete the role as the role you want to delete has a higher or similar position as your role position!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply(embed).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            }

            message.guild.roles.cache.find(r => r.id === role.id).delete()
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully deleted role **<@&${role.id}>**!`)
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
            .setTitle('Role Deleted!')
            .setColor('RED')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Role Deleted',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Role name',
                    value: `${role.name}`
                }
            )
            channel.send(logembed)
    }
}