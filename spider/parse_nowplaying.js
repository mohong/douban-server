/**
 * Created by mohong on 2016/12/12.
 */

var cheerio = require('cheerio');

module.exports = function (body,callback) {
		var arr = [];
		var $ = cheerio.load(body);
		$('#nowplaying .mod-bd ul.lists li.list-item').each(function () {
				var db_id = $(this).attr('id');
				arr.push(db_id);
		});
		callback(arr);
};