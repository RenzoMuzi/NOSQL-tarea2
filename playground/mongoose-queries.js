const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/model/todo');
const { User } = require('./../server/model/user');

var id = '5bdf43bcc4dbe12410c5f1ad';
var idUser = '5bdf570325418c320cc9b905';

if (!ObjectID.isValid(idUser)) {
    console.log('ID not valid');
}

// Todo.find({
//     _id: id //aca mongoose te convierte el string en el object id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id //aca mongoose te convierte el string en el object id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not Found')
//     }
//     console.log('Todo By Id', todo)
// }).catch((e) => {
//     console.log(e);
// });

User.findById(idUser).then((user) => {
    if (!user) {
        return console.log('Id User not Found');
    }
    console.log('User By Id', JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});