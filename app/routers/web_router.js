/**
 * 路由
 * Created by mohong on 2016/11/19.
 */
var express = require('express');
var router = express.Router();
var siteController = require('../controllers/site');
var movieController = require('../controllers/movie');

//显示电影列表
//router.get('/movie',siteController.index);

//显示电影详情
router.get('/movie/subject/:mid',movieController.detail);

//模糊查询电影名称
router.get('/movie/search/:title',movieController.search);

//正在热映
router.get('/movie/nowplaying',movieController.nowplaying);

//即将上映
router.get('/movie/comingsoon',movieController.comingsoon);

module.exports = router;
