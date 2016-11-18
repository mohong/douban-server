/**
 * 解析电影页面
 * Created by mohong on 2016/11/17.
 */
var cheerio = require('cheerio');

var parse = {
    movie: function (body) {
        var $ = cheerio.load(body);
        //电影名称
        var title = $('#content h1 span').text();
        //导演
        var director = $('#info span.attrs').eq(0).text();
        //编剧
        var writer = $('#info span.attrs').eq(1).text();
        //主演
        var actors = [];
        $('#info span.attrs a').each(function () {
            actors.push($(this).text());
        })
        //类型: 喜剧、动作...
        var genre = [];
            $('#info span[property="v:genre"]').each(function () {
               genre.push($(this).text());
            });

        var res = $('#info').contents()
            .filter(function() {
                return this.nodeType == 3;
            }).text();
        var reg = new RegExp('\n', 'g');  //匹配回车符
        var str = res.replace(reg,'').replace(/\//g,'').toString();  //替换回车符为""，再转为string类型
        var arr = str.split(' ');  //将字符串每个字符转换为数组的元素
        var result = [];
        for (var i=0; i<arr.length; i++) {
            if (arr[i] !== '') {  //判断非空元素插入到result数组
                result.push(arr[i])
            }
        }
        //制片国家/地区
        var madeIn = result[0];
        //语言
        var language = result[1];
        //上映日期
        var releaseDate = $('#info span[property="v:initialReleaseDate"]').text();
        //片长
        var runtime = $('#info span[property="v:runtime"]').text();
        //评分
        var rate = $('#interest_sectl strong[class="ll rating_num"]').text();
        //星级数
        var star = $('#interest_sectl div.rating_right').children()[0].attribs.class.substr(10,2);
        //评价人数
        var ratenum = $('#interest_sectl div.rating_right a span[property="v:votes"]').text();
        //分类： 电视剧、电影
        var type = $('div span.rec a')[0].attribs['data-type'];
        //链接
        var link = $('div span.rec a')[0].attribs['data-url'];
        //海报
        var post = $('#mainpic a img')[0].attribs.src;
        //豆瓣id
        var db_id = link.slice(link.indexOf('/')+27,link.lastIndexOf('/'));

        return {
            title: title,
            director: director,
            writer: writer,
            actors: actors,
            genre: genre,
            madeIn: madeIn,
            language: language,
            releaseDate: releaseDate,
            runtime: runtime,
            rate: rate,
            star: star,
            ratenum: ratenum,
            type: type,
            link: link,
            post: post,
            db_id: db_id
        }
    }
};

module.exports = parse;