const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
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
                value: 'This bot has a levelling system and will give you xp every message you send!\n> You can check your levels and also compare yourselves in the leaderboard too!'
            // },
            // {
            //     name: '💰 Economy:',
            //     value: 'This bot has an economy system and will give you coins every message you send!\n> You can check your balance and also compare yourselves in the leaderboard too!'
            },
            {
                name: '⚒ Moderation:',
                value: 'This bot has a full moderation command system!\n> Commands like warn, mute, kick and ban are available!'
            },
            {
                name: '🛠 Utility:',
                value: 'This bot has utility commands too!\n> Commands to make channels, set slowmode and some more are available!'
            },
            {
                name: '🎈 Fun',
                value: 'This bot has fun commands to relax yourslves too!\n> Commands like meme, google and translate commands are available!'
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
                value: 'Check you rank by using this command! This will show an attractive **Rank Card** which will contain your level, rank and XP!\n**Usage:** `!rank (optional member mention or id)`'
            },
            {
                name: '🔼 Leaderboard:',
                value: 'Check the leaderboard using this command! This will only show the top 10 users(according to XP) with their levels!\n**Usage:** `!leaderboard`'
            },
            {
                name: '⚡ Add-Levels:',
                value: 'Adds levels to a member! Specify the number of levels and the member to add levels to!\n**Usage:** `!add-levels [member(mention or id)] [number of levels]`'
            },
            {
                name: '⚡ Add-XP:',
                value: 'Adds XP to a member! Specify the number of XP and the member to add XP to!\n**Usage:** `!add-xp [member(mention or id)] [amount of XP]`'
            },
            {
                name: '❗ Subtract-Levels:',
                value: 'Subtracts levels from a member! Specify the number of levels and the member to remove levels from!\n**Usage:** `!remove-levels [member(mention or id)] [number of levels]`'
            },
            {
                name: '❗ Subtract-XP:',
                value: 'Subtracts XP to a member! Specify the number of XP and the member to remove XP from!\n**Usage:** `!remove-xp [member(mention or id)] [amount of XP]`'
            },
            {
                name: '❌ Set-Levels:',
                value: 'Sets levels of a member! Specify the number of levels and the member to set the level of!\n**Usage:** `!set-level [member(mention or id)] [number of levels]`'
            },
            {
                name: '❌ Set-XP:',
                value: 'Sets XP of a member! Specify the number of XP and the member to set XP of!\n**Usage:** `!set-xp [member(mention or id)] [amount of XP]`'
            }
        )

        const economy = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Economy Commands**\n` +
            `**This is the economy help menu for the bot!**\n` +
            `Every time you send a message, you will get random amount of coins from 1-20! You can use them to buy cool stuff including roles and collectibles!\n\n` +
            `**Economy Commands**\n`
        )
        .addFields(
            {
                name: '👛 Balance:',
                value: 'Check you balance by using this command!\n**Usage:** `!balance (optional member mention or id)`'
            },
            {
                name: '💼 Work:',
                value: 'Work to earn coins! You can get a total of 250 to 750 coins by this!\nThis command has a coolown of **12 hours**!\n**Usage:** `!work`'
            },
            {
                name: '🐱‍👤 Crime:',
                value: 'Do crime to earn coins! You can get lots of coins by doing this! But you have a high chance of getting caught and lose coins!\nThis command has a cooldown of **12 hours**!\n**Usage:** `!crime`'
            },
            {
                name: '➕ More Commands:',
                value: 'We are also adding more commands with each update! Commands like `daily`, `rob` and many more commands will be added in the near future!'
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
                value: 'Bans a member! Specify a member(mention or id) and a reason(optional) to ban them!\nThis will automatically delete messages of the member which they had sent in the past 7 days\n**Usage:** `!ban [member] (optional reason)`'
            },
            {
                name: '🦶 Kick:',
                value: 'Kicks a member! Specify a member(mention or id) and a reason(optional) to kick them!\nThe member can rejoin if they have a valid invite link!\n**Usage:** `!kick [member] (optional reason)`'
            },
            {
                name: '🔇 Mute:',
                value: 'Mutes a member(if not muted)! Specify a member(mention or id) and a reason(optional) to mute them!\nThis command will permanently mute the member unless unmuted!\n**Usage:** `!mute [member] (optional reason)`'
            },
            {
                name: '🔉 Unmute:',
                value: 'Unmutes a member(if muted)! Specify a member(mention or id) and a reason(optional) to unmute them!\nThis command will unmute the specified member if they are muted!\n**Usage:** `!unmute [member] (optional reason)`'
            },
            {
                name: '😶 Temp-Mute:',
                value: 'Temperorily mutes a member! Specify a member(mention or id), a duration and a reason(optional) to mute them!\nThis command will mute a member temperorily as specified!\n**Usage:** `!tempmute [member] [duration] (optional reason)`'
            },
            {
                name: '🩹 Unban:',
                value: 'Unbans a member! Specify a member(id) and a reason(optional) to unban them!\nThis command will make so that the member can rejoin if they have a valid link!\n**Usage:** `!unban [member] (optional reason)`'
            },
            {
                name: '🛠 Soft-ban:',
                value: 'Softbans a member! Specify a member(mention or id) and a reason(optional) to ban them!\nThis command will ban and immediately unban the specified member!\n**Usage:** `!softban [member] (optional reason)`'
            },
            {
                name: '⚠ Warn:',
                value: 'Warns a member! Specify a member(mention or id) and a reason(optional) to warn them!\nThis command will only dm the member that they are warned! This command is a noting command that a person has been warned and if they do something wrong again, they will get punished!\n**Usage:** `!warn [member] (optional reason)`'
            },
            {
                name: '❓ Whois(Userinfo):',
                value: 'Sends the info a member! Specify a member(mention or id) to see their info!\nThis info will be the username, joining date, roles, permissions, etc. of the member!\n**Usage:** `!whois [member] (optional reason)`'
            },
            {
                name: '➕ More Commands:',
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
                value: 'Creates a channel! Specify a category id, channel type(text/voice/news) and the channel name to create a channel!\n**Usage:** `!create-channel [categoryId] [channel type(text / voice / news)] [channelName]]`'
            },
            {
                name: '➖ Delete Channel:',
                value: 'Delets the specified channel! Specify a channel idto delete the channel!\n**Usage:** `!delete-channel [channelId]`'
            },
            {
                name: '❗ Channel Topic:',
                value: 'Changes the channel topic of the specified channel! Specify the channel id and the description to change the channel topic!\n**Usage:** `!channel-topic [channelId] [topic]`'
            },
            {
                name: '⛔ Slowmode:',
                value: 'Change the slowmode of the specified channel! Must be a value lower than 6h(360m/21600s)\n**Usage:** `!slowmode [duration]`'
            },
            {
                name: '➖ Purge(Clear):',
                value: 'Clears the messages sent in a channel! Specify the amount of messages to purge those!\n**Usage:** `!purge [amount of messages]`'
            },
            {
                name: '1️⃣ Role Commands:',
                value: 'These are role-related utility commands! Click on the `⚡ Roles` Button to see the list of commands!'
            },
            {
                name: '2️⃣ Emote Commands:',
                value: 'These are emoji-related utility commands! Click on the `😀 Emotes` Button to see the list of commands!'
            },
            {
                name: '➕ More Commands:',
                value: 'We are also adding more commands with each update! Many more commands will be added in the near future!'
            }
        )

        const roles = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Utility Commands**\n` +
            `**This is the role-related utility help menu for the bot!**\n` +
            `These are command related to roles like \`give-role\` and \`delete-role\`!\n\n` +
            `**Utility Role Commands**\n`
        )
        .addFields(
            {
                name: '➕ Add-Role:',
                value: 'Adds a role to the server! Specify a role name, color, position, mentionable and hoisted!\n**Usage:** `!addrole [position] [color] [hoisted] [mentionable] [roleName]`'
            },
            {
                name: '➡ Give-Role:',
                value: 'Gives an existing role to a member! Specify the role(mention or id) and member(mention or id) to give the role!\n**Usage:** `!give-role [role] [member]`'
            },
            {
                name: '⬅ Remove-Role:',
                value: 'Removes a role from a member! Specify the role(mention or id) and member(mention or id) to remove the role!\n**Usage:** `!remove-role [role] [member]`'
            },
            {
                name: '❌ Delete-Role:',
                value: 'Deletes a role from the server! Specify the role(mention or id) to delete the role!\n**Usage:** `!delete-role [role]`'
            }
        )

        const emotes = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Utility Commands**\n` +
            `**This is the emote-related utility help menu for the bot!**\n` +
            `These are command related to emojis like \`add-emoji\` and \`delete-emoji\`!\n\n` +
            `**Utility Role Commands**\n`
        )
        .addFields(
            {
                name: '➕ Add-Emote:',
                value: 'Adds the specified emoji to the server! Specify a image link and the emoji name to create the emoji!!\n**Usage:** `!emote add [image link] [emoji name]`'
            },
            {
                name: '➖ Remove-Emote:',
                value: 'Removes the specified emoji from the server! Specify the emoji name delete the emoji (WIP)!\n**Usage:** `!emote delete [emoji name]`'
            },
            {
                name: '📝 Rename-Emote:',
                value: 'Renames the specified emoji! Specify the previous emoji name and the new emoji name to rename the role(WIP)!\n**Usage:** `!emote rename [previous emoji name] [new emoji name]`'
            },
            {
                name: '💹 Emote-Stats:',
                value: 'Shows the number of emotes in the server and the available slots!\n**Usage:** `!emote stats`'
            }
        )

        const fun = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Fun Commands**\n` +
            `**This is the fun help menu for the bot!**\n` +
            `Fun commands are listed here! These are commands which are for fun and will relax you!\n\n` +
            `**Fun Commands**\n`
        )
        .addFields(
            {
                name: '🐸 Meme:',
                value: 'Sends a random meme from the subreddit `r/memes` !\n**Usage:** `!meme`'
            },
            {
                name: '🗺 Translate:',
                value: 'Translate any sentence to the specified langauge!\n**Usage:** `!translate [langauge] [text to translate]`'
            },
            {
                name: '🖼 Image-Related Commands:',
                value: 'These are image related commands! Click on the `🖼 Image` Button to see all the commands!'
            },
            {
                name: '➕ More Commands:',
                value: 'We are also adding more commands with each update! Commands like `google`, `define` and many more commands will be added in the near future!'
            }
        )

        const image = new MessageEmbed() 
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setColor(`#3498DB`)
        .setFooter(`Version ${package.version} of ${config.botname}`)
        .setTimestamp()
        .setTitle(`Help Menu for ${config.botname}`)
        .setDescription(
            `**Image Commands**\n` +
            `**This is the fun help menu for the bot!**\n` +
            `Image-Related Fun commands are listed here! These are commands which are related to images!\n\n` +
            `**Fun Commands**\n`
        )
        .addFields(
            {
                name: '📷 Avatar:',
                value: 'Sends your avatar or the avatar of the specified member!\n**Usage:** `!avatar (optional member)`'
            },
            {
                name: '😺 Cat:',
                value: 'Sends a random cute cat picture!\n**Usage:** `!cat`'
            },
            {
                name: '🐶 Dog:',
                value: 'Sends a random cute dog picture!\n**Usage:** `!dog`'
            },
            {
                name: '➕ More Commands:',
                value: 'We are also adding more commands with each update! Commands like `shibe`, `triggered` and many more commands will be added in the near future!'
            }
        )

        const mainBtn = new MessageButton().setStyle('blurple').setID('mainbtn').setLabel('◀ Main')
        const levelBtn = new MessageButton().setStyle('blurple').setID('lvlbtn').setLabel('🔼 Levelling')
        // const economyBtn = new MessageButton().setStyle('blurple').setID('economybtn').setLabel('💰 Economy')
        const modBtn = new MessageButton().setStyle('blurple').setID('modbtn').setLabel('⚒ Moderation')
        const utilBtn = new MessageButton().setStyle('blurple').setID('utilbtn').setLabel('🛠 Utility')
        const roleBtn = new MessageButton().setStyle('blurple').setID('rolebtn').setLabel('⚡ Roles')
        const emoteBtn = new MessageButton().setStyle('blurple').setID('emotebtn').setLabel('😀 Emotes')
        const funBtn = new MessageButton().setStyle('blurple').setID('funbtn').setLabel('🎈 Fun')
        const imgBtn = new MessageButton().setStyle('blurple').setID('imgbtn').setLabel('🖼 Image')
        const delBtn = new MessageButton().setStyle('red').setID('delbtn').setLabel('✖ Delete')
    
        message.channel.send({ embed: main, buttons: [levelBtn, modBtn, utilBtn, funBtn, delBtn] })

        client.on('clickButton', async(button) => {
            // if(button.clicker.id === message.author.id) {
                if(button.id === 'mainbtn') {
                    button.message.edit({ embed: main, buttons: [levelBtn, modBtn, utilBtn, funBtn, delBtn] })
                } else if(button.id === 'lvlbtn') {
                    button.message.edit({ embed: levelling, buttons: [mainBtn, delBtn] }) 
                // } else if(button.id === 'economybtn') {
                //     button.message.edit({ embed: economy, buttons: [mainBtn, delBtn] })
                } else if(button.id === 'modbtn') {
                    button.message.edit({ embed: moderation, buttons: [mainBtn, delBtn] })
                } else if(button.id === 'utilbtn') {
                    button.message.edit({ embed: utility, buttons: [mainBtn, roleBtn, emoteBtn, delBtn] })
                } else if(button.id === 'rolebtn') {
                    button.message.edit({ embed: roles, buttons: [mainBtn, utilBtn, delBtn] })
                } else if(button.id === 'emotebtn') {
                    button.message.edit({ embed: emotes, buttons: [mainBtn, utilBtn, delBtn] })
                } else if(button.id === 'funbtn') {
                    button.message.edit({ embed: fun, buttons: [mainBtn, imgBtn, delBtn] })
                } else if(button.id === 'imgbtn') {
                    button.message.edit({ embed: image, buttons: [mainBtn, funBtn, delBtn] })
                } else if(button.id === 'delbtn') {
                    button.message.delete()
                    message.delete()
                }
            // }
        })
    }
}
