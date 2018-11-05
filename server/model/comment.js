const mongoose = require('mongoose');
//generar el modelo
const Comment = mongoose.model('Comment', {
    email: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    text: {
        type: String,
        required: true,
        minlenght: 1
    },
    comments: [{
        _id: String,
        email: String,
        text: String
    }]
});

module.exports = { Comment };