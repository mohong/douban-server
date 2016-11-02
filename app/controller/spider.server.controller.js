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
     * 传给一个年份，得到本年度的所有电影的url，存入数据库
     * parselink.server.model用了两次，
     * 第一次是为了得到每个标签有多少页，
     * 第二次是为了得到每页的20个条目对应的详情url
     */
    getUrlByYear: function (year) {
        var getpagesizeurl = 'https://movie.douban.com/tag/'+year;
        //目的是得到一个年份有多少页(pagesize)
        request(getpagesizeurl, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var taglink = parseLink(body); //taglink = {'url':url,'pagesize':pagesize}
                for(var i=0; i<taglink.pagesize; i++){   //taglink.pagesize
                    (function (year,i) {
                        var baseUrl = 'https://movie.douban.com/tag/' + year + '?start='+i*20+'&type=T';
                        //目的是通过每页的url得到当前页的电影详情url
                        request(baseUrl, function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                var links = parseLink(body);
                                for(var key in links.url){
                                    (function (key) {
                                        var link = links.url[key];
                                        console.log(link);
                                        //console.log(baseUrl,link);
                                        ParseLinkController.add(link);
                                    })(key);
                                }
                            }
                        });
                    })(year,i);
                }
            }
        });
    }
};