const config = require('../config.json')
const { MessageEmbed } = require('discord.js')
// const guildModel = require('../models/blacklists/guildModel')
// const userModel = require('../models/blacklists/userModel')
const premium = ['840494427595866142', '846372708694229012']
let recentlyRan = []

module.exports = (client, commandOptions) => {
    let{
        commands,
        cooldown = -1,
        callback,
        devOnly = false,
        ownerOnly = false,
        description,
        usage,
        permLevel
    } = commandOptions

    if(!commands){
        return
    }

    if(typeof commands === 'string'){
        commands = [commands]
    }
    console.log(`Registering command "${commands[0]}"`)

    client.on('message', async (message) => {
        const { member, content, guild, channel } = message

        const args = content.split(/[ ]+/)
        args.shift()

        let str
        if(permLevel === 0) str = `${config.emojis.user} **Permission Level:** Normal Member`
        if(permLevel === 1) str = `${config.emojis.info} **Permission Level:** Helper`
        if(permLevel === 2) str = `${config.emojis.mod} **Permission Level:** Moderator`
        if(permLevel === 3) str = `${config.emojis.admin} **Permission Level:** Administrator`
        if(permLevel === 4) str = `${config.emojis.manage} **Permission Level:** Trusted Admin`
        if(permLevel === 5) str = `${config.emojis.star} **Permission Level:** Server Owner`
        if(permLevel === 6) str = `${config.emojis.copyright} **Permission Level:** Bot Owner`

        for(const alias of commands){
            const command = `${config.prefix}${alias.toLowerCase()}`

            if(
                content.toLowerCase().startsWith(`${command}`) ||
                content.toLowerCase() === command
            ){

                if(ownerOnly == true && message.author.id !== message.guild.owner.id) {
                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(`${config.emojis.no} This is an \`OWNER-ONLY\` command!`)
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()
                    return
                }

                if(devOnly == true && message.author.id !== config.botOwner) {
                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(`${config.emojis.no} This is an \`DEVELOPER-ONLY\` command!`)
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()
                    return
                }

                if(args[0] && args[0].toLowerCase() === 'help') {
                    const embed = new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(
                        `${config.emojis.info} **Description:** ${description}\n` +
                        `${config.emojis.slowmode} **Cooldown:** ${cooldown} seconds!\n` +
                        `${str}\n` +
                        `${config.emojis.arrowRight} **Usage:** ${usage}`
                    )
                    return message.channel.send(embed)
                }

                let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
                console.log('cooldownString: ', cooldownString)

                if(cooldown > 0 && recentlyRan.includes(cooldownString)){
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setDescription(`${config.emojis.no} You are using the commands very quickly! Please wait for some time to use the command again!\n**TIP:** A premium server has half the cooldown!`)
                    .setColor('RED')
                    .setFooter(config.botname)
                    .setTimestamp()
                    message.channel.send(embed).then((message) => {
                        message.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()
                    return
                }

                // const guildBlacklist = await guildModel.findOne({ guildID: guild.id })
                // if(guildBlacklist) {
                //     message.delete()
                //     const embed = new MessageEmbed()
                //     .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                //     .setDescription(`${config.emojis.no} This server has been blacklisted by the bot owner! Contact <@${config.botOwner}> for help!\n**TIP:** Buy premium or [Fill Blacklist appeal](https://dsc.gg/bacc) to unblacklist the server!`)
                //     .setColor('RED')
                //     .setFooter(config.botname)
                //     .setTimestamp()
                //     return message.channel.send(embed).then((message) => {
                //         message.delete({
                //             timeout: 5000
                //         })
                //     })
                // }

                // const userBlacklist = await userModel.findOne({ userID: member.id })
                // if(userBlacklist) {
                //     const embed = new MessageEmbed()
                //     .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                //     .setDescription(`${config.emojis.no} You has been blacklisted by the bot owner! Contact <@${config.botOwner}> for help!\n**TIP:** [Fill Blacklist appeal](https://dsc.gg/bacc) to get unblacklisted!`)
                //     .setColor('RED')
                //     .setFooter(config.botname)
                //     .setTimestamp()
                //     message.channel.send(embed).then((message) => {
                //         message.delete({
                //             timeout: 5000
                //         })
                //     })
                //     message.delete()
                //     return
                // }

                if(premium.includes(guild.id)){
                    if(cooldown > 0){
                        recentlyRan.push(cooldownString)
                        setTimeout(() => {
                            console.log('BEFORE: ', recentlyRan)
                            recentlyRan = recentlyRan.filter((string) => {
                                return string !== cooldownString
                            })
    
                            console.log('AFTER: ', recentlyRan)
                        }, 500 * cooldown)
                    }
                } else{
                    if(cooldown > 0){
                        recentlyRan.push(cooldownString)
                        setTimeout(() => {
                            console.log('BEFORE: ', recentlyRan)
                            recentlyRan = recentlyRan.filter((string) => {
                                return string !== cooldownString
                            })
    
                            console.log('AFTER: ', recentlyRan)
                        }, 1000 * cooldown)
                    }
                }

                callback(client, message, args, args.join(' ')) //handle the custom command code
                return
            }
        }
    })
}