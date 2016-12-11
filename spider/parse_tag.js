/**
 * Created by mohong on 2016/11/18.
 */
var cheerio = require('cheerio');

module.exports = function (body,callback) {
    var $ = cheerio.load(body);
    var tags = [];
    $('#content table a').each(function () {
        tags.push($(this).text());
    });
		console.log('已获取所有标签,共'+tags.length+'个');
    callback(tags);
};

