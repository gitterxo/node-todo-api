const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            unique: true,
            validate: {
                validator: (value) => {
                    return validator.isEmail(value); // true if valid, false if not
                },
                //validator: validator.isEmail // works the same
                message: '{VALUE} is not a valid email'
            },

        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        tokens: [{
            access: {
                type: String,
                required: true,
            },
            token: {
                type: String,
                required: true,
            }
        }]
    }
);

//cele facute cu methods sunt instance methods adica obiectul cu date pe el

UserSchema.methods.toJSON = function () { // controleaza ce arat userului // e overwrite de functie
    var user = this;
    var userObject = user.toObject(); //needed for pick

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();


    user.tokens.push({
        access: access,
        token: token
    });

    return user.save().then(() => {
        return token;
    })
};

UserSchema.methods.removeToken = function (token) {
  var user = this;
  return user.update({
      $pull: { // pull from
          tokens: {
              token: token
          }
      }
  });
};

//cele cu statics sunt model methods adica merg pe modelul mare fara obiect
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded; // default undefined

    try {
        //incerc
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        //fail
        return Promise.reject();
    }

    //sucess
    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
};


UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;
    return User.findOne({"email": email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    resolve(user);
                }
                else {
                    reject()
                }
            });
        })
    });
};


UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next();
            })
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}