/**
 * service层，负责处理业务逻辑
 * Created by mohong on 2016/10/19.
 */

'use strict';

const http = require('http');
const url = require('url');

const sever = http.createServer((req,res)=>{
    //获取客户端请求路径
    let reqPath = url.parse(req.url,true).pathname;
    console.log(reqPath);
});

sever.listen(8888,(error)=>{
    if (error){
        throw error;
    } else {
        console.log('成功打开服务，地址： 127.0.0.1:8888');
    }
});