const config = require('../../../config.json')
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const got = require('got')

module.exports = {
    commands: 'meme',
    cooldown: 10,
    callback: (client, message, args) => {
        const btn = new MessageButton()
        .setStyle('blurple')
        .setLabel('▶ Next Meme')
        .setID('button1')

        const btn2 = new MessageButton()
        .setStyle('red')
        .setID('button2')
        .setLabel(`✖ Delete`)

        got('https://www.reddit.com/r/meme/random.json').then((response) => {
            const content = JSON.parse(response.body)
            const image = content[0].data.children[0].data.url
            const embed = new MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setColor('RANDOM')
                .setFooter(config.botname)
                .setImage(image)
                .setTimestamp()
            message.channel.send({ embed : embed, buttons: [btn, btn2] })
        })

        client.on('clickButton', async(button) => {
            if(button.id === 'button1') {
                got('https://www.reddit.com/r/meme/random.json').then((response) => {
                    const content = JSON.parse(response.body)
                    const image = content[0].data.children[0].data.url
                    const embed = new MessageEmbed()
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                    .setColor('RANDOM')
                    .setFooter(config.botname)
                    .setImage(image)
                    .setTimestamp()
                    button.message.edit({ embed : embed, buttons: [btn, btn2] })
                })
            } else if(button.id === 'button2') {
                button.message.delete()
                message.delete()
            }
        })
    }
}