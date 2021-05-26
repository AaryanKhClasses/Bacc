const mongoose = require('mongoose')

const afkSchema = new mongoose.Schema({
    guildID: String,
    userID: String,
    reason: String
})

module.exports = mongoose.model('afk', afkSchema)