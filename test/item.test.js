const assert = require('chai').assert;
const camo = require('camo');
const mongoose = require('mongoose');
const itemService = require('../service/item.service');

describe('Items', function () {
    // before(function (done) {
    //     mongoose.connect('mongodb://localhost:27017/app_test');
    //     mongoose.connection.on('connected', function () {
    //         console.log('Mongoose connected');
    //         done();
    //     });
    //     mongoose.connection.on('error', function (err) {
    //         console.log('Mongoose connection error ' + err);
    //         done();
    //     });
    //     mongoose.connection.on('disconnected', function () {
    //         console.log('Mongoose disconnected ');
    //         done();
    //     });
    // });

    describe('additem()', function () {
        it('should insert item', function () {
            var item = {
                "title": "Test00",
                "organisedBy": "Ayush Mittal",
                "price": 10000,
                "place": "Leh",
                "type": "hotel"
            };

            itemService.insert(item, (err, item) => {
                if (err) {
                    assert.isNotOk("error");
                }
                assert.isOk("Item added successfully");
            });

        });
    });

    describe('listitems()', function () {
        it('should list array of items', function () {
            itemService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    assert.isOk("List item(s) successfully");
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('updateitem()', function () {
        it('should update item', function () {
            itemService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var item = data[0];
                    item.title = "Testing Item";
                    itemService.update(data[0], item, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Update item successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('deleteitem()', function () {
        it('should delete item', function () {
            itemService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var item = data[0];
                    itemService.delete(item, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Delete item successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });
});