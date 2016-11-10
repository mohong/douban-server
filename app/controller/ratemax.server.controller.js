/**
 * ratemax控制器
 * Created by mohong on 2016/11/10.
 */


var pool = require('../../config/mysql');
var SQL = require('../util/SQL');

module.exports = {
    queryAll: function (callback) {
        pool.getConnection(function (error,connection) {
            if (error) {
                console.log(result);
                throw error;
            } else {
                connection.query(SQL.ratemaxSQL.queryAll,function (error,result){
                    if (error){
                        throw error;
                    } else {
                        callback(result);
                    }

                });
                connection.release();
            }
        })
    }

};