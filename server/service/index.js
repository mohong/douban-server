/**
 * service层，负责处理业务逻辑
 * Created by mohong on 2016/10/19.
 */

'use strict';

const http = require('http');
const url = require('url');
const moviedao = require('../dao/moviedao');

const sever = http.createServer((req,res)=>{
    //获取客户端请求路径
    let reqPath = url.parse(req.url,true).pathname;
    console.log(reqPath);
    switch (reqPath){
        case '/nowplaying':
            moviedao.getMovieById(280,function (data) {
                res.writeHead(200,{'content-Type':'text/html'});
                res.end(JSON.stringify(data[0]));
            });
            break;
        default:
            console.log('请求路径不合法');
            break;
    }
});

sever.listen(8888,(error)=>{
    if (error){
        throw error;
    } else {
        console.log('成功打开服务，地址： 127.0.0.1:8888');
    }
});