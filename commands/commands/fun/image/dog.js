// const config = require('../../../../config.json')
// const { MessageEmbed } = require('discord.js')
// const { MessageButton } = require('discord-buttons')
// const superagent = require('superagent')

// module.exports = {
//     commands: 'dog',
//     description: 'Sends a random cute dog image!',
//     permLevel: 0,
//     usage: '!dog',
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

//         const { body } = await superagent.get('https://random.dog/woof.json')
//         const embed = new MessageEmbed()
//         .setColor('RANDOM')
//         .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//         .setFooter(config.botname)
//         .setTimestamp()
//         .setDescription(`Here's a cute little dog 🐶!`)
//         .setImage(body.url)
//         message.reply({ embed : embed, buttons: [btn, btn2] })

//         client.on('clickButton', async(button) => {
//             if(button.id === 'button1') { // && button.clicker.id === message.author.id) {
//                 const { body } = await superagent.get('https://random.dog/woof.json')
//                 const embed = new MessageEmbed()
//                 .setColor('RANDOM')
//                 .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
//                 .setFooter(config.botname)
//                 .setTimestamp()
//                 .setDescription(`Here's a cute little dog 🐶!`)
//                 .setImage(body.url)
//                 button.message.edit({ embed : embed, buttons: [btn, btn2] })  
//             } else if(button.id === 'button2') {// && button.clicker.id === message.author.id) {
//                 button.message.delete()
//                 message.delete()
//             }
//         })

//     }
// }