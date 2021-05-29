const mongoose = require('mongoose')

const modlogsModel = mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    modlog: {
        type: [Object],
        required: true
    },

})

module.exports = mongoose.model('modlogs', modlogsModel)

/*
modlog: [
    logtype
    log no
    user
    userid
    moderator
    kickno
    banno
    muteno
    warnno
    reason
    timestamp
]
*/
