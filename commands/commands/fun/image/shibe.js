const config = require('../../../../config.json')
const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const superagent = require('superagent')

module.exports = {
    commands: 'shibe',
    description: 'Sends a random cute shibe image!',
    usage: '!shibe',
    permLevel: 0,
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

        const { body } = await superagent.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
        .setFooter(config.botname)
        .setTimestamp()
        .setDescription(`Here's a cute little shibe 🐶!`)
        .setImage(body.url)
        message.channel.send({ embed : embed, buttons: [btn, btn2] })

        client.on('clickButton', async(button) => {
            if(button.id === 'button1') { // && button.clicker.id === message.author.id) {
                const { body } = await superagent.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(config.botname)
                .setTimestamp()
                .setDescription(`Here's a cute little dog 🐶!`)
                .setImage(body.url)
                button.message.edit({ embed : embed, buttons: [btn, btn2] })  
            } else if(button.id === 'button2') {// && button.clicker.id === message.author.id) {
                button.message.delete()
                message.delete()
            }
        })

    }
}