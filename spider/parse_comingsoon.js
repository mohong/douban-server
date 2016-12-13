/**
 * Created by mohong on 2016/12/12.
 */

var cheerio = require('cheerio');

module.exports = function (body,callback) {
		var arr = [];
		var $ = cheerio.load(body);
		$('#showing-soon .intro h3 a').each(function () {
				var db_id = $(this).attr('href');
				db_id = db_id.split('/')[4];
				arr.push(db_id);
		});
		callback(arr);
};