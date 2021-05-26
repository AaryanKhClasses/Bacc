const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
require('dotenv').config()
// const { Player } = require('discord-player')
// const player = new Player(client)

const loadCommands = require('./commands/load-commands.js')
const levels = require('./utils/levels.js')
const economy = require('./utils/economy.js')
const loadEvents = require('./events/load-events.js')
const loadModules = require('./modules/load-modules.js')
// const loadFeatures = require('./features/load-features.js')

// client.player = player

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'}).catch(console.error)

    loadCommands(client)
    loadEvents(client)
    loadModules(client)
    // loadFeatures(client)
    levels(client)
    economy(client)
})

client.login(process.env.CLIENT_TOKEN)