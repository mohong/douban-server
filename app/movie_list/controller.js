/**
 * 电影列表控制器
 * Created by mohong on 2016/10/21.
 */


(function (angular) {
    'use strict';

    //创建电影列表模块
    var module = angular.module('app.movie_list',['ngRoute','app.services.http']);

    //配置路由
    module.config('$routeProvider',function ($routeProvider) {
        $routeProvider.when('nowplaying',{
            templateUrl : 'movie_list/view.html',
            controller : 'movieListController'
        });
    })

    module.controller('movieListController',['$scope','$route','$routeParams','HttpService',
        function ($scope,$route,$routeParams,HttpService) {
            $scope.title = null;
            $scope.post = null;
            $scope.rate = 0;
            $scope.link = null;
            HttpService.jsonp('http://127.0.0.1:8888/nowplaying',{},function (data) {
                $scope.title = data.title;
                $scope.post = data.post;
                $scope.rate = data.rate;
                $scope.link = data.rate;
                $scope.$apply();
            })
        }
    ]);



})(angular);