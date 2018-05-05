const itemModel = require('../models/item');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');
const itemService = require('../service/item.service');

module.exports = {
    list: (req, res) => {
        itemService.list((err, items) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }

            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: items
            });
        });
    },
    insert: (req, res) => {
        if (!req.body) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'Parameter required'
            });
        }
        itemService.insert(req.body, (err, item) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: item
            });
        });
    },
    update: (req, res) => {
        var item = req.item;
        itemService.update(item, req.body, (err, item) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: item
            });
        });
    },
    delete: (req, res) => {
        var item = req.item;
        itemService.delete(item, (err, item) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                message: 'Item deleted successfully'
            });
        });
    },
    findById: (req, res, next) => {
        if (!req.params.itemId) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'itemId required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.itemId)) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'Invalid itemId'
            });
        }
        itemModel.findById(req.params.itemId).exec((err, item) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            if (!item) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: 'No data found'
                });
            }

            req.item = item;
            next();
        });
    },
    getById: (req, res) => {
        return helper.sendJsonResponse(res, 200, {
            error: false,
            data: req.item
        });
    }
};