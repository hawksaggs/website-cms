const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var pageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    containers: [{
        type: Schema.Types.ObjectId,
        ref: 'Container'
    }],
    isDelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);