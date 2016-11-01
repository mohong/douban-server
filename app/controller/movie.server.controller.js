/**
 * 后端电影控制器
 * Created by mohong on 2016/11/1.
 */

var pool = require('../../config/mysql');
var SQL = require('../util/SQL');

module.exports = {
    add: (douban_movie_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link) => {
        //从连接池中获取连接
        pool.getConnection((error,connection) => {
            if (error){
                throw error;
            } else {
                //建立连接，增加一个用户
                connection.query(SQL.insert,[douban_movie_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link],(error) => {
                    if (error){
                        throw error;
                    } else {
                        console.log('数据已经保存到数据库~');
                    }
                    connection.release();
                })
            }
        })
    },

};