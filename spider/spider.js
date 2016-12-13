/**
 * 所有的爬虫
 * Created by mohong on 2016/12/13.
 */

var nowplaying = require('./nowplaying');
var comingsoon = require('./comingsoon');

module.exports = function () {
	setInterval(function () {
		nowplaying();
		console.log('正在爬取nowplaying,时间：'+Date());
	},7200000); //2小时运行一次
	
	setInterval(function () {
		comingsoon();
		console.log('正在爬取comingsoon,时间：'+Date());
	},10800000); //3小时运行一次
	
};