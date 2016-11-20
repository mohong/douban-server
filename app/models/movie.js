/**
 * 电影模型
 * Created by mohong on 2016/11/19.
 */
var mongoose = require('../../mongoose_heloper');

var MovieSchema = new mongoose.Schema({
    title: String,
    director: Array,
    writer: Array,
    actors: Array,
    genre: Array,
    madeIn: String,
    language: String,
    releaseDate: String,
    runtime: String,
    rate: String,
    star: String,
    ratenum: String,
    type: String,
    link: String,
    post: String,
    db_id: String
});

MovieSchema.statics.addMovie = function (movie,callback) {
    this.create(movie,callback);
};

MovieSchema.statics.getMovies = function (query,option,callback) {
    this.find(query,null,option,callback);
};

MovieSchema.statics.getMovie = function (movieId,callback) {
    this.findOne({'db_id': movieId},callback);
};

module.exports = mongoose.model('Movie', MovieSchema);
