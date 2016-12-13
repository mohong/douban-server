/**
 * 电影控制器
 * Created by mohong on 2016/11/20.
 */
var MovieModel = require('../models/movie');
var redisClient = require('../../redis_helper');
var EventProxy = require('eventproxy');
var ep = EventProxy();

exports.detail = function (req,res) {
    var movieId = req.params.mid;
    MovieModel.getMovie(movieId,function (err,movie) {
        res.send(movie);
    })
};

exports.search = function (req,res) {
		var title = req.params.title;
		var page = parseInt(req.query.page) || 1;
		page = page > 0 ? page : 1;
		var count = 10;
		var option = {
			skip: (page-1)*count,
			limit: count,
		};
		MovieModel.searchMovie(title,option,function (err,movies) {
			if (movies && movies != '') {
				res.send(movies);
			}	else {
				res.send('无相关资源');
			}
		})
};

exports.nowplaying = function (req,res) {
	redisClient.lrange('nowplaying',0,-1,function (err,nowplaying) {
		nowplaying.forEach(function (id) {
			MovieModel.getMovie(id,function (err,movie) {
				ep.emit('movies',movie);
			})
		})
		ep.after('movies',nowplaying.length,function (result) {
			console.log('movies'+result);
			res.send(result);
		})
	});
};