/**
 * Created by mohong on 2016/11/10.
 */
var RatemaxController = require('../controller/ratemax.server.controller');

module.exports = function (app) {
    app.get('/ratemax',function (req,res) {
        RatemaxController.queryAll(function (result) {
            res.send(result);
        })
    });
};