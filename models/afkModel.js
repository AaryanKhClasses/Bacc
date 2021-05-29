const mongoose = require('mongoose')

const afkModel = new mongoose.Model({
    guildID: String,
    userID: String,
    reason: String
})

module.exports = mongoose.model('afk', afkModel)