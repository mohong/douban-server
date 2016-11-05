/**
 * 通过年份 标签获取电影详情link,和年份对应的页数
 * 一个url20个电影link
 * Created by mohong on 2016/11/1.
 */

var cheerio = require('cheerio');

module.exports = function (body) {
    var links = [];
    var $ = cheerio.load(body);
    var tables = $('#content .article div table').toArray();
    var content = $('#content');
    var pagesize = $('span.thispage',content).attr('data-total-page');
    for(var key in tables){
        var table = tables[key];
        var link = $('a.nbg',table).attr('href');
        links.push(link);
    }

    return {'url':links,'pagesize':pagesize};
};