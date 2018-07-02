var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

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
app.listen(3000, () => {
    console.log('Started on port 3000');
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


