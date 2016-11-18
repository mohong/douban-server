/**
 * 爬取电影数据详情
 * Created by mohong on 2016/11/17.
 */

var request = require('request');
var Parse = require('./parse_movie');
var fs = require('fs');


//var url = 'https://movie.douban.com/subject/25815034/';


function newGetDetail(url) {
    console.log(url);
    request(url,function (err,response,body) {
        if (!err && response.statusCode == 200){
            Parse.parseMovie(body,saveMovie);
        }
    });
}


//向硬盘写入电影数据
function saveMovie(data) {
    var path = __dirname+'/../data/movie/movie.txt';
    fs.appendFile(path,data,'utf8',function (err) {
        if (err){
            throw err;
        }else {
            console.log('写入成功~');
        }
    })
};

module.exports = newGetDetail;