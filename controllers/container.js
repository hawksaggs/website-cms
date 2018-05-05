const containerModel = require('../models/container');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');
const containerService = require('../service/container.service');

module.exports = {
    list: (req, res) => {
        containerService.list((err, containers) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }

            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: containers
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
        containerService.insert(req.body, (err, container) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: container
            });
        });
    },
    update: (req, res) => {
        if (!req.body) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'Parameter required'
            });
        }
        var container = req.container;
        containerService.update(container, req.body, (err, container) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: container
            });
        });
    },
    delete: (req, res) => {
        var container = req.container;
        containerService.delete(container, (err, container) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                message: 'container deleted successfully'
            });
        });
    },
    findById: (req, res, next) => {
        if (!req.params.containerId) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'containerId required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.containerId)) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'Invalid containerId'
            });
        }
        containerModel.findById(req.params.containerId).exec((err, container) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            if (!container) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: 'No data found'
                });
            }
            // console.log(container);

            req.container = container;
            next();
        });
    },
    getById: (req, res) => {
        return helper.sendJsonResponse(res, 200, {
            error: false,
            data: req.container
        });
    }
};