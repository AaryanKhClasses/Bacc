const fs = require('fs')
const path = require('path')

module.exports = (client) => {
        const readModules = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for(const file of files){
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if(stat.isDirectory()){
                readModules(path.join(dir, file))
            } else if(file !== 'load-modules.js'){
                const module = require(path.join(__dirname, dir, file))
                console.log(`Enabling module "${file}"`)
                module(client)
            }
        }
    }

    readModules('.')
} 