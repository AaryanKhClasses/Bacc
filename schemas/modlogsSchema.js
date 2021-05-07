const mongoose = require('mongoose')

const modlogsSchema = mongoose.Schema({
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

module.exports = mongoose.model('modlogs', modlogsSchema)