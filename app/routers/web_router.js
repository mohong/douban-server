/**
 * 路由
 * Created by mohong on 2016/11/19.
 */
var express = require('express');
var router = express.Router();
var siteController = require('../controllers/site');

//显示电影列表
router.get('/',siteController.index);

//显示电影详情
router.get('/movie/:id',function (req,res) {

});

module.exports = router;
