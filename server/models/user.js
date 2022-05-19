const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true,
        max: 25,
        min: 3,
        unique: true

    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', UserSchema)