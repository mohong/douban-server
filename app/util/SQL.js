/**
 * SQL语句
 * Created by mohong on 2016/11/1.
 */
'use strict';

var SQL = {
    //movie表
    movieSQL: {
        insert: 'INSERT INTO movie(douban_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link,post,classify) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        queryAll: 'SELECT * FROM movie',
        getMovieById: 'SELECT * FROM movie WHERE id=?',
        getMovieByStatus: 'SELECT * FROM movie WHERE status=?'
    },
    //dbmid表
    dbmidSQL: {
        insert: 'INSERT INTO detaillink(detaillink) VALUES(?)',
        getLinkById: 'select detaillink from detaillink where id=?'
    }
};

module.exports = SQL;