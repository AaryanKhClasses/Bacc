const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const loadCommands = require('./commands/load-commands')
// const loadFeatures = require('./features/load-features')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    // loadFeatures(client)
})

client.login(config.token)