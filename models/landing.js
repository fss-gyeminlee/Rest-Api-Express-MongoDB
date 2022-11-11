const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    path: {
        required: true,
        type: String
    },
    html: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Landnig', dataSchema)
