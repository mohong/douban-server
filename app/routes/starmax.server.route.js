/**
 * starmax路由
 * Created by mohong on 2016/11/10.
 */

var StarmaxController = require('../controller/ratemax.server.controller');

module.exports = function (app) {
    app.get('/starmax',function (req,res) {
        StarmaxController.queryAll(function (result) {
            res.send(result);
        })
    });
};