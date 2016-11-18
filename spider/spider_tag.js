/**
 * 爬取电影标签
 * Created by mohong on 2016/11/18.
 */
var request = require('request');
var fs = require('fs');
var url = 'https://movie.douban.com/tag/';
var ParseTag = require('./parse_tag');

request(url,function (err,response,body) {
    if (!err && response.statusCode == 200){
        ParseTag(body,saveMovie);
    }
});


//向硬盘写入标签数据
function saveMovie(data) {
    var path = __dirname+'/../data/movie/tag.txt';
    fs.appendFile(path,data,'utf8',function (err) {
        if (err){
            throw err;
        }else {
            console.log('写入成功~');
        }
    })
};