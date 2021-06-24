const config = require('../config.json')
const { MessageEmbed, Permissions } = require('discord.js')
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
        const { content, guild } = message
        const member = message.guild.members.cache.get(message.author.id)

        const args = content.split(/[ ]+/)
        args.shift()

        let permRank, premStr, urPermLevel, urPermRank, urPermEmote
        if(permLevel === 0){ permRank = `Normal Member`, permEmote = `${config.emojis.user}` } 
        else if(permLevel === 1){ permRank = `Helper`, permEmote = `${config.emojis.info}` }
        else if(permLevel === 2){ permRank = `Moderator`, permEmote = `${config.emojis.mod}` }
        else if(permLevel === 3){ permRank = `Administrator`, permEmote = `${config.emojis.admin}` }
        else if(permLevel === 4){ permRank = `Trusted Admin`, permEmote = `${config.emojis.manage}` }
        else if(permLevel === 5){ permRank = `Server Owner`,  permEmote = `${config.emojis.star}` }
        else if(permLevel === 6){ permRank = `Bot Owner`, permEmote = `${config.emojis.copyright}` }

        if(member.id === config.botOwner) { return urPermLevel = 6, urPermRank = `Bot Owner`, urPermEmote = `${config.emojis.copyright}` }
        else if(member.id === guild.ownerID) { return urPermLevel = 5, urPermRank = `Server Owner`, urPermEmote = `${config.emojis.star}` }
        else if(member.roles.cache.find(r => r.name.includes('Trusted'))) { return urPermLevel = 4, urPermRank = `Trusted Admin`, urPermEmote = `${config.emojis.manage}` }
        else if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) { return urPermLevel = 3, urPermRank = `Administrator`, urPermEmote = `${config.emojis.admin}` }
        else if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) { return urPermLevel = 2, urPermRank = `Moderator`, urPermEmote = `${config.emojis.mod}` }
        else if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) { return urPermLevel = 1, urPermRank = `Helper`, urPermEmote = `${config.emojis.info}` }
        else { urPermLevel = 0, urPermRank = `Normal Member`, urPermEmote = `${config.emojis.user}` }

        if(premiumOnly === true) premStr = `${config.emojis.currency} **Premium Only:** ${config.emojis.yes}\n`
        else premStr = ''

        for(const alias of commands){
            const command = `${config.prefix}${alias.toLowerCase()}`

            if(
                content.toLowerCase().startsWith(`${command}`) ||
                content.toLowerCase() === command
            ){
                if(permLevel > urPermLevel) {
                    const embed = new MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setFooter(config.botname)
                    .setTimestamp()
                    .setDescription(
                        `${config.emojis.no} You don't have permissions to use this command\n` +
                        `${permEmote} This command requires Permission Level ${permLevel} (${permRank})!\n` +
                        `${urPermEmote} You currently have Permission Level ${urPermLevel} (${urPermRank})!`
                        )
                    return message.reply({ embed: embed })
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
                        `${permEmote} **Permission Level:** ${permRank}!\n` +
                        `${premStr}`+
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

                callback(client, message, args, args.join(' '))
                return
            }
        }
    })
}