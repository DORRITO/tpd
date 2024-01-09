const {Schema, model} = require('mongoose')

const Role = new Schema({
    value: {type: String, unique: true, default: "customer"}
})

module.exports = model('Role', Role)