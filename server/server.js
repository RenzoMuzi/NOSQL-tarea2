const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
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
    var comment = new User({
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
    User.find({ email: req.body.email }).then((user) =>{
        if (user.length == 0) {
            return res.status(401).send("No te encuentras Autorizado para realizar esta operacion");
        }
        var comment = new Comment({
            email: req.body.email,
            text: req.body.text,
        });
    
        comment.save().then((doc) => {
            res.send(doc);
        }, (e) => {
            res.status(400).send(e);
        })
    }).catch((e) => {
        res.status(400).send();
    })
});

/**
|--------------------------------------------------
| GET - Listar comentarios de usuario
|--------------------------------------------------
*/
app.get('/comments/user/:email', (req, res) => {
    var email = req.params.email;
    User.find({ email: email }).then((user) =>{
        if (user.length == 0) {
            return res.status(404).send();
        }

        Comment.find({ email: email }).then((comments) => {
            if (!comments) {
                return res.status(404).send();
            }
            res.send(JSON.stringify(comments, undefined, 2));
        }).catch((e) => {
            res.status(400).send();
        })
    }).catch((e) => {
        res.status(400).send();
    })
});

/**
|--------------------------------------------------
| PATCH - Comentar comentario
|--------------------------------------------------
*/
app.patch('/comment/:id', (req, res) => {  
    User.find({ email: req.body.email }).then((user) =>{
        if (user.length == 0) {
            return res.status(401).send("No te encuentras Autorizado para realizar esta operacion");
        }
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
    }).catch((e) => {
        res.status(400).send();
    })
});

/**
|--------------------------------------------------
| GET - Leer Comentario
|--------------------------------------------------
*/
app.get('/comment/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Comment.findById(id).then((comment) => {
        if (!comment) {
            return res.status(404).send();
        }
        res.send({ 
            id: id,
            text: comment.text,
            comments: comment.comments
         });
    }).catch((e) => {
        res.status(400).send();
    })
});


app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};
//renzo muzi