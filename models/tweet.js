const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    content: {type: String, maxlength: 280},
    autor: {type: mongoose.Schema.Types.ObjectId, ref:'users'},
    createdDate: {type: Date, default: Date.now},
    like: [{type: mongoose.Schema.Types.ObjectId, ref:'users'}]
})

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet