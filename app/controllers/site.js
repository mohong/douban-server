/**
 * 站点控制器
 * Created by mohong on 2016/11/19.
 */
var MovieModel = require('../models/movie');

exports.index = function (req,res) {
    var page = parseInt(req.query.page) || 1;
    page = page > 0 ? page : 1;
    var query = {};
    var count = 10;
    var option = {
        skip: (page-1)*count,
        limit: count,
    };
    MovieModel.getMovies(query,option,function (err,movies) {
        res.send(movies);
    });
};