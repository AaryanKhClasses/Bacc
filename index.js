const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

const loadCommands = require('./commands/load-commands')
const levelling = require('./utils/levelling')
const levels = require('./utils/levels')
const loadEvents = require('./events/load-events')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    loadEvents(client)
    new levelling(client)
    levels(client)
    
})

client.login(config.token)