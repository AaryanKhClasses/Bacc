const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {
    const joinLogs = config.joinlogs
    const welcome = config.welcomeChannel

    const invites = {}
    const getInviteCounts = async(guild) => {
        return await new Promise((resolve) => {
            guild.fetchInvites().then((invites) => {
                const inviteCounter = {}

                invites.forEach((invite) => {
                    const { uses, inviter } = invite
                    const { username, discriminator } = inviter
        
                    const name = `${username}#${discriminator}`
                    inviteCounter[name] = (inviteCounter[name] || 0) + uses
                })
                resolve(inviteCounter)
            })
        })
    }
    client.guilds.cache.forEach(async(guild) => {
        invites[guild.id] = await getInviteCounts(guild)
    })


    client.on('guildMemberAdd', async(member) => {
        const { guild } = member
        if(!joinLogs){
            return
        }else if(joinLogs){
            const embed = new MessageEmbed()
            .setAuthor('Member Joined', member.user.displayAvatarURL())
            .addField('Member Joined Date', new Date(member.user.createdTimestamp).toLocaleDateString())
            .addField('Member ID', member.id)
            .setDescription(`<@${member.id}> ${member.user.tag}`)
            .setColor('GREEN')
            .setFooter(config.botname)
            .setTimestamp()
            guild.channels.cache.get(joinLogs).send(embed)
        }

        if(!welcome){
            return
        } else if(welcome){
            const { guild, id } = member
            const invitesBefore = invites[guild.id]
            const invitesAfter = await getInviteCounts(guild)

            for(const inviter in invitesAfter) {
                if(invitesBefore[inviter] === invitesAfter[inviter] - 1) {
                    const count = invitesAfter[inviter]
                    const embed = new MessageEmbed()
                    .setDescription(`Welcome to **${member.guild.name}**, <@!${member.user.id}> Please read the rules of the server in <#${config.rulesChannel}>!\n Thanks to ${inviter} for inviting them! They now have ${count} invites!`)
                    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    guild.channels.cache.get(welcome).send(embed)

                    invites[guild.id] = invitesAfter
                    return
                }
            }
        }
    })
}