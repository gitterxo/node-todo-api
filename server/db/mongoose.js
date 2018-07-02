var mongoose = require('mongoose');

mongoose.Promise = global.Promise; // ca sa foloseasca sist default de promise in loc de callback
mongoose.connect('mongodb://localhost:27017/TodoApp'); // pastreaza conexiunea spre deosebit de modulul default

module.exports = {
    mongoose: mongoose
}