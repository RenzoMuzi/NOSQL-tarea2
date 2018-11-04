const mongoose = require('mongoose');
//generar el modelo
const Todo = mongoose.model('Todo', {  // vendria a ser una funcion
    text: {
        type: String,
        required: true,
        minlenght: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAT: {
        type: Number,
        default: null
    }
});

module.exports = { Todo };