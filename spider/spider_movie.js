/**
 * 爬取电影数据
 * Created by mohong on 2016/11/17.
 */

var request = require('request');
var Parse = require('./parse_movie');

var url = 'https://movie.douban.com/subject/24751756/';
request(url,function (err,response,body) {
    if (!err && response.statusCode == 200){
        var movie = Parse.movie(body);
        console.log(movie);
    }
});