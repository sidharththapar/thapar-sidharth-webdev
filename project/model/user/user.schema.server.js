/**
 * Created by sidharththapar on 6/11/17.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    roles:[{type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN', 'DEVELOPER']}],
    google: {
        id:    String,
        token: String
    },
    websites: [{type: mongoose.Schema.Types.ObjectId, ref: "WebsiteModel"}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: "user"});

module.exports = userSchema;