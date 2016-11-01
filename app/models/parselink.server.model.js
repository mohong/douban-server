/**
 * 通过年份 标签获取电影详情link
 * 一个url20个电影link，
 * Created by mohong on 2016/11/1.
 */

var cheerio = require('cheerio');

module.exports = function (body) {
    var links = [];
    var $ = cheerio.load(body);
    var tables = $('#content .article div table').toArray();
    for(var key in tables){
        var table = tables[key];
        var link = $('a.nbg',table).attr('href');
        links.push(link);
    }
    return links;
};