const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
// const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./model/todo');
const { User } = require('./model/user');
const { Comment } = require('./model/comment');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

/**
|--------------------------------------------------
| POST - Crear Usuario
|--------------------------------------------------
*/
app.post('/user', (req, res) => {
    var comment = new Comment({
        email: req.body.email,
    });

    comment.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

/**
|--------------------------------------------------
| POST - Crear Comentario
|--------------------------------------------------
*/
app.post('/comment', (req, res) => {
    var comment = new Comment({
        email: req.body.email,
        text: req.body.text,
    });

    comment.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

/**
|--------------------------------------------------
| GET
|--------------------------------------------------
*/
// app.get('/todos', (req, res) => {
//     Todo.find().then((todos) => {
//         res.send({
//             todos
//         })
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

/**
|--------------------------------------------------
| GET - Listar comentarios de usuario
|--------------------------------------------------
*/
app.get('/comments/user/:email', (req, res) => {
    var email = req.params.email;
    // if (!ObjectID.isValid(id)) {
    //     return res.status(404).send();     aca validar si existe el usuario en el sistema
    // }
    Comment.find({ email: email }).then((comments) => {
        if (!comments) {
            return res.status(404).send();
        }
        res.send(JSON.stringify(comments, undefined, 2));
    }).catch((e) => {
        res.status(400).send();
    })
});


// app.get('/todos/:id', (req, res) => {
//     var id = req.params.id;
//     if (!ObjectID.isValid(id)) {
//         return res.status(404).send();
//     }

//     Todo.findById(id).then((todo) => {
//         if (!todo) {
//             return res.status(404).send();
//         }
//         res.send({ todo });
//     }).catch((e) => {
//         res.status(400).send();
//     })
// });

/**
|--------------------------------------------------
| PATCH - Comentar comentario
|--------------------------------------------------
*/
app.patch('/comment/:id', (req, res) => {  //antes que nada agregar comentario de comentario al sistema
    var comment = new Comment({
        email: req.body.email,
        text: req.body.text,
    });
    
    comment.save().then((commentBack) => {
        var id = req.params.id;

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        Comment.findByIdAndUpdate(id, {
            $push:{
                comments: {
                    _id: new ObjectID(commentBack.id),
                    email: req.body.email,
                    text: req.body.text
                }
            } 
         }, {
            new: true
         }).then((commentUpdated) => {
           if (!commentUpdated) {
               return res.status(404).send();
           }
           res.send({commentUpdated});
         }).catch((e) => {
            res.status(400).send();
         });

    }, (e) => {
        res.status(400).send(e);
    })
});



app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};
//renzo muzi