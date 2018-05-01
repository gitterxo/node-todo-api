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

    // db.collection('Todos').find().toArray().then((docs) => { // returneaza un promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })


    // db.collection('Todos').find({completed: false}).toArray().then((docs) => { // returneaza un promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    // db.collection('Todos').find({
    //     _id: new ObjectID("5ae7fe4ad73695e495e1f3eb")
    // }).toArray().then((docs) => { // returneaza un promise
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    //
    // db.collection('Todos').find().count().then((count) => { // returneaza un promise
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err)
    // })

    db.collection('Users').find({name: "Dorin"}).toArray().then((docs) => { //toArray e functie promise, daca nu ai toarray nu merge then
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users',err);
    })

    //client.close();
})
