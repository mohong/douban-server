/**
 * 获取link的控制器
 * Created by mohong on 2016/11/1.
 */

var pool = require('../../config/mysql');
var SQL = require('../util/SQL');

module.exports = {
    add: (link) => {
        //从连接池中获取连接
        pool.getConnection((error,connection) => {
            if (error){
                throw error;
            } else {
                //建立连接，增加一个用户
                connection.query(SQL.dbmidSQL.insert,[link],(error) => {
                    if (error){
                        throw error;
                    } else {
                        console.log('条数据已经保存到数据库~');
                    }
                    connection.release();
                })
            }
        })
    },

    getUrlByYear: function (year) {
        var urls = [];
        for(var i=0; i<100; i+=20){   //2780
            var baseUrl = 'https://movie.douban.com/tag/' + year + '?start='+i+'&type=T';
            urls.push(baseUrl);
        }
        return urls;
    }
};