/**
 * SQL语句
 * Created by mohong on 2016/11/1.
 */
'use strict';

var movieSQL = {
    insert: 'INSERT INTO movie(douban_movie_id,title,director,writer,actors,type,country,language,released,duration,rate,star,link) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)',
    queryAll: 'SELECT * FROM movie',
    getMovieById: 'SELECT * FROM movie WHERE id=?',
    getMovieByStatus: 'SELECT * FROM movie WHERE status=?'
};

module.exports = movieSQL;