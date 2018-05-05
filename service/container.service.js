const containerModel = require('../models/container');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
    list: (callback) => {
        containerModel.find({
                "isDelete": false,
                "isActive": true
            }).populate({
                path: 'items'
            })
            .exec((err, containers) => {
                if (err) {
                    return callback(err);
                }

                return callback(null, containers);
            });
    },
    insert: (body, callback) => {
        var container = new containerModel(body);
        container.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, container);
        });
    },
    update: (container, body, callback) => {
        container = _.extend(container, body);
        container.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, container);
        });
    },
    delete: (container, callback) => {
        container.isDelete = true;
        container.isActive = false;
        container.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, container);
        });
    }
};