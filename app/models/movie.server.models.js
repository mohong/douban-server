/**
 * 电影模型
 * 返回数据模型
 * Created by mohong on 2016/11/1.
 */
var cheerio = require('cheerio');

module.exports = function (body) {
    var $ = cheerio.load(body);
    var douban_movie_id = '1';
    var title = $('#content h1 span').text();   //电影名称

    var spans = $('#info');

    var director = $('span.attrs',spans).eq(0).text();  //导演
    var writer = $('span.attrs',spans).eq(1).text();  //编剧
    var actors = $('span.attrs',spans).eq(2).text();  //编剧
    var types = $('span[property="v:genre"]',spans);

    var type = [] ;                                  //类型
    for(var i=0; i<types.length; i++){
        type.push($('span[property="v:genre"]',spans).eq(i).text());
    }
    type = type.toString();

    //var country = $('span[class="pl"]',spans).eq(4).text();   //制片国家/地区 null
                                                                //语言 null

    var released = $('span[property="v:initialReleaseDate"]',spans).eq(0).text(); //上映日期
    var duration = $('span[property="v:runtime"]',spans).text(); //片长
                                                                 //又名 null
    var interest_sectl = $('#interest_sectl');
    var rate = $('strong[property="v:average"]',interest_sectl).text();  //平均评分
                                                                        //星级指数
                                                                        //豆瓣链接null

    return  {
        'douban_movie_id': douban_movie_id, //豆瓣的电影id
        'title': title,      //电影名称
        'director': director,   //导演
        'writer': writer,     //编剧
        'actors': actors,     //主演
        'type': type,       //类型
        'country': 'null',    //制片国家/地区
        'language': 'null',   //语言
        'released': released,   //上映日期
        'duration': duration,   //片长
        'rate': rate,       //平均评分
        'star': 'null',       //星级指数
        'link': 'null'        //豆瓣链接
    }
};