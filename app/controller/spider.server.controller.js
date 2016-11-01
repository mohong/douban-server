/**
 * 爬虫后端控制器
 * Created by mohong on 2016/11/1.
 */
var request = require('request');
var model = require('../models/movie.server.models');
var MovieController = require('./movie.server.controller');

module.exports = {
    getDetail:function (url) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = model(body);
                MovieController.add(data.douban_movie_id,data.title,data.director,data.writer,data.actors,data.type,data.country,data.language,data.released,data.duration,data.rate,data.star,data.link);
            }
        });
    }
};

//'https://movie.douban.com/subject/26433966/'