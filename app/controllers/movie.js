/**
 * 电影控制器
 * Created by mohong on 2016/11/20.
 */
var MovieModel = require('../models/movie');

exports.detail = function (req,res) {
    var movieId = req.params.mid;
    MovieModel.getMovie(movieId,function (err,movie) {
        res.send(movie);
    })
};