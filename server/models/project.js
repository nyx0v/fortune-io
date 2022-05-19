const mongoose = require('mongoose')


const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        min: 3,
        max: 255
    },
    data: String,
    dateCreated: {
        type: Date,
        default: new Date(),
        required: true
    },
    dateLastModified: {
        type: Date,
        default: new Date(),
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('Project', ProjectSchema)