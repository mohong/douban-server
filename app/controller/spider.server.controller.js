/**
 * 爬虫后端控制器
 * Created by mohong on 2016/11/1.
 */
var request = require('request');
var model = require('../models/movie.server.models');
var MovieController = require('./movie.server.controller');
var parseLink = require('../models/parselink.server.model');
var ParseLinkController = require('./parselink.server.controller');

module.exports = {
    /*
     *通过详情页url获得电影详情信息
     */
    getDetail:function (url) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = model(body);
                MovieController.add(data.douban_movie_id,data.title,data.director,data.writer,data.actors,data.type,data.country,data.language,data.released,data.duration,data.rate,data.star,data.link);
            }
        });
    },

    /*
     *通过url获得电影链接
     */
    getId: function (url) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var links = parseLink(body);
                for(key in links){
                    var link = links[key];
                    ParseLinkController.add(link);
                }
            }
        });
    }
};