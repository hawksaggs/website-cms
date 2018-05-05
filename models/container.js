const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var containerSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    noOfColumns: {
        type: Number
    },
    noOfRows: {
        type: Number
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
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

module.exports = mongoose.model('Container', containerSchema);