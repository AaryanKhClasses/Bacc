const mongoose = require('mongoose')
const levelSchema = require('../schemas/levelSchema')
var mongoUrl

class Levelling {
    static async setURL(dbUrl) {
        mongoUrl = dbUrl
        return mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        })
    }

    static async appendXp(userId, guildId, xp) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
    
        if (!user) {
          const newUser = new levelSchema({
            userID: userId,
            guildID: guildId,
            xp: xp,
            level: Math.floor(0.1 * Math.sqrt(xp))
          })
    
          await newUser.save()
          return (Math.floor(0.1 * Math.sqrt(xp)) > 0)
        }
    
        user.xp += parseInt(xp, 10)
        user.level = Math.floor(0.1 * Math.sqrt(user.xp))
        user.lastUpdated = new Date()
     
        await user.save()
        return (Math.floor(0.1 * Math.sqrt(user.xp -= xp)) < user.level)
      }
    
      static async appendLevel(userId, guildId, levels) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
        if (!user) return false
        
        user.level += parseInt(levels, 10)
        user.xp = user.level * user.level * 100
        user.lastUpdated = new Date()
     
        user.save()
        return user
      }
    
      static async setXp(userId, guildId, xp) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
        if (!user) return false
    
        user.xp = xp
        user.level = Math.floor(0.1 * Math.sqrt(user.xp))
        user.lastUpdated = new Date()
      
        user.save()
        return user
      }
    
      static async setLevel(userId, guildId, level) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
        if (!user) return false
    
        user.level = level
        user.xp = level * level * 100
        user.lastUpdated = new Date()
        
        user.save()
        return user
      }
      static async fetch(userId, guildId, fetchPosition = false) {
        const user = await levelSchema.findOne({
          userID: userId,
          guildID: guildId
        })
        if (!user) return false
    
        if (fetchPosition === true) {
          const leaderboard = await levelSchema.find({
            guildID: guildId
          }).sort([['xp', 'descending']]).exec()
    
          user.position = leaderboard.findIndex(i => i.userID === userId) + 1
        }
    
        user.cleanXp = user.xp - this.xpFor(user.level)
        user.cleanNextLevelXp = this.xpFor(user.level + 1) - this.xpFor(user.level)
        
        return user
      }

      static async subtractXp(userId, guildId, xp) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
        if (!user) return false
    
        user.xp -= xp
        user.level = Math.floor(0.1 * Math.sqrt(user.xp))
        user.lastUpdated = new Date()
       
        user.save()
        return user
      }
    
      static async subtractLevel(userId, guildId, levels) {
        const user = await levelSchema.findOne({ userID: userId, guildID: guildId })
        if (!user) return false
    
        user.level -= levels
        user.xp = user.level * user.level * 100
        user.lastUpdated = new Date()
        
        user.save()
        return user
      }
    
      static async fetchLeaderboard(guildId, limit) {
    
        var users = await levelSchema.find({ guildID: guildId }).sort([['xp', 'descending']]).exec()
    
        return users.slice(0, limit)
      }
    
      static async computeLeaderboard(client, leaderboard, fetchUsers = false) {
        if (leaderboard.length < 1) return []
        const computedArray = []
    
        if (fetchUsers) {
          for (const key of leaderboard) {
            const user = await client.users.fetch(key.userID) || { username: "Unknown", discriminator: "0000" }
            computedArray.push({
              guildID: key.guildID,
              userID: key.userID,
              xp: key.xp,
              level: key.level,
              position: (leaderboard.findIndex(i => i.guildID === key.guildID && i.userID === key.userID) + 1),
              username: user.username,
              discriminator: user.discriminator
            })
          }
        } else {
          leaderboard.map(key => computedArray.push({
            guildID: key.guildID,
            userID: key.userID,
            xp: key.xp,
            level: key.level,
            position: (leaderboard.findIndex(i => i.guildID === key.guildID && i.userID === key.userID) + 1),
            username: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).username : "Unknown",
            discriminator: client.users.cache.get(key.userID) ? client.users.cache.get(key.userID).discriminator : "0000"
          }))
        }
    
        return computedArray
      }

      static xpFor (targetLevel) {
        if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10)
        return targetLevel * targetLevel * 100
      }
    }
    
    module.exports = Levelling