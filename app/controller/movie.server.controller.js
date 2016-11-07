/**
 * 后端电影控制器
 * Created by mohong on 2016/11/1.
 */

var pool = require('../../config/mysql');
var SQL = require('../util/SQL');

module.exports = {
    add: (douban_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link,post,classify) => {
        //从连接池中获取连接
        pool.getConnection((error,connection) => {
            if (error){
                throw error;
            } else {
                //建立连接，增加一个用户
                connection.query(SQL.movieSQL.insert,[douban_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link,post,classify],(error) => {
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