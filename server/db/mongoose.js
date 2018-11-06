const mongoose = require('mongoose');

//hace que mongoose se conecte a la base de datos y que se puedan utilizar promesas
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/NOSQLtarea2', { useNewUrlParser: true });

module.exports = {
    mongoose
};