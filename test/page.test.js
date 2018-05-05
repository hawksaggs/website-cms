const assert = require('chai').assert;
const camo = require('camo');
const mongoose = require('mongoose');
const pageService = require('../service/page.service');
const containerService = require('../service/container.service');

describe('pages', function () {
    describe('addpage()', function () {
        it('should insert page', function () {
            containerService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var container = data[0];
                }
                var page = {
                    "title": "Test 00",
                    "containers": [container._id]
                }

                pageService.insert(page, (err, page) => {
                    if (err) {
                        assert.isNotOk("error");
                    }
                    assert.isOk("page added successfully");
                });
            });
        });
    });

    describe('listpages()', function () {
        it('should list array of pages', function () {
            pageService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    assert.isOk("List page(s) successfully");
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('updatepage()', function () {
        it('should update page', function () {
            pageService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var page = data[0];
                    page.title = "Testing page";
                    pageService.update(data[0], page, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Update page successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('deletepage()', function () {
        it('should delete page', function () {
            pageService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var page = data[0];
                    pageService.delete(page, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Delete page successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });
});