const pageModel = require('../models/page');
const helper = require('../helpers/helper');
const mongoose = require('mongoose');
const _ = require('lodash');
const pageService = require('../service/page.service');

module.exports = {
    list: (req, res) => {
        pageService.list((err, pages) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }

            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: pages
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
        pageService.insert(req.body, (err, page) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: page
            });
        });
    },
    update: (req, res) => {
        var page = req.page;
        pageService.update(page, req.body, (err, page) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                data: page
            });
        });
    },
    delete: (req, res) => {
        var page = req.page;
        pageService.delete(page, (err, page) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            return helper.sendJsonResponse(res, 200, {
                error: false,
                message: 'page deleted successfully'
            });
        });
    },
    findById: (req, res, next) => {
        if (!req.params.pageId) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'pageId required'
            });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.pageId)) {
            return helper.sendJsonResponse(res, 400, {
                error: true,
                message: 'Invalid pageId'
            });
        }
        pageModel.findById(req.params.pageId).exec((err, page) => {
            if (err) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: err.message
                });
            }
            if (!page) {
                return helper.sendJsonResponse(res, 400, {
                    error: true,
                    message: 'No data found'
                });
            }

            req.page = page;
            next();
        });
    },
    getById: (req, res) => {
        return helper.sendJsonResponse(res, 200, {
            error: false,
            data: req.page
        });
    }
};