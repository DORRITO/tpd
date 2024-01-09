const {Schema, model} = require('mongoose')

const User = new Schema({
    fullName: {type: String, required: true},
    phoneNumber: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}]
})

module.exports = model('users', User)