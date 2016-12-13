/**
 * 将mongodb中的所有电影的id缓存至redis中
 * Created by mohong on 2016/12/13.
 */

var client = require('./client');
var MovieModel = require('../../app/models/movie');

MovieModel.getMovies({},{},function (err,result) {
		result.forEach(function (item) {
				console.log(item['db_id'],'');
				client.set(item['db_id'],'');
		});
});


//  client.set(item['db_id']);
// client.get('dou',function (err,data) {
// 		console.log(data);
// });
//
// client.quit();
