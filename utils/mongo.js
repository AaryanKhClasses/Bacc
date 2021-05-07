const mongoose = require('mongoose')
const config = require('../config.json')

module.exports = async() =>{
    await mongoose.connect(config.mongoPass, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}