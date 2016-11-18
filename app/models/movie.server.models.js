/**
 * 电影模型
 * 返回数据模型
 * Created by mohong on 2016/11/1.
 */
var cheerio = require('cheerio');

module.exports = function (body) {
    var $ = cheerio.load(body);
    var title = $('#content h1 span').text();   //电影名称

    var spans = $('#info');

    var director = $('span.attrs',spans).eq(0).text();  //导演
    var writer = $('span.attrs',spans).eq(1).text();  //编剧
    var actors = $('span.attrs',spans).eq(2).text();  //编剧
    var types = $('span[property="v:genre"]',spans);

    var classify = [] ;                                  //分类： 喜剧、动作
    for(var i=0; i<types.length; i++){
        classify.push($('span[property="v:genre"]',spans).eq(i).text());
    }
    classify = classify.toString();

    var country = $('#info span.pl')[4].next.data;   //制片国家/地区

    var language = $('#info span.pl')[5].next.data;    //语言


    var released = $('span[property="v:initialReleaseDate"]',spans).eq(0).text(); //上映日期
    var duration = $('span[property="v:runtime"]',spans).text(); //片长
    var interest_sectl = $('#interest_sectl');
    var rate = $('strong[property="v:average"]',interest_sectl).text();  //平均评分

    var starClass = $('#interest_sectl div.rating_right').children()[0].attribs.class;
    var stars = starClass.substr(10,2);                         //星级指数
    var type = $('div span.rec a')[0].attribs['data-type'];            // 类型： 电视剧、电影
    var link = $('div span.rec a')[0].attribs['data-url'];         //豆瓣链接

    var post = $('#mainpic a img')[0].attribs.src;

    var douban_id = link.slice(link.indexOf('/')+27,link.lastIndexOf('/'));

    return  {
        'douban_id': douban_id, //豆瓣的电影id
        'title': title,      //电影名称
        'director': director,   //导演
        'writer': writer,     //编剧
        'actors': actors,     //主演
        'type': type,       //类型  电影、电视剧
        'country': country,    //制片国家/地区
        'language': language,   //语言
        'released': released,   //上映日期
        'duration': duration,   //片长
        'rate': rate,         //平均评分
        'star': stars,       //星级指数
        'link': link,        //豆瓣链接
        'post': post,         //海报
        'classify': classify   //分类，喜剧、爱情
    }
};