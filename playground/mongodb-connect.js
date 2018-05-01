// const MongoClient = require('mongodb').MongoClient;
// var user = {name: 'Andrew', age: 25};
// var {name} = user; // scoate name din obiect si o pune in var - e din esx6 - destructurare de obiect

const {MongoClient, ObjectID} = require('mongodb'); // - destructurare

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB server');
    var db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: 'false'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops arata documentele introduse
    // }); // selectie de colectie + insert

    //insert new doc into users (name, age, location

    // db.collection('Users').insertOne({
    //     name: 'Dorin',
    //     age: 34,
    //     location: 'Romania'
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     // console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp()); // vezi cand a fost creat documentul
    // })

    client.close();
})
