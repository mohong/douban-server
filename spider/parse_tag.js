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
    callback(tags);
};

