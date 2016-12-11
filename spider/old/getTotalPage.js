/**
 * 获取每个标签的总页数
 * Created by mohong on 2016/12/10.
 */



module.exports = function (tag) {
		
};

function pingPageUrl(tag,totalPage) {
	var page = 0;
	var url = null;
	var timer = setInterval(function () {
		console.log(tag+'标签的所有url');
		url = 'https://movie.douban.com/tag/'+encodeURI(tag) + '?start='+page * 20+'&type=T';
		page ++;
		if (page == totalPage) {
				clearInterval(timer);
		}
	},50);
	
}