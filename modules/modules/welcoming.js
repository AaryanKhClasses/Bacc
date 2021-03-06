const config = require('../../config.json')
const { MessageEmbed } = require('discord.js')

module.exports = (client) => {  
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
        const welcome = member.guild.channels.cache.find(ch => ch.name.includes('welcome')).id
        const rulesChannel = member.guild.channels.cache.find(ch => ch.name.includes('rules')) || member.guild.channels.cache.find(ch => ch.name.includes('info'))
        if(!welcome){
            return
        } else if(welcome){
            const invitesBefore = invites[member.guild.id]
            const invitesAfter = await getInviteCounts(member.guild)

            for(const inviter in invitesAfter) {
                if(invitesBefore[inviter] === invitesAfter[inviter] - 1) {
                    const count = invitesAfter[inviter]
                    const embed = new MessageEmbed()
                    .setDescription(`${config.emojis.join} Welcome to **${member.guild.name}**, <@!${member.user.id}> Please read the rules of the server in ${rulesChannel}!\n${config.emojis.arrowRight} Thanks to ${inviter} for inviting them! They now have ${count} invites!`)
                    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
                    .setColor('GREEN')
                    .setFooter(config.botname)
                    .setTimestamp()
                    member.guild.channels.cache.get(welcome).send({ embed: embed })

                    invites[member.guild.id] = invitesAfter
                    return
                }
            }
        }
    })
}