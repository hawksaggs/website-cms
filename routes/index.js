var express = require('express');
var router = express.Router();

var pageController = require('../controllers/page');
var itemController = require('../controllers/item');
var containerController = require('../controllers/container');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/items', itemController.list);
router.post('/items', itemController.insert);
router.put('/items/:itemId', itemController.update);
router.delete('/items/:itemId', itemController.delete);
router.get('/items/:itemId', itemController.getById);

router.get('/pages', pageController.list);
router.post('/pages', pageController.insert);
router.put('/pages/:pageId', pageController.update);
router.delete('/pages/:pageId', pageController.delete);
router.get('/pages/:pageId', pageController.getById);

router.get('/containers', containerController.list);
router.post('/containers', containerController.insert);
router.put('/containers/:containerId', containerController.update);
router.delete('/containers/:containerId', containerController.delete);
router.get('/containers/:containerId', containerController.getById);

router.param('itemId', itemController.findById);
router.param('pageId', pageController.findById);
router.param('containerId', containerController.findById);

module.exports = router;