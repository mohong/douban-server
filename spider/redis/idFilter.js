/**
 * 传入一个id，判断其是否在redis中
 * Created by mohong on 2016/12/13.
 */
var client = require('./client');

module.exports = function (id,callback) {
	client.exists(id,function (err,result) {
		result = (result === 1 ? true : false);
		callback(result);
	});
	
	client.quit();
};