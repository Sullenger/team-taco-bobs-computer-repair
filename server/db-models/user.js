const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: String,
    _first_name: String,
    _last_name: String,
    email: String,
    _phone_number: String,
    _street_address: String,
    _city: String,
    _state: String,
    _zipCode: String,
    _username: String,
    _password: String,
},
    { collection: 'user' }
);


const User = module.exports = mongoose.model('User', userSchema);
