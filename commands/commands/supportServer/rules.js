const { MessageEmbed } = require("discord.js")
const config = require('../../../config.json')

module.exports = {
    commands: 'rules',
    callback: (client, message, args) => {
        if(message.author.id === config.botOwner) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
            .setColor('#3498DB')
            .setFooter(config.botname)
            .setTitle(`Rules of ${message.guild.name}`)
            .setThumbnail(message.guild.iconURL({ format: 'png' }))
            .setTimestamp()
            .setDescription(
                `**These are the rules you have to follow while staying in this server! If any of this rules are broken by you, might get banned!**\n` +
                `**Rule 1:** You must follow Discord's Terms of Service(ToS) and Community Guidelines! These are given below:\n` +
                `> - [Discord's Terms Of Service](https://discord.com/terms)\n` +
                `> - [Discord's Community Guidelines](https://discord.com/guidelines)\n\n` +
                `**Rule 2:** Don't beg and advertise\n` + 
                `> - Don't beg for anything(ex., Discord Nitro, Game Accounts, Codes, etc.). If you do, then you have a very high chance of getting Muted and even **Banned**!\n` +
                `> - DO NOT Advertise anything(ex., YouTube(or any other video platform) Channels, Discord Servers, Discord Bots, etc.) Only advertise in Advertisment Channels(<#840494803186614272>)!\n\n` +
                `**Rule 3:** Chat in correct channels!\n` +
                `> - Don't use incorrect channels for your chatting! Use <#840494759277756458> if you want to talk in General! Use <#840494787001188402> if you want to talk about Minecraft!\n` +
                `> - Also DO NOT use bot commands in any chat! Use them in the labelled channel like <#840494768461971467> and <#840494777627312149>!\n\n` +
                `**Rule 4:** Language\n` +
                `> - This is a PG-13 Server! Any swearing(or bypassing) or sending NSFW images in media channels can get you **Permanently Banned**! So refrain from doing that!\n` +
                `> - Also don't speak any other language than English! Any other language might get you **Muted**\n\n` +
                `**IMPORTANT:** More Rules might get added at any time in the future and our moderators can **ban** you at any time, without any warnings if you do something bad!\n\n` +
                `**Add Bacc Bot to your server:** https://discord.com/oauth2/authorize?client_id=839031153742315541&permissions=8&scope=bot`
            )
            message.channel.send(embed)
        }
    }
}