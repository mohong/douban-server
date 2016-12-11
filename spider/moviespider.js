/**
 * Created by mohong on 2016/12/11.
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var ParseTag = require('./parse_tag');
var parsePageUrl = require('./parse_page_url');
var parseMovie = require('./parse_movie');
var MovieModel = require('../app/models/movie');

var arr = [];     //存放标签和对应的总页数
var toggle = false;
var currentPageId = 0;
var totalPages = 0;

var allMovieUrlToggle = false;
var allMovieUrl = [];
var allMovieUrlId = 0;


getTags(getTotalPageSize);

var timer = setInterval(function () {
	if (toggle){
		if (currentPageId == totalPages) {
			 clearInterval(timer);
		} else {
			getPageUrl(currentPageId++);
		}
	}
},17000);


var timer2 = setInterval(function () {
	if (allMovieUrlToggle) {
		if (allMovieUrl[allMovieUrlId]){
			try{
				getDetail(allMovieUrl[allMovieUrlId++]);
			} catch (e){
				console.log(e);
			}
		}else {
			clearInterval(timer2);
		}
	}
},5000);


// 1 爬取所有标签,得到标签数组
function getTags(callback) {
	var url = 'https://movie.douban.com/tag/';
	request(url,function (err,response,body) {
		if (!err && response.statusCode == 200){
			ParseTag(body,callback);
		}
	});
}

// 2 输入一个标签数组，每5S发送一次请求，获取每个标签的总页数，得到存放object的数组
function getTotalPageSize(tags) {
	var i = 0;
	var PageSizeTimer = setInterval(function () {
		var url = 'https://movie.douban.com/tag/'+encodeURI(tags[i]);
		request(url,function (err,response,body) {
			if (!err && response.statusCode == 200){
				var $ = cheerio.load(body);
				var totalPage = parseInt($('.paginator .thispage').attr('data-total-page'));
				var obj = {};
				obj['tag'] = tags[i];
				obj['totalPage'] = totalPage;
				totalPages += totalPage;
				console.log('getTotalPageSize函数:',tags[i],totalPage);
				arr.push(obj);
			}
		});
		i++;
		if (i == tags.length) {    //tags.length
				toggle = true;
				clearInterval(PageSizeTimer);
		}
	},5000);
}

//3 遍历存放对象的数组,得到每个标签的每一页的url
function getPageUrl(currentPageId) {
		var sum = 0;
		var tag = null;
		var pageid = 0;
		for (var i=0; i<arr.length; i++) {
				pageid = arr[i]['totalPage'];
				sum += pageid;
				if (sum > currentPageId) {
						tag = arr[i]['tag'];
						break;
				}
		}
		var pagesize = currentPageId - (sum - pageid);
		var pageUrl = 'https://movie.douban.com/tag/'+encodeURI(tag) + '?start='+pagesize * 20+'&type=T';
		//console.log('总页码的第'+currentPageId+'页，标签:'+tag+',当前标签的页数:'+pagesize+',当前标签的页码的url:'+pageUrl);
		getMovieUrl(pageUrl);
}

// 4 输入一个页码的url，获取当前页的电影详情url（小于等于20个）
function getMovieUrl(pageUrl) {
	request(pageUrl,function (err,response,body) {
		if (!err && response.statusCode == 200){
			parsePageUrl(body,urlToArray);
		}
	});
}
// 5 遍历20个url的数组，存入全局数组 allMovieUrl
function urlToArray(array) {
	 for (var i=0; i<array.length; i++) {
		 allMovieUrl.push(array[i]);
	 }
		allMovieUrlToggle = true;
	 console.log('allMovieUrl数组的长度'+allMovieUrl.length+',当前的id为：'+allMovieUrlId);
}

// 6 遍历allMovieUrl数组，每5S发送一次请求，获取详情。
function getDetail(url) {
	request(url,function (err,response,body) {
		if (!err && response.statusCode == 200){
			parseMovie(body,function (movie) {
					MovieModel.addMovie(movie,function (err,result) {
					console.log('add success: '+url);
				});
			});
		}
	});
}
