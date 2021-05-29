const mongoose = require('mongoose')

const modlogsModel = mongoose.Model({
    guildId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    modLog: {
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
