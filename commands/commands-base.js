const config = require('../config.json')

let recentlyRan = []

module.exports = (client, commandOptions) => {
    let{
        commands,
        cooldown = -1,
        callback,
        permlevel,
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

                let cooldownString = `${guild.id}-${member.id}-${commands[0]}`
                console.log('cooldownString: ', cooldownString)

                if(cooldown > 0 && recentlyRan.includes(cooldownString)){
                    message
                    .reply('a little too quick there.')
                    .then((thisMessage) => {
                        thisMessage.delete({
                            timeout: 5000
                        })
                    })
                    message.delete()
                    return
                }

                if(message.member.hasPermission("SEND_MESSAGES")) permlevel = 0;
                if(message.member.hasPermission("MANAGE_MESSAGES")) permlevel = 1;
                if(message.member.hasPermission("BAN_MEMBERS")) permlevel = 2;
                if(message.member.hasPermission("MANAGE_GUILD")) permlevel = 3;
                if(message.member.id === message.guild.ownerID) permlevel = 4;
                if(message.member.id === config.botOwner) permlevel = 5;
                

                const arguments = content.split(/[ ]+/)
                arguments.shift()

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

                callback(message, arguments, arguments.join(' '), client)
                return
            }
        }
    })
}