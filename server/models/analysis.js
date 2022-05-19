const mongoose = require('mongoose')

const AnalysisSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Types.ObjectId,
        required: true,
        index: true
    },
    dateCreated: {
        type: Date,
        default: new Date(),
        required: true
    },
    dateLastModified : {
        type: Date,
        default: new Date(),
        required: true
    },
    fields: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Analysis', AnalysisSchema);