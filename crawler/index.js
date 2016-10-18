/**
 * 爬虫，爬取豆瓣电影网页信息
 * Created by mohong on 2016/10/18.
 */

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const moviedao = require('../server/dao/moviedao');


//需要爬取的网页

function getUrl() {
    let urls = [
        "https://movie.douban.com/nowplaying/beijing/",  //正在上映
       // "https://movie.douban.com/later/beijing/",       //即将上映
       // "https://movie.douban.com/chart"                 //排行榜
    ];
    return urls;
}

let urls = getUrl();

//控制并发量
async.eachSeries(urls,(url) => {
    fetchUrl(url);
});


//抓取网页内容
function fetchUrl(url) {
    let options = {
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36',
            'Connection':'keep-alive'
        }
    };

    request(options,(error,response,body)=>{
        if (!error && response.statusCode == 200){
            acquireData(options.url,body);
        }
    })
}

//解析网页获取数据
function acquireData(error,data) {
    let $ = cheerio.load(data);
    let nowplaying = $('#nowplaying');
    let lisItems = $('.list-item',nowplaying).toArray();

    for (let key in lisItems){
        let listItem = lisItems[key];

        let post = $('img',listItem).attr('src');
        let title = $('a',$('.stitle',listItem)).text();
        let link = $('a',$('.stitle',listItem)).attr('href');
        let rate = $('.subject-rate',$('.srating',listItem)).text();

        console.log(post);
        console.log(title);
        console.log(rate);
        console.log(link);
    }

}
