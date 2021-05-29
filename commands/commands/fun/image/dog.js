const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const superagent = require('superagent')

module.exports = {
    commands: 'dog',
    cooldown: 10,
    callback: async(client, message, args) => {
        const btn = new MessageButton()
        .setStyle('blurple')
        .setLabel('▶ Next Image')
        .setID('button1')

        const btn2 = new MessageButton()
        .setStyle('red')
        .setID('button2')
        .setLabel(`✖ Delete`)

        const { body } = await superagent.get('https://random.dog/woof.json')
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`Here's a cute little dog 🐶!`)
        .setImage(body.url)
        message.channel.send({ embed : embed, buttons: [btn, btn2] })

        client.on('clickButton', async(button) => {
            if(button.id === 'button1') {
                const { body } = await superagent.get('https://random.dog/woof.json')
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(config.botname)
                .setTimestamp()
                .setDescription(`Here's a cute little dog 🐶!`)
                .setImage(body.url)
                button.message.edit({ embed : embed, buttons: [btn, btn2] })  
            } else if(button.id === 'button2') {
                button.message.delete()
                message.delete()
            }
        })

    }
}