/**
 * 连接mongodb
 * Created by mohong on 2016/11/19.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/douban');

module.exports = mongoose;