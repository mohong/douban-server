/**
 * Created by mohong on 2016/12/11.
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var ParseTag = require('./parse_tag');
var arr = [];
var toggle = false;
var currentPageId = 0;
var totalPages = 0;

getTags(getTotalPageSize);

var timer = setInterval(function () {
	if (toggle){
		if (currentPageId == totalPages) {
			 clearInterval(timer);
		} else {
			getPageUrl(currentPageId++);
		}
	}
},10);

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
				if (i<3) {
					totalPages += totalPage;
				}
				console.log('getTotalPageSize函数:',tags[i],totalPage);
				arr.push(obj);
			}
		});
		i++;
		if (i == 3) {    //tags.length
				toggle = true;
				console.log(totalPages);
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
		console.log('总页码的第'+currentPageId+'页，标签:'+tag+',当前标签的页数:'+pagesize+',当前标签的页码的url:'+pageUrl);
}
