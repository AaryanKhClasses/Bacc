const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
require('dotenv').config()

const loadCommands = require('./commands/load-commands')
const levelling = require('./utils/levelling')
const levels = require('./utils/levels')
const loadEvents = require('./events/load-events')
const loadFeatures = require('./features/load-features')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    loadEvents(client)
    loadFeatures(client)
    new levelling(client)
    levels(client)
    
})

client.login(process.env.CLIENT_TOKEN)