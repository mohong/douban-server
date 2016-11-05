/**
 * 获取link的控制器
 * Created by mohong on 2016/11/1.
 */

var pool = require('../../config/mysql');
var SQL = require('../util/SQL');
var request = require('request');

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
                    }
                    connection.release();
                })
            }
        })
    },

};