/**
 * Created by mohong on 2016/12/13.
 */

var idFilter = require('../spider/redis/idFilter');

var id = 1293929;

idFilter(id,function (data) {
	console.log(data)
})