const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
    commands: 'addrole',
    description: 'Adds a role to the server!',
    usage: '!addrole [position] [color] [hoisted?] [mentionable?] [role name]',
    permLevel: 2,
    cooldown: 10,
    callback: (client, message, args) => { 
        const channell = message.guild.channels.cache.find(ch => ch.name.includes("mod-logs")).id
        const channel = message.guild.channels.cache.get(channell)


            let position
            const userposition = message.guild.members.cache.get(message.author.id).roles.highest.position
            if(userposition <= position) {
                const embed = new MessageEmbed()
                .setDescription(`${config.emojis.no} Cannot make the role as the position you specified is higher or similar to your role position!`)
                .setColor('RED')
                .setFooter(config.botname)
                .setTimestamp()
                return message.reply({ embed: embed }).then((message) => {
                    message.delete({
                        timeout: 5000
                    })
                })
            } else{
                if(args[0] === '0') {
                    position = 1
                } else if(isNaN(args[0])) {
                    position = 1
                } else {
                    position = args[0]
                }   
            }

            let color
            if(args[1]) {
                color = args[1].toUpperCase()
            } else {
                color = '#00000'
                args[1].toUpperCase() = color
            }

            let hoisted
            if(args[2]) {
                if(args[2] === 'true'){
                    hoisted = true
                } else if(args[2] === 'false') {
                    hoisted = false
                } else {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Value of 'hoisted' must be either '**true**' or '**false**'!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.reply({ embed: embed }).then((message) => {
+ client.setTimeout(() => message.delete(), 5000);                    })
                }
            } else {
                hoisted = false
                args[2] = hoisted
            }

            let mentionable
            if(args[3]) {
                if(args[3] === 'true'){
                    mentionable = true
                } else if(args[3] === 'false') {
                    mentionable = false
                } else {
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.no} Value of 'mentionable' must be either '**true**' or '**false**'!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    return message.reply({ embed: embed }).then((message) => {
+ client.setTimeout(() => message.delete(), 5000);                    })
                }
            } else {
                mentionable = false
                args[3] = mentionable
            }

            let role
            if(args[4]) {
                role = args.slice(4).join(' ')
            } else {
                role = 'Unnamed Role'
            }

            message.guild.roles.create({ data: { name: role, color: color, hoisted: hoisted, mentionable: mentionable, position: position } })
            const embed = new MessageEmbed()
            .setDescription(`${config.emojis.yes} Successfully added role **${role}**!\n**Role Details:** Color: ${color}, Hoisted: ${hoisted}, Mentionable: ${mentionable}, Position: ${position}`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            message.reply({ embed: embed }).then((message) => {
                client.setTimeout(() => message.delete(), 5000)
            })
            message.delete()

            const logembed = new MessageEmbed()
            .setTitle('Role Added!')
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            .addFields(
                {
                    name: 'Action',
                    value: 'Role Added',
                },
                {
                    name: 'Moderator',
                    value: `${message.author.tag} (<@${message.author.id}>)`,
                },
                {
                    name: 'Role name',
                    value: role,
                    inline: true
                },
                {
                    name: 'Color',
                    value: color,
                    inline: true
                },
                {
                    name: 'Hoisted',
                    value: hoisted,
                    inline: true
                },
                {
                    name: 'Mentionable',
                    value: mentionable,
                    inline: true
                },
                {
                    name: 'Position',
                    value: position,
                    inline: true
                }
            )
            channel.send(logembed)
    }
}