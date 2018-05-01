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

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not delete todos', err);
    // });

    // //deleteOne
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not deleteOne todos', err);
    // })

    // //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => { // iti da inapoi si obiectul dupa ce il sterge ca sa il poti afisa
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not findanddelete todos', err);
    // })


    //delete duplicate
    //delete by id

    // //tema
    // db.collection('Users').deleteMany({name: "Dorin"}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not delete many users', err);
    // })

    // //tema2
    // db.collection('Users').findOneAndDelete({_id: new ObjectID("5ae71d2ee15cb05cb099f218")}).then((result) => {
    //     console.log(JSON.stringify(result, undefined, 2));
    // }, (err) => {
    //     console.log('Could not delete user by ID');
    // })

    //client.close();
})
