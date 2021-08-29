const mongoose = require('mongoose')


const bugSchema = new mongoose.Schema({
    projectname:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    deadline:{
        type: Date,
        default: Date.now
    },
    priority: {
        type: String
    },
    status: {
        type: String
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Bug', bugSchema)