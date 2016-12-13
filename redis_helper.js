var redis = require('redis');
//连接redis
module.exports =  redis.createClient(6379,'localhost');