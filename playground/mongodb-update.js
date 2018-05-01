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

    // db.collection('Todos').findOneAndUpdate(                       //folosim mongo update operators
    //     {_id: new ObjectID("5ae7fe4ad73695e495e1f3eb")},
    //     {
    //         $set: {
    //             completed: true
    //         },
    //     }, {
    //         returnOriginal: false // by default el returneaza obiectul original
    //     }).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Cannot update record', err);
    // })

    db.collection('Users').findOneAndUpdate(
        {_id: new ObjectID("5ae71d4b3ebe9272dcd41b97")},
        {
            $set: {
                name: "Dorin",
                location: "Romania"
            },
            $inc: {
                age: 1
            }
        }, {
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Could not update record: ', err);
    })

    //client.close();
})
