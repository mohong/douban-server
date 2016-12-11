/**
 * Created by mohong on 2016/12/11.
 */

var ParsePageUrl = require('./parse_page_url');

var request = require('request');

var pageUrl = 'https://movie.douban.com/tag/%E5%96%9C%E5%89%A7?start=7600&type=T';
getMovieUrl(pageUrl);

function getMovieUrl(pageUrl) {
	request(pageUrl,function (err,response,body) {
		if (!err && response.statusCode == 200){
			ParsePageUrl(body);
		}
	});
}