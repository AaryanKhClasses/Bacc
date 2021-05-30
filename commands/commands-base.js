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
        ownerOnly = false
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

                const arguments = content.split(/[ ]+/) //split on any number of spaces
                arguments.shift() //Removes the command which is the first index

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

                callback(client, message, arguments, arguments.join(' ')) //handle the custom command code
                return
            }
        }
    })
}