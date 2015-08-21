'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('ListUserCtrl', function($scope) {
        $scope.users=[
            {"name":"张三","uid":"10001","address":"山西"},
            {"name":"李四","uid":"10002","address":"北京"},
            {"name":"王六","uid":"10003","address":"浙江"},
            {"name":"钱七","uid":"10004","address":"河北"}
        ];
    });