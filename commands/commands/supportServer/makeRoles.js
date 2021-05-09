const config = require('../../../config.json')

module.exports = {
    commands: 'makeRoles',
    permLevel: 5,
    callback: (client, message, args) => {
        if(message.author.id === config.botOwner) {
            message.guild.roles.create({ data: { name: 'AaryanKh | Owner', color: '#1ABC9C', hoist: true, position: 26, mentionable: false, permissions: ['ADMINISTRATOR'] } })
            message.guild.roles.create({ data: { name: '▬▬▬▬ STAFF ▬▬▬▬', color: '#99AAB5', hoist: true, position: 25, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Administrator', color: '#3498DB', hoist: true, position: 24, mentionable: false, permissions: ['ADMINISTRATOR'] } })
            message.guild.roles.create({ data: { name: 'Moderator', color: '#c6c321', hoist: true, position: 23, mentionable: false, permissions: ['MANAGE_ROLES', 'MANAGE_EMOJIS', 'VIEW_AUDIT_LOG', 'KICK_MEMBERS', 'BAN_MEMBERS', 'STREAM', 'VIEW_GUILD_INSIGHTS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'MANAGE_NICKNAMES', 'PRIORITY_SPEAKER'] } })
            message.guild.roles.create({ data: { name: 'Muted', color: '#979C9F', hoist: true, position: 22, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Trainee Moderator', color: '#439ca9', hoist: true, position: 21, mentionable: false, permissions: ['KICK_MEMBERS', 'VIEW_AUDIT_LOG', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'MANAGE_NICKNAMES', 'MANAGE_EMOJIS', 'PRIORITY_SPEAKER'] } })
            message.guild.roles.create({ data: { name: 'Helper', color: '#24744a', hoist: true, position: 20, mentionable: false, permissions: ['VIEW_AUDIT_LOG', 'MANAGE_MESSAGES', 'MOVE_MEMBERS', 'MANAGE_NICKNAMES', 'PRIORITY_SPEAKER', 'ATTACH_FILES'] } })
            message.guild.roles.create({ data: { name: '▬▬▬▬ EXCLUSIVE ▬▬▬▬', color: '#99AAB5', hoist: true, position: 19, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Partners', color: '#1584a8', hoist: true, position: 18, mentionable: false, permissions: ['ATTACH_FILES', 'PRIORITY_SPEAKER', 'EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: 'Server Booster', color: '#d31ec3', hoist: true, position: 17, mentionable: false, permissions: ['PRIORITY_SPEAKER', 'ATTACH_FILES', 'EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: 'Exclusive', color: '#1aaf84', hoist: true, position: 16, mentionable: false, permissions: ['ATTACH_FILES', 'PRIORITY_SPEAKER', 'EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: 'Notable', color: '#25578b', hoist: true, position: 15, mentionable: false, permissions: ['PRIORITY_SPEAKER', 'ATTACH_FILES', 'EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: 'Youtubers', color: '#ed1111', hoist: true, position: 14, mentionable: false, permissions: ['EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: '▬▬▬▬ LEVEL ROLES ▬▬▬▬', color: '#99AAB5', hoist: true, position: 13, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Level 100 | Unbelivable', color: '#11806A', hoist: true, position: 12, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Level 75 | Master', color: '#2ECC71', hoist: true, position: 11, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Level 50 | Supreme', color: '#A84300', hoist: true, position: 10, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Level 35 | Apprentice', color: '#F1C40F', hoist: true, position: 9, mentionable: false, permissions: ['PRIORITY_SPEAKER'] } })
            message.guild.roles.create({ data: { name: 'Level 20 | Novice', color: '#3498DB', hoist: true, position: 8, mentionable: false, permissions: ['ATTACH_FILES'] } })
            message.guild.roles.create({ data: { name: 'Level 10 | Rookie', color: '#2ECC71', hoist: true, position: 7, mentionable: false, permissions: ['STREAM', 'EMBED_LINKS'] } })
            message.guild.roles.create({ data: { name: 'Level 1 | Newbie', color: '#E74C3C', hoist: true, position: 6, mentionable: false, permissions: ['CHANGE_NICKNAME'] } })
            message.guild.roles.create({ data: { name: '▬▬▬▬ PING & CHANNEL ROLES ▬▬▬▬', color: '#99AAB5', hoist: true, position: 5, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Beta Users', color: '#ff8282', hoist: true, position: 4, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Minecraft', color: '#72ffa2', hoist: true, position: 3, mentionable: false } })
            message.guild.roles.create({ data: { name: 'Bacc Bot', color: '#ffc163', hoist: true, position: 2, mentionable: false } })
            message.guild.roles.create({ data: { name: 'General', color: '#206694', hoist: true, position: 1, mentionable: false } })
        }
    }
}