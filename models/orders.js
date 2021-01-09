const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    items: {
        type: Array,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    taxes: {
        type: Number,
        required: true
    },
    shippingName: {
        type: String,
        required: true
    },
    shippingAddress: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingState: {
        type: String,
        required: true
    },
    shippingCountry: {
        type: String,
        required: true
    },
    billingCard: {
        type: Number,
        required: true
    },
    billingExpDate: {
        type: String,
        required: true
    },
    billingSecCode: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('order', orderSchema);