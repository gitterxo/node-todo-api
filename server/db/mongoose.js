var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // ca sa foloseasca sist default de promise in loc de callback
//mongoose.connect('mongodb://localhost:27017/TodoApp'); // pastreaza conexiunea spre deosebit de modulul default
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'); // pt heroku
mongoose.connect(process.env.MONGODB_URI); // pt heroku

module.exports = {
    mongoose: mongoose
}