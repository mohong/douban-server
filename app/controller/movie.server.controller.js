/**
 * 后端电影控制器
 * Created by mohong on 2016/11/1.
 */

var pool = require('../../config/mysql');
var SQL = require('../util/SQL');

module.exports = {
    add: (post,title,rate,link,status) => {
        //从连接池中获取连接
        pool.getConnection((error,connection) => {
            if (error){
                throw error;
            } else {
                //建立连接，增加一个用户
                connection.query(SQL.insert,[post,title,rate,link,status],(error) => {
                    if (error){
                        throw error;
                    } else {
                        console.log('添加成功');
                    }
                    connection.release();
                })
            }
        })
    },

};