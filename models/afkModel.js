const mongoose = require('mongoose')

const afkModel = new mongoose.Schema({
    guildID: String,
    userID: String,
    reason: String
})

module.exports = mongoose.model('afk', afkModel)