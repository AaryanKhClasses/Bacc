// const config = require('../../../../config.json')
// const { MessageEmbed } = require('discord.js')
// const superagent = require('superagent')
// const { MessageButton } = require('discord-buttons')

// module.exports = {
//     commands: 'cat',
//     description: 'Sends a random picture of a cute cat!',
//     permLevel: 0,
//     usage: '!cat',
//     cooldown: 10,
//     callback: async(client, message, args) => {
//         const btn = new MessageButton()
//         .setStyle('blurple')
//         .setLabel('▶ Next Image')
//         .setID('button1')

//         const btn2 = new MessageButton()
//         .setStyle('red')
//         .setID('button2')
//         .setLabel(`✖ Delete`)

//         const { body } = await superagent.get('https://aws.random.cat/meow')
//         const embed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//         .setFooter(config.botname)
//         .setTimestamp()
//         .setDescription(`${config.emojis.animal} Here's a cute little cat!`)
//         .setImage(body.file)
//         message.reply({ embed: embed, buttons: [btn, btn2] })

//         client.on('clickButton', async(button) => {
//             if(button.id === 'button1') {// && button.clicker.id === message.author.id) {
//                 const { body } = await superagent.get('https://aws.random.cat/meow')
//                 const embed = new MessageEmbed()
//                 .setColor('RANDOM')
//                 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .setDescription(`${config.emojis.animal} Here's a cute little cat!`)
//                 .setImage(body.file)
//                 button.message.edit({ embed: embed, buttons: [btn, btn2] })
//             } else if(button.id === 'button2') { // && button.clicker.id === message.author.id) {
//                 button.message.delete()
//                 message.delete()
//             }
//         })
//     }
// }