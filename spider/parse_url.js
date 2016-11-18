/**
 * 解析得到电影url
 * 一次获得20个url
 * Created by mohong on 2016/11/18.
 */
var cheerio = require('cheerio');

module.exports = function (body,callback) {
    var urls = [];
    var $ = cheerio.load(body);
    var tables = $('#content .article div table').toArray();
    var content = $('#content');
    //var pagesize = $('span.thispage',content).attr('data-total-page');
    for(var key in tables){
        var table = tables[key];
        var link = $('a.nbg',table).attr('href');
        urls.push(link);
    }
    // return {'url':links,'pagesize':pagesize};

    callback(urls,urls.join('\r\n')+'\r\n');
};