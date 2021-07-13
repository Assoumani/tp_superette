const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: false
    },
    createdAt: {
        type: Date,
        require: true
    },
    editedAt: {
        type: Date,
        require: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('product', productSchema, 'products');
