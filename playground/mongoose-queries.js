const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5ae814806703556320bec03211';
//
// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos);
// }); // mongoose il face automat object id - returnul e array pt ca e find multiplu
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ', todo);
// }); // mongoose il face automat object id - returnul e obiect pt ca e unul singur

//
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo by ID ', todo);
// }).catch((e) => {
//     console.log(e);
// }); // mongoose il face automat object id - returnul e obiect pt ca e unul singur
//


var id = '5ae8188f3f55569f206e29e4';

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => {
    console.log(e);
});
