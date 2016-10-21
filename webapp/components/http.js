/**
 * http服务
 * 跨域请求服务
 * Created by mohong on 2016/10/20.
 */

var http = angular.module('moviecat.service.http',[]);
http.service('Httpservice',['$window','$document',function ($window,$document) {
    this.jsonp = function (url,data,callback) {
        //1 挂载回调函数
        var cbFuncName = 'my_json_cb' + Math.random().toString().replace('.','');
        $window[cbFuncName] = callback;

        //2 将data转换成字符串的形式
        var querystring = url.indexOf('?') == -1 ? '?' : '&';
        for (var key in data){
            querystring += (key + "=" + data[key] + "&");
        }

        //3 处理url中的回调函数
        querystring += 'callback=' + dbFuncName;

        //4，创建script标签
        var scriptElement = $document[0].createElement('script');
        scriptElement.src = url + querystring;
        //注意此时还不能将其append到页面上，

        //5、将script标签放到页面上
        $document[0].body.appendChild(scriptElement);
        //append后页面会自动对这个地址发送请求，请求完成后自动执行

    }

}]);