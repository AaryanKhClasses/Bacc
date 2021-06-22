const config = require('../config.json')
const { MessageEmbed, Permissions } = require('discord.js')
// const guildModel = require('../models/blacklists/guildModel')
// const userModel = require('../models/blacklists/userModel')
const premium = ['840494427595866142', '846372708694229012']
let recentlyRan = []

module.exports = (client, commandOptions) => {
    let{
        commands,
        cooldown = -1,
        callback,
        description,
        usage,
        permLevel,
        premiumOnly
    } = commandOptions

    if(!commands){
        return
    }

    if(typeof commands === 'string'){
        commands = [commands]
    }
    console.log(`Registering command "${commands[0]}"`)

    client.on('message', async (message) => {
        if(message.author.bot || !message.guild) return
        const { content, guild, channel } = message
        const member = message.guild.members.cache.get(message.author.id)

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

        let str2
        if(premiumOnly === true) str2 = `${config.emojis.currency} **Premium Only:** ${config.emojis.yes}\n`
        else str2 = ''

        for(const alias of commands){
            const command = `${config.prefix}${alias.toLowerCase()}`

            if(
                content.toLowerCase().startsWith(`${command}`) ||
                content.toLowerCase() === command
            ){

                if(permLevel === 1 && !(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) || member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || member.roles.cache.find(r => r.name.includes('Trusted')) || message.author.id === message.guild.ownerID || message.author.id === config.botOwner)){
                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.info} This command requires Permission Level 1 (Helper) or higher!\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                    return message.reply({ embed: embed })
                }

                if(permLevel === 2 && !(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS) || member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || member.roles.cache.find(r => r.name.includes('Trusted')) || message.author.id === message.guild.ownerID || message.author.id === config.botOwner)){
                    if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.mod} This command requires Permission Level 2 (Moderator) or higher!\n${config.emojis.info} You currently have Permission Level 1 (Helper)!`)
                        return message.reply({ embed: embed })
                    } else if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.mod} This command requires Permission Level 2 (Moderator) or higher!\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                        return message.reply({ embed: embed })
                    }
                    return
                }
    
                if(permLevel === 3 && !(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || member.roles.cache.find(r => r.name.includes('Trusted')) || message.author.id === message.guild.ownerID || message.author.id === config.botOwner)){
                    if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.admin} This command requires Permission Level 3 (Administrator) or higher!\n${config.emojis.mod} You currently have Permission Level 2 (Moderator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.admin} This command requires Permission Level 3 (Administrator) or higher!\n${config.emojis.info} You currently have Permission Level 1 (Helper)!`)
                        return message.reply({ embed: embed })
                    } else if(!member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.admin} This command requires Permission Level 3 (Administrator) or higher!\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                        return message.reply({ embed: embed })
                    }
                }

                if(permLevel === 4 && !member.roles.cache.find(r => r.name.includes('Trusted')) || message.author.id !== message.guild.ownerID || message.author.id !== config.botOwner){
                    if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 4 (Trusted Admin) or higher!\n${config.emojis.admin} You currently have Permission Level 3 (Administrator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 4 (Trusted Admin) or higher!\n${config.emojis.mod} You currently have Permission Level 2 (Moderator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 4 (Trusted Admin) or higher!\n${config.emojis.info} You currently have Permission Level 1 (Helper)!`)
                        return message.reply({ embed: embed })
                    } else if(!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 4 (Trusted Admin) or higher!\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                        return message.reply({ embed: embed })
                    }
                }

                if(permLevel === 5 && (message.author.id !== message.guild.ownerID) || (message.author.id !== config.botOwner)){
                    if(member.roles.cache.find(r => r.name.includes('Trusted'))){
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.star} This command requires Permission Level 5 (Server Owner) or higher!\n${config.emojis.manage} You currently have Permission Level 4 (Trusted Admin)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 5 (Server Owner) or higher!\n${config.emojis.admin} You currently have Permission Level 3 (Administrator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 5 (Server Owner) or higher!\n${config.emojis.mod} You currently have Permission Level 2 (Moderator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 5 (Server Owner) or higher!\n${config.emojis.info} You currently have Permission Level 1 (Helper)!`)
                        return message.reply({ embed: embed })
                    } else if((message.author.id !== message.guild.ownerID) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 5 (Server Owner) or higher!\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                        return message.reply({ embed: embed })
                    }
                }

                if(permLevel === 6 && (message.author.id !== config.botOwner)){
                    if(message.author.id !== message.guild.ownerID){
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.star} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.manage} You currently have Permission Level 5 (Server Owner)!`)
                        return message.reply({ embed: embed })
                    } else if(member.roles.cache.find(r => r.name.includes('Trusted'))){
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.star} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.manage} You currently have Permission Level 4 (Trusted Admin)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.admin} You currently have Permission Level 3 (Administrator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.mod} You currently have Permission Level 2 (Moderator)!`)
                        return message.reply({ embed: embed })
                    } else if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.info} You currently have Permission Level 1 (Helper)!`)
                        return message.reply({ embed: embed })
                    } else if((message.author.id !== config.botOwner) && (message.author.id !== message.guild.ownerID) && !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES) && !member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
                        const embed = new MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                        .setFooter(config.botname)
                        .setTimestamp()
                        .setDescription(`${config.emojis.no} You don't have permissions to use this command!\n${config.emojis.manage} This command requires Permission Level 6 (Bot Owner)\n${config.emojis.user} You currently have Permission Level 0 (Normal Member)!`)
                        return message.reply({ embed: embed })
                    }
                }

                if(premiumOnly == true && !premium.includes(guild.id)) {
                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(`${config.emojis.no} This is an \`PREMIUM-ONLY\` command!`)
                    message.reply({ embed: embed }).then((message) => {
                        client.setTimeout(() => message.delete(), 5000);
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
                        `${str2}`+
                        `${config.emojis.arrowRight} **Usage:** ${usage}`
                    )
                    return message.reply({ embed: embed })
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
                    message.reply({ embed: embed }).then((message) => {
                        client.setTimeout(() => message.delete(), 5000);
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
                //     return message.reply({ embed: embed }).then((message) => {
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
                //     message.reply({ embed: embed }).then((message) => {
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