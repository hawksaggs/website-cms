const itemModel = require('../models/item');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
    list: (callback) => {
        itemModel.find({
            "isDelete": false,
            "isActive": true
        }).exec((err, items) => {
            if (err) {
                return callback(err);
            }

            return callback(null, items);
        });
    },
    insert: (body, callback) => {
        var item = new itemModel(body);
        item.save((err) => {
            if (err) {
                console.log(err);
                return callback(err);
            }
            return callback(null, item);
        });
    },
    update: (item, body, callback) => {
        item = _.extend(item, body);
        item.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, item);
        });
    },
    delete: (item, callback) => {
        item.isDelete = true;
        item.isActive = false;
        item.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, item);
        })
    }
};