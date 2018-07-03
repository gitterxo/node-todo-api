//require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middlleware/authenticate');

var app = express();
const port = process.env.PORT || 3000; // daca nu e definit devine 3000

app.use(bodyParser.json()); // putem trimite json catre app asa

app.post('/todos', (req, res) => { // post request
//    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e); // trimite cod de 400
    })
}) //create route

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos}); // il face obiect in loc de array
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', (req, res) => { // face variabila in link
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) { // check for null
            return res.status(404).send('Id not found!');
        }
        res.send({todo}); // il face obiect in loc de array ca sa poti sa pui si custom message
    }).catch((e) => {
        res.status(400).send('');
    });

})

app.delete('/todos/:id', (req, res) => {

    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Id not valid");
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Id not found');
        }
        res.send(todo);
    }).catch((e) => {
        return res.status(400).send('');
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']); // scoate din arrayul primit doar campurile pe care vreau sa le modific

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Id not valid');
    }

    if (_.isBoolean(body.completed) && body.completed) { // daca e boolean si adevarat
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null; // sterge valoarea din db
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => { // new true returneaza noul obiect ca result
        if (!todo) {
            return res.status(404).send('Id not found')
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send('');
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);


    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => { // authenticate pus aici inseamna ca ruta aia foloseste ca middleware functia de mai sus
    res.send(req.user);
});

// POST /users/login {email, password)

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            return res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, ()=>{
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

// var newTodo = new Todo({
//     text: "Cook dinner"
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save Todo', err);
// });

// var newTodo = new Todo({
//     text: "Go to work",
//     completed: true,
//     completedAt: 123
// });

// var newTodo = new Todo({
//     text: '      Edit this video        '
// });
//
// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save todo', err);
// });


// tema model - user model -  email require, trim, type string, se min 1; create user
//
// var newUser = new User({
//     email: "dorinenache@fastmail.com"
// });
//
// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to add user', err);
// })


