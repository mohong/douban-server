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
        "https://movie.douban.com/later/beijing/",        //即将上映
        //"https://movie.douban.com/chart"                 //排行榜
    ];
    return urls;
}

let urls = getUrl();

//控制并发量
async.forEach(urls,(url) => {
    fetchUrl(url);
    //console.log(url);
})

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
            //不同的url选择不同的解析函数
            switch (options.url){
                case 'https://movie.douban.com/nowplaying/beijing/':
                    nowPlayingData(options.url,body);
                    break;
                case 'https://movie.douban.com/later/beijing/':
                    showingSoon(options.url,body);
                    break;
                default:
                    break;
            }
        }
    })
}

//解析正在上映页面数据
function nowPlayingData(error,data) {
    let $ = cheerio.load(data);
    let nowplaying = $('#nowplaying');
    let lisItems = $('.list-item',nowplaying).toArray();
    for (let key in lisItems){
        let listItem = lisItems[key];

        let post = $('img',listItem).attr('src');
        let title = $('a',$('.stitle',listItem)).text();
        let link = $('a',$('.stitle',listItem)).attr('href');
        let rate = $('.subject-rate',$('.srating',listItem)).text();


        console.log('nowplaying=========================');
        console.log(post);
        console.log(title);
        console.log(rate);
        console.log(link);

    }

}

//解析即将上映页面数据
function showingSoon(error ,data) {
    let $ = cheerio.load(data);
    let divs = $('#showing-soon>div').toArray();
    for (let key in divs){
        let div = divs[key];

        let post = $('img',div).attr('src');
        let title = $('h3>a',div).text();
        let link = $('h3>a',div).attr('href');

        console.log('showingSoon====================');
        console.log(post);
        console.log(title);
        console.log(link);
    }
}


