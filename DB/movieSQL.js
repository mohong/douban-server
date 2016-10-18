/**
 * 操作moive的SQL语句
 * Created by mohong on 2016/10/18.
 */

'use strict';

let movieSQL = {
    insert: 'INSERT INTO movie(post,title,rate,link,status) VALUES(?,?,?,?,?)',
    queryAll: 'SELECT * FROM movie',
    getMovieById: 'SELECT * FROM movie WHERE id=?',
    getMovieByStatus: 'SELECT * FROM movie WHERE status=?'
};

module.exports = movieSQL;