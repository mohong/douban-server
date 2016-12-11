/**
 * 解析得到电影url
 * 一次获得20个url
 * Created by mohong on 2016/11/18.
 */
var cheerio = require('cheerio');

module.exports = function (body,callback) {
    var urls = [];
    var $ = cheerio.load(body);
    $('#content .article div table').each(function () {
	      var url = ($('tr td a',this).attr('href'));
	      urls.push(url);
    });
		callback(urls);
};