const mongoose = require('mongoose')

mongoose
    .connect("mongodb+srv://byadrian05:wcSZLmq9ZLRTQLqQ@simcafs.7zjrbmd.mongodb.net/simcafs")
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db

//mongodb+srv://byadrian05:wcSZLmq9ZLRTQLqQ@simcafs.7zjrbmd.mongodb.net/

//wcSZLmq9ZLRTQLqQ