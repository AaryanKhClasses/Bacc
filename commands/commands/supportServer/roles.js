const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const rolesSchema = require("../../../schemas/rolesSchema")
const mongo = require('../../../utils/mongo.js')

module.exports = {
    commands: 'roles',
    callback: async(client, message, args) => {
        if(message.author.id === config.botOwner) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor(`#3498DB`)
            .setFooter(config.botname)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setTitle(`Self Roles for ${message.guild.name}`)
            .setDescription(
                `**Get your role here (Reactions and SelfRoles)**\n` +
                `<@&840516042542678047>: This role will allow you to talk in general chats like <#840494759277756458> and <#840494760782331906>!\n` +
                `<@&840516040810037278>: This role will allow you to test our bot <@839031153742315541> and also get updates on it!\n` +
                `<@&840516038789300244>: This role will allow to to see minecraft-related channels like <#840494787001188402> and <#840494791472447538>! You will also be able to see all the updates recieved by the Official Minecraft Discord Server!\n\n` +
                `**New Roles** Might get added at anytime in the future! Now go chat in <#840494759277756458> with your new roles!`
            )
            message.channel.send(embed).then((message) => {
                message.react('<:general:841218738824413194>')
                message.react('<:bot:841217921635319828>')
                message.react('<:minecraft:841205633990131712>')
            })

            const embed2 = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor(`#3498DB`)
            .setFooter(config.botname)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setTitle(`Levelling Roles for ${message.guild.name}`)
            .setDescription(
                `**Levelling Roles**\n` +
                `<@&840516033714323457>: Get Level 1 in Bacc Bot!\nPerks: Permission to change your nickname and use external emojis!\n\n` +
                `<@&840516032107249684>: Get Level 10 in Bacc Bot!\nPerks: Permission to Stream in a VC and also Embed links in promo chats!\n\n` +
                `<@&840516030257299457>: Get Level 20 in Bacc Bot!\nPerks: Permission to Attach Files in your messages!\n\n` +
                `<@&840516028886417438>: Get Level 35 in Bacc Bot!\nPerks: Be a priority speaker in a Voice Channel!\n\n` +
                `<@&840516027308965918>: Get Level 50 in Bacc Bot!\nPerks: Get the <@&840516017645027378> role and be an Exclusive member!\n\n` +
                `<@&840516025363333130>: Get Level 75 in Bacc Bot!\nPerks: Chance to be a Staff!\n\n` +
                `<@&840516023853776936>: Get Level 100 in Bacc Bot: You are a spammer HEHEHE!`
            )
            message.channel.send(embed2)

            const embed3 = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor(`#3498DB`)
            .setFooter(config.botname)
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setTitle(`Exclusive Roles for ${message.guild.name}`)
            .setDescription(
                `**Exclusive Roles**\n` +
                `<@&840516020758380554>: Be a youtuber with at least 1,000+ subs!\n` +
                `<@&840516018778669057>: Be a social figure or be notable in some way!\n` +
                `<@&840516017645027378>: Boost the server OR get the <@&840516027308965918> role!\n` +
                `<@&840516016047390740>: Boost the server to get this role!\n` +
                `<@&840516014600617984>: Partner with us(OR be a Partnered Server Owner) to get this role!\n\n` +
                `**If you have any of these roles**, you will unlock the <#840494797525745674> and <#840494798921662464> channels!\nThe perks of being one of these is similar to being a <@&840516027308965918> member, `
            )
            message.channel.send(embed3)

            await mongo().then(async(mongoose) => {
                try {
                    await rolesSchema.findOneAndUpdate(
                        {
                            guildID: message.guild.id,
                            channelID: message.channel.id,
                            roleID: '840516042542678047' //general
                        },
                        {
                            upsert: true
                        }
                    )
                    await rolesSchema.findOneAndUpdate(
                        {
                            guildID: message.guild.id,
                            channelID: message.channel.id,
                            roleID: '840516040810037278' //baccbot
                        },
                        {
                            upsert: true
                        }
                    )
                    await rolesSchema.findOneAndUpdate(
                        {
                            guildID: message.guild.id,
                            channelID: message.channel.id,
                            roleID: '840516038789300244' //minecraft
                        },
                        {
                            upsert: true
                        }
                    )
                }finally {
                    mongoose.connection.close()
                }
            })
        }
    }
}