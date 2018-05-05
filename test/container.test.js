const assert = require('chai').assert;
const mongoose = require('mongoose');
const containerService = require('../service/container.service');

describe('containers', function () {
    var database = null;

    before(function (done) {
        mongoose.connect('mongodb://localhost:27017/app_test');
        mongoose.connection.on('connected', function () {
            console.log('Mongoose connected');
            done();
        });
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose connection error ' + err);
            done();
        });
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose disconnected ');
            done();
        });
    });

    describe('addcontainer()', function () {
        it('should insert container', function () {
            var container = {
                "title": "Test00",
                "description": "Test Description",
                "noOfColumns": 4,
                "noOfRows": 2
            }

            containerService.insert(container, (err, container) => {
                if (err) {
                    assert.isNotOk("error");
                }
                assert.isOk("container added successfully");
            });

        });
    });

    describe('listcontainers()', function () {
        it('should list array of containers', function () {
            containerService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    assert.isOk("List container(s) successfully");
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('updatecontainer()', function () {
        it('should update container', function () {
            containerService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var container = data[0];
                    container.title = "Testing container";
                    containerService.update(data[0], container, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Update container successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });

    describe('deletecontainer()', function () {
        it('should delete container', function () {
            containerService.list((err, data) => {
                if (err) {
                    assert.isNotOk("error");
                }
                if (data && data.length) {
                    var container = data[0];
                    containerService.delete(container, (err, data) => {
                        if (err) {
                            assert.isNotOk("error");
                        }

                        assert.isOk("Delete container successfully");
                    });
                } else {
                    assert.isNotOk("Empty array");
                }
            })
        });
    });
});