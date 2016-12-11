/**
 * Created by mohong on 2016/12/11.
 */

var parseMovie = require('../spider/parse_movie');
var MovieModel = require('../app/models/movie');

var request = require('request');

var pageUrl = 'https://movie.douban.com/subject/3266509/';
getMovieUrl(pageUrl);

function getMovieUrl(pageUrl) {
	request(pageUrl,function (err,response,body) {
		if (!err && response.statusCode == 200){
			parseMovie(body,function (movie) {
					MovieModel.addMovie(movie,function (err,result) {
							console.log('add success');
					});
			});
		}
	});
}