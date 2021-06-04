module.exports = {
    commands: 'ping',
    description: 'Sends the ping of the bot!',
    usage: '!ping',
    cooldown: 6,
    callback: (client, message, args) => {
        message.channel.send('Pong!').then((resultMessage) => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp
            resultMessage.edit(`Pong! The ping is \`${ping}ms\``)
        })
    }
}