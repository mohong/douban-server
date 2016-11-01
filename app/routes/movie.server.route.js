/**
 * 电影路由
 * Created by mohong on 2016/11/1.
 */
var request = require('request');

var model = require('../models/movie.server.models');
var MovieController = require('../controller/movie.server.controller');

module.exports = function (app) {
    app.get('/test', function(req, res){
        request('https://movie.douban.com/subject/26433966/', function (error, response, body) {
            if (!error && response.statusCode == 200) {
               var data = model(body);
                MovieController.add(data.actors,data.title,data.director,data.rate,data.released);
                res.send('爬虫已经启动……');
            }
        });
    });
};

