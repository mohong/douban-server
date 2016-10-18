/**
 * 爬虫，爬取豆瓣电影网页信息
 * Created by mohong on 2016/10/18.
 */

'use strict';

const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const moviedao = require('../server/dao/moviedao');


//需要爬取的网页，此处变更，需要同时改动switch中的case；
function getUrl() {
    let urls = [
        "https://movie.douban.com/nowplaying/beijing/",  //正在上映
        "https://movie.douban.com/later/beijing/",        //即将上映
    ];

    let baseUrl = 'https://movie.douban.com/top250?start=';  //top250
    for (let i = 0; i<=100; i += 25){
        let url = baseUrl + i + "&filter=";
        urls.push(url);
        if (i = 100){
            console.log('top250 数据抓取完成');
        }
    }
    return urls;
}

let urls = getUrl();

//控制并发量
async.forEach(urls,(url) => {
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
            //不同的url选择不同的解析函数
            switch (options.url){
                case 'https://movie.douban.com/nowplaying/beijing/':
                    nowPlayingData(options.url,body);
                    break;
                case 'https://movie.douban.com/later/beijing/':
                    showingSoon(options.url,body);
                    break;
                default:
                    top250(options.url,body);
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
        let status = 'nowplaying';
        //将数据保存至mysql中
        moviedao.addMovie(post,title,rate,link,status);
        console.log('nowplaying 数据抓取完成');
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
        let status = 'showingSoon'
        //将数据保存至mysql中
        moviedao.addMovie(post,title,null,link,status);
        console.log('showingSoon 数据抓取完成');
    }
}

//解析排行榜页面
function top250(error,data) {
    let $ = cheerio.load(data);
    let lis = $('.grid_view').children().toArray();
    for (let key in lis){
        let li = lis[key];

        let post = $('div>a>img',li).attr('src');
        let title = $('.info .hd a',li).children().first().text();
        let link = $('.info .hd a',li).attr('href');
        let rate = $('.info .bd div .rating_num',li).text();
        let status = 'top250'
        //将数据保存至mysql中
        moviedao.addMovie(post,title,rate,link,status);
        console.log('top250 抓取中。。。。。。');
    }
}
