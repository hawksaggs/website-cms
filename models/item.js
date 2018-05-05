const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var itemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    organisedBy: {
        type: String
    },
    price: {
        type: Number
    },
    place: {
        type: String
    },
    link: {
        type: String
    },
    type: {
        type: String,
        enum: ['hotel', 'itenary', 'package'],
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema);