const { MessageEmbed } = require('discord.js')
const { Menu } = require('discord.js-menu')
const config = require('../../config.json')
const package = require('../../package.json')

module.exports = {
    commands: 'help',
    cooldown: 10,
    callback: (client, message, args) => {
        const main = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Hai all I'm Bacc!**\n` +
            `**This is the help menu for the bot!**\n` +
            `This is a multi-purpose and customisable bot!\n` +
            `There are many features in this bot and we are planning to add many more too!\n\n` +
            `**Sub-Help Menus**\n`
        )
        .addFields(
            {
                name: '🔼 Levelling:',
                value: 'This bot has a levelling system and will give up xp every message you send!\n> You can check your levels and also compare yourselves in the leaderboard too!'
            },
            {
                name: '⚒ Moderation:',
                value: 'This bot has a full moderation command system!\n> Commands like warn, mute, kick and ban are available!'
            },
            {
                name: '🔮 Utility:',
                value: 'This bot has utility commands too!\n> Commands to make channels, set slowmode and some more are available!'
            },
            {
                name: '🌐 Global Commands:',
                value: 'The global commands of this bot are shown here!\n> Commands like ping, help and setup are given here!\n'
            },
        )

        const levelling = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Levelling Commands**\n` +
            `**This is the levelling help menu for the bot!**\n` +
            `Every time you send a message, you will get random amount of XP from 1-10! You will also get notified when you level up!\n\n` +
            `**Levelling Commands**\n`
        )
        .addFields(
            {
                name: '💹 Rank:',
                value: 'Check you rank by using this command! This will show an attractive **Rank Card** which will contain your level, rank and XP!'
            },
            {
                name: '🔼 Leaderboard:',
                value: 'Check the leaderboard using this command! This will only show the top 10 users(according to XP) with their levels!'
            },
            {
                name: '➕ More Commands!',
                value: 'We are also adding more commands with each update! Commands like `set-xp`, `set-level` and many more **ADMIN-ONLY** commands will be added in the near future!'
            }
        )

        const moderation = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Moderation Commands**\n` +
            `**This is the moderation help menu for the bot!**\n` +
            `Moderation commands and features are given here! This bot have many moderation commands\nCurrently we have not added **auto-mod** but in the next updates, this will be added too!\n\n` +
            `**Moderation Commands**\n`
        )
        .addFields(
            {
                name: '🔨 Ban:',
                value: 'Bans a member! Specify a member(mention or id) and a reason(optional) to ban them!\nThis will automatically delete messages of the member which they had sent in the past 7 days'
            },
            {
                name: '🦶 Kick:',
                value: 'Kicks a member! Specify a member(mention or id) and a reason(optional) to kick them!\nThe member can rejoin if they have a valid invite link!'
            },
            {
                name: '🔇 Mute:',
                value: 'Mutes a member(if not muted)! Specify a member(mention or id) and a reason(optional) to mute them!\nThis command will permanently mute the member unless unmuted!'
            },
            {
                name: '🔉 Unmute:',
                value: 'Unmutes a member(if muted)! Specify a member(mention or id) and a reason(optional) to unmute them!\nThis command will unmute the specified member if they are muted!'
            },
            {
                name: '😶 Temp-Mute:',
                value: 'Temperorily mutes a member! Specify a member(mention or id), a duration and a reason(optional) to mute them!\nThis command will mute a member temperorily as specified!'
            },
            {
                name: '🩹 Unban:',
                value: 'Unbans a member! Specify a member(id) and a reason(optional) to unban them!\nThis command will make so that the member can rejoin if they have a valid link!'
            },
            {
                name: '🛠 Soft-ban:',
                value: 'Softbans a member! Specify a member(mention or id) and a reason(optional) to ban them!\nThis command will ban and immediately unban the specified member!'
            },
            {
                name: '⚠ Warn:',
                value: 'Warns a member! Specify a member(mention or id) and a reason(optional) to warn them!\nThis command will only dm the member that they are warned! This command is a noting command that a person has been warned and if they do something wrong again, they will get punished!'
            },
            {
                name: '❓ Whois(Userinfo):',
                value: 'Sends the info a member! Specify a member(mention or id) to see their info!\nThis info will be the username, joining date, roles, permissions, etc. of the member!'
            },
            {
                name: '➕ More Commands!',
                value: 'We are also adding more commands with each update! Commands like `modlogs`, `clear-warns` and many more **STAFF-ONLY** commands will be added in the near future!'
            }
        )

        const utility = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Utility Commands**\n` +
            `**This is the utility help menu for the bot!**\n` +
            `These are random but useful commands which we use in daily life!\n\n` +
            `**Utility Commands**\n`
        )
        .addFields(
            {
                name: '➕ Create Channel:',
                value: 'Creates a channel! Specify a category id, channel type(text/voice/news) and the channel name to create a channel!'
            },
            {
                name: '❗ Channel Topic:',
                value: 'Changes the channel topic of the specified channel! Specify the channel id and the description to change the channel topic!'
            },
            {
                name: '⛔ Slowmode:',
                value: 'Change the slowmode of the specified channel! Must be a value lower than 6h(360m/21600s)'
            },
            {
                name: '➖ Purge(Clear):',
                value: 'Clears the messages sent in a channel! Specify the amount of messages to purge those!'
            },
            {
                name: '➕ More Commands!',
                value: 'We are also adding more commands with each update! Many more commands will be added in the near future!'
            }
        )

        let helpMenu = new Menu(message.channel, message.author.id, [
            {
                name: 'main',
                content: main,
                reactions: {
                    '🔼': 'levelling',
                    '⚒' : 'moderation',
                    '🛠' : 'utility',
                    '842308687389130803' : 'delete'
                }
            },
            {
                name: 'levelling',
                content: levelling,
                reactions: {
                    '◀' : 'main',
                    '842308687389130803' : 'delete'
                    
                }
            },
            {
                name: 'moderation',
                content: moderation,
                reactions: {
                    '◀' : 'main',
                    '842308687389130803' : 'delete'
                    
                } 
            },
            {
                name: 'utility',
                content: utility,
                reactions: {
                    '◀': 'main',
                    '842308687389130803' : 'delete'
                }
            },
        ])
        helpMenu.start()
    }
}
