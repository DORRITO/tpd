const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    customer: { 
        userId: String,
        fullName: String, 
        phoneNumber: String 
    },
    driver: { 
        userId: String,
        fullName: String, 
        phoneNumber: String 
    },
    date: { type: Date, default: Date.now },
    routes: { type: String },
    startAddress: { type: String },
    endAddress: { type: String, required: true },
    isTaken: { type: Boolean, default: false },
    price: { type: String },
    seats: { type: String },
    dateRoute: { type: String }
})

module.exports = model('Order', orderSchema)