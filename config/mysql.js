/**
 * mysql配置信息
 * 导出一个连接池
 * Created by mohong on 2016/11/1.
 */

'use strict';

var mysql = require('mysql');

var config = {
    host: '127.0.0.1',
    user: 'root',
    passworld: '',
    database: 'douban',
    port: 3306
 };

var init = function () {
    //创建一个连接池
    var pool = mysql.createPool(config);
    return pool;
};

module.exports = init();