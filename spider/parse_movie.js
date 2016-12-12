/**
 * 解析电影页面
 * Created by mohong on 2016/11/17.
 */
var cheerio = require('cheerio');

var parse = {
    parseMovie: function (body,callback) {
        var $ = cheerio.load(body);

        var title_temp = $('#content h1 span').text();
        //电影名称
        var title = title_temp.substr(0,title_temp.indexOf('('));

        //导演
        var director = [];
            $('#info span.attrs a[rel="v:directedBy"]').each(function () {
                var director_temp = {};
                var baseUrl = $(this).attr('href')
                director_temp.name = $(this).text();
                director_temp.id = baseUrl.substring(baseUrl.indexOf('/')+11,baseUrl.lastIndexOf('/'));
                director.push(director_temp);
            });

        //编剧
        var writer = [];
            var elem_as = $('#info span.attrs').eq(1);
            $('a',elem_as).each(function () {
                var writer_temp = {};
                var baseUrl = $(this).attr('href');
                writer_temp.name = $(this).text();
                writer_temp.id = baseUrl.substring(baseUrl.indexOf('/')+11,baseUrl.lastIndexOf('/'));
                writer.push(writer_temp);
            });

        //主演
        var actors = [];
        $('#info span.actor span.attrs a').each(function () {
            var actor = {};
            var baseUrl = $(this).attr('href');
            actor.name = $(this).text();
            actor.id = baseUrl.substring(baseUrl.indexOf('/')+11,baseUrl.lastIndexOf('/'));
            actors.push(actor);
        });

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
        var star = null;
	          var star_condtion = $('#interest_sectl div.rating_right').children()[0];
	          if (star_condtion){
		          star = $('#interest_sectl div.rating_right').children()[0].attribs.class.substr(10,2);
	          }
	          
        //评价人数
        var ratenum = $('#interest_sectl div.rating_right a span[property="v:votes"]').text();
	    
        //分类： 电视剧、电影
        var type = null;
	          var comm_condition = $('div span.rec a')[0];
	          if (comm_condition) {
		          type = $('div span.rec a')[0].attribs['data-type'];
	          }
	          
        //链接
        var link = null;
	          if (comm_condition) {
		          link = $('div span.rec a')[0].attribs['data-url'];
	          }
	          
        //海报
        var post = null;
	          if (comm_condition) {
		            post = $('#mainpic a img')[0].attribs.src;
	          }
	          
        //豆瓣id
        var db_id = (link == null ? null : link.slice(link.indexOf('/')+27,link.lastIndexOf('/')));
	      //剧情简介
	      var related_info = $('.related-info span[property="v:summary"]').text().trim();
	      //剧照
	      var related_pic = [];
	        $('#related-pic ul li').each(function () {
		        var pic = $('a img',this).attr('src');
		        related_pic.push(pic);
	        });


        //电影数据

        var movie = {
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
            db_id: db_id,
	          related_pic: related_pic,
	          related_info: related_info
        };
	    
	      callback(movie);
        
    }
};

module.exports = parse.parseMovie;