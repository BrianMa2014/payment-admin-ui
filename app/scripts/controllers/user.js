'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular
    .module('sbAdminApp.user', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap'
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider

            .state('dashboard.user-list',{
                templateUrl:'views/user/userlist.html',
                url:'/user/search',
                controller:'userController'
            })
            .state('dashboard.user-add',{
                templateUrl:'views/user/create-user.html',
                url:'/user/add',
                controller:'userController'
            })
            .state('dashboard.user-modify',{
                templateUrl:'views/user/modify-user.html',
                url:'/user/modify',
                controller:'userController'
            })

    }])
    .controller('userController',['$scope','$http', 'Upload', '$timeout', function($scope,$http, Upload, $timeout) {

        //新建用户
        $scope.createUser = function (user) {
            var formData =JSON.stringify([{
                "userName":user.userName,
                "password":user.password
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.user/User/registerUser',
                data: $.param({params: formData}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                alert("新建成功");
            }).error(function (data, status, headers, config) {
                alert("操作失败");
            });

            $state.go('dashboard.tenant-list',{currentPage:1,pageSize:5});
        }

    }]);