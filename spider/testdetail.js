/**
 * Created by mohong on 2016/12/11.
 */

var parseMovie = require('./parse_movie');

var request = require('request');

var pageUrl = 'https://movie.douban.com/subject/25964071/';
getMovieUrl(pageUrl);

function getMovieUrl(pageUrl) {
	request(pageUrl,function (err,response,body) {
		if (!err && response.statusCode == 200){
			parseMovie(body);
		}
	});
}