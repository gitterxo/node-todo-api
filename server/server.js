var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


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
            return res.status(404).send('');
        }
        res.send(todo);
    }).catch((e) => {
        return res.status(400).send('');
    });
})

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


