/**
 * 根据标签爬取电影的url
 * Created by mohong on 2016/11/18.
 */

var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var ParseUrl = require('./parse_url');


//读取标签文件

var path = __dirname+'/../data/movie/tag.txt';
var totalPage = 0;
var url = null;
fs.readFile(path,'utf8',function (err,data) {
    if (err){
        throw err;
    }else {
        var tags = data.split(',');
	      var num = 0;
        var timerTag = setInterval(function () {
	          var tag = tags[num];
	          num ++;
	        
	          //get tag then do something
		        url = 'https://movie.douban.com/tag/'+encodeURI(tag);
		        request(url,function (err,response,body) {
			        if (!err && response.statusCode == 200){
				        var $ = cheerio.load(body);
				        totalPage = $('.paginator .thispage').attr('data-total-page');
				        
					        //get totalpage then do something
					        console.log(tag,totalPage);
					        var pageurl = null;
				          var i = 0;
					        var timer = setInterval(function () {
						        pageurl = 'https://movie.douban.com/tag/'+encodeURI(tag) + '?start='+i * 20+'&type=T';
						        writeEveryPageUrl(tag,pageurl + '\r\n');
						        i++;
						        if (i == totalPage) {
							          clearInterval(timer);
						        }
					        },10);
					          
				        }
				    
		        });
	        
	        
	          if (num == tags.length) {
		            clearInterval(timerTag);
	          }
        },50000);
    }
});



//给一个url，解析当前页的电影详情url，能得到20个电影url
function parseurl(url) {
    request(url,function (err,response,body) {
        if (!err && response.statusCode == 200){
            ParseUrl(body,saveUrl);
        }
    });
}

//把url写入url文本文件
function writeEveryPageUrl(tag,data) {
    var path = __dirname+'/../data/movie/everypageurl.txt';
    if(data) {
        fs.appendFile(path, data, 'utf8', function (err) {
            if (err) {
                throw err;
            } else {
                console.log(tag+'写入成功~');
            }
        });
    }else {
        console.log('over');
    }
}