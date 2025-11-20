const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: String,
    password: String, 
    token: String, 
    email: String,
    description: {type: String, default:''},
    imgUser: {type: String, default:'../public/images/utilisateur.png'},
    createdDate: {type: Date, default: Date.now},
})

const User = mongoose.model('users', userSchema);

module.exports = User

