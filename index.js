const { Client, Intents, Permissions } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS] })
const config = require('./config.json')
require('dotenv').config()

const loadCommands = require('./commands/load-commands.js')
const levels = require('./utils/levels.js')
const economy = require('./utils/economy.js')
const loadEvents = require('./events/load-events.js')
const loadModules = require('./modules/load-modules.js')

client.on('ready', () => {
    console.log('The Bot is Online!')
    client.user.setActivity(`${config.prefix}help`, {type: 'LISTENING'})

    loadCommands(client)
    loadEvents(client)
    loadModules(client)
    levels(client)
    economy(client)
})

client.login(process.env.CLIENT_TOKEN)