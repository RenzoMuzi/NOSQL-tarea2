const mongoose = require('mongoose');

//hace que mongoose se conecte a la base de datos y que se puedan utilizar promesas
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = {
    mongoose
};