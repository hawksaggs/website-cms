const pageModel = require('../models/page');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');

module.exports = {
    list: (callback) => {
        pageModel.find({
                "isDelete": false,
                "isActive": true
            })
            .sort()
            .populate({
                path: 'containers',
                options: {
                    sort: {
                        'createdAt': 1
                    }
                },
                populate: {
                    path: 'items',
                    model: 'Item',
                    options: {
                        sort: {
                            'createdAt': 1
                        }
                    },
                }
            })
            .exec((err, pages) => {
                if (err) {
                    return callback(er);
                }

                return callback(null, pages);
            });
    },
    insert: (body, callback) => {
        var page = new pageModel(body);
        page.save((err) => {
            if (err) {
                return callback(err);
            }

            return callback(null, page);
        });
    },
    update: (page, body, callback) => {
        page = _.extend(page, body);

        page.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, page);
        });
    },
    delete: (page, callback) => {
        page.isDelete = true;
        page.isActive = false;
        page.save((err) => {
            if (err) {
                return callback(err);
            }
            return callback(null, page);
        })
    }
};