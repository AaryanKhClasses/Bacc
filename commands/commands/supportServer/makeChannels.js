const config = require('../../../config.json')

module.exports = {
    commands: 'makeChannels',
    permLevel: 5,
    callback: (client, message, args) => {
        if(message.author.id === config.botOwner){
            message.guild.channels.create('▬▬▬▬GETTING STARTED▬▬▬▬', { type: 'category' }).then(() => {
                const startCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬GETTING STARTED▬▬▬▬').id
                message.guild.channels.create('📜・info-and-faq', { type: 'text' }).then((channel) => { channel.setParent(startCategory) })
                message.guild.channels.create('⚡・roles', { type: 'text' }).then((channel) => { channel.setParent(startCategory) })
                message.guild.channels.create('😎・welcome', { type: 'text' }).then((channel) => { channel.setParent(startCategory) })
                message.guild.channels.create(`💕・boosts`, { type: 'text' }).then((channel) => { channel.setParent(startCategory) })
                message.guild.channels.create('📢・announcements', { type: 'news' }).then((channel) => { channel.setParent(startCategory) })
            }).then(() => {
                message.guild.channels.create('▬▬▬▬LOUNGE▬▬▬▬', { type: 'category' }).then(() => {
                    const loungeCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬LOUNGE▬▬▬▬').id
                    message.guild.channels.create('💬・general', { type: 'text' }).then((channel) => { channel.setParent(loungeCategory) })
                    message.guild.channels.create('📷・media', { type: 'text' }).then((channel) => { channel.setParent(loungeCategory) })
                    message.guild.channels.create('🐸・memes', { type: 'text' }).then((channel) => { channel.setParent(loungeCategory) })
                    message.guild.channels.create('🔊・General VC', { type: 'voice' }).then((channel) => { channel.setParent(loungeCategory) })
                }).then(() => {
                    message.guild.channels.create('▬▬▬▬FUN ZONE▬▬▬▬', { type: 'category' }).then(() => {
                        const funCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬FUN ZONE▬▬▬▬').id
                        message.guild.channels.create('🔢・counting', { type: 'text' }).then((channel) => { channel.setParent(funCategory) })
                        message.guild.channels.create('🤖・bots', { type: 'text' }).then((channel) => { channel.setParent(funCategory) })
                        message.guild.channels.create('🎵・Music VC¹ [!play]', { type: 'voice' }).then((channel) => { channel.setParent(funCategory) })
                        message.guild.channels.create('🎵・Music VC² [!play]', { type: 'voice' }).then((channel) => { channel.setParent(funCategory) })
                    }).then(() => {
                        message.guild.channels.create('▬▬▬▬BACC BOT▬▬▬▬', { type: 'category' }).then(() => {
                            const baccCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬BACC BOT▬▬▬▬').id
                            message.guild.channels.create('🗞・bot-updates', { type: 'news' }).then((channel) => { channel.setParent(baccCategory) })
                            message.guild.channels.create('📰・github', { type: 'news' }).then((channel) => { channel.setParent(baccCategory) })
                            message.guild.channels.create('🤖・bot-testing¹', { type: 'text' }).then((channel) => { channel.setParent(baccCategory) })
                            message.guild.channels.create('🤖・bot-testing²', { type: 'text' }).then((channel) => { channel.setParent(baccCategory) })
                            message.guild.channels.create('📝・bot-suggestions', { type: 'text' }).then((channel) => { channel.setParent(baccCategory) })
                            message.guild.channels.create('❓・bot-help', { type: 'text' }).then((channel) => { channel.setParent(baccCategory) })
                        }).then(() => {
                            message.guild.channels.create('▬▬▬▬MINECRAFT▬▬▬▬', { type: 'category' }).then(() => {
                                const mcCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬MINECRAFT▬▬▬▬').id
                                message.guild.channels.create('🗞・minecraft-updates', { type: 'news' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('💬・minecraft-chat', { type: 'text' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('🤖・minecraft-bots', { type: 'text' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('📷・minecraft-media', { type: 'text' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('❓・minecraft-help', { type: 'text' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('🎮・Minecraft VC¹', { type: 'voice' }).then((channel) => { channel.setParent(mcCategory) })
                                message.guild.channels.create('🎮・Minecraft VC²', { type: 'voice' }).then((channel) => { channel.setParent(mcCategory) })
                            }).then(() => {
                                message.guild.channels.create('▬▬▬▬EXCLUSIVES▬▬▬▬', { type: 'category' }).then(() => {
                                    const exclusiveCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬EXCLUSIVES▬▬▬▬').id
                                    message.guild.channels.create('📰・exclusive-news', { type: 'news' }).then((channel) => { channel.setParent(exclusiveCategory) })
                                    message.guild.channels.create('💬・exclusive-chat', { type: 'text' }).then((channel) => { channel.setParent(exclusiveCategory) })
                                    message.guild.channels.create('🔊・Exclusive VC', { type: 'voice' }).then((channel) => { channel.setParent(exclusiveCategory) })
                                }).then(() => {
                                    message.guild.channels.create('▬▬▬▬PROMOTION▬▬▬▬', { type: 'category' }).then(() => {
                                        const promoCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬PROMOTION▬▬▬▬').id
                                        message.guild.channels.create('🎁・self-promo', { type: 'text' }).then((channel) => { channel.setParent(promoCategory) })
                                        message.guild.channels.create('🔮・exclusive-promo', { type: 'text' }).then((channel) => { channel.setParent(promoCategory) })
                                        message.guild.channels.create('🤖・bots-promo', { type: 'text' }).then((channel) => { channel.setParent(promoCategory) })
                                    }).then(() => {
                                        message.guild.channels.create('▬▬▬▬STAFF CHANNELS▬▬▬▬', { type: 'category' }).then(() => {
                                            const staffCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬STAFF CHANNELS▬▬▬▬').id
                                            message.guild.channels.create('📰・staff-news', { type: 'news' }).then((channel) => { channel.setParent(staffCategory) })
                                            message.guild.channels.create('❗・staff-todo', { type: 'text' }).then((channel) => { channel.setParent(staffCategory) })
                                            message.guild.channels.create('💬・staff-chat', { type: 'text' }).then((channel) => { channel.setParent(staffCategory) })
                                            message.guild.channels.create('🤖・staff-bots', { type: 'text' }).then((channel) => { channel.setParent(staffCategory) })
                                            message.guild.channels.create('📝・staff-suggestions', { type: 'text' }).then((channel) => { channel.setParent(staffCategory) })
                                            message.guild.channels.create('🔊・Staff Meetings', { type: 'voice' }).then((channel) => { channel.setParent(staffCategory) })
                                        }).then(() => {
                                            message.guild.channels.create('▬▬▬▬LOGS▬▬▬▬', { type: 'category' }).then(() => {
                                                const logsCategory = message.guild.channels.cache.find(category => category.name === '▬▬▬▬LOGS▬▬▬▬').id
                                                message.guild.channels.create('⌨・mod-logs', { type: 'text' }).then((channel) => { channel.setParent(logsCategory) })
                                                message.guild.channels.create('🚪・join-logs', { type: 'text' }).then((channel) => { channel.setParent(logsCategory) })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    }
}