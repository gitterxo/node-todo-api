const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// }) // sterge toata baza


// Todo.findOneAndRemove({_id: "5b3b3a3b7908c466630edf58"}).then((todo) => {
//     console.log(todo);
// }); // sterge documentul dar il si returneaza ca result

// Todo.findByIdAndRemove('5b3b39bae191331813bd9dea').then((todo) => {
//     console.log(todo);
// }); // sterge documentul dar il si returneaza ca result