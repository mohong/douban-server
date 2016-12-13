/**
 * 爬取正在热映
 * Created by mohong on 2016/12/12.
 */

var request = require('request');
var parseNowPlaying = require('./parse_nowplaying');
var EventProxy = require('eventproxy');
var client = require('./redis/client');
var parseMovie = require('./parse_movie');
var MovieModel = require('../app/models/movie');

var needFetchId = [];

var ep = new EventProxy();

var url = 'https://movie.douban.com/nowplaying/beijing/';

request(url,function (err,response,body) {
	if (!err && response.statusCode == 200){
		parseNowPlaying(body,function (arr) {
			ep.emit('arr',arr);
		});
	}
});

ep.all('arr',function (arr) {
	arr.forEach(function (id) {
		client.exists(id,function (err,result) {
			result = (result === 1 ? true : false);
			if (result) {
				console.log(id+'已经存在');
			} else {
				needFetchId.push(id);
			}
		});
	});
});

var timer = setInterval(function () {
	if (needFetchId != '') {
		var i = 0;
		var timer2 = setInterval(function () {
			getDetail(needFetchId[i++]);
			if (i == needFetchId.length) {
				clearInterval(timer2);
			}
		},5000);
		clearInterval(timer);
	}
},1000);



function getDetail(id) {
	url = 'https://movie.douban.com/subject/' + id;
	request(url,function (err,response,body) {
		if (!err && response.statusCode == 200){
			parseMovie(body,function (movie) {
				MovieModel.addMovie(movie,function (err,result) {
					console.log('add success');
					client.set(id,'');
				});
			});
		}
	});
}

