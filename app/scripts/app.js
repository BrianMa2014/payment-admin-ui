'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    // 'sbAdminApp.utils.service',
    'sbAdminApp.tenants.service'

  ])
    .directive('header',function(){
        return {
            templateUrl:'scripts/directives/header/header.html',
            restrict: 'E',
            replace: true,
        }
    })
    .directive('headerNotification',function(){
        return {
            templateUrl:'scripts/directives/header/header-notification/header-notification.html',
            restrict: 'E',
            replace: true,
        }
    })
    .directive('sidebar',['$location',function() {
        return {
            templateUrl:'scripts/directives/sidebar/sidebar.html',
            restrict: 'E',
            replace: true,
            scope: {
            },
            controller:function($scope){
                $scope.selectedMenu = 'dashboard';
                $scope.collapseVar = 0;
                $scope.multiCollapseVar = 0;

                $scope.check = function(x){

                    if(x==$scope.collapseVar)
                        $scope.collapseVar = 0;
                    else
                        $scope.collapseVar = x;
                };

                $scope.multiCheck = function(y){

                    if(y==$scope.multiCollapseVar)
                        $scope.multiCollapseVar = 0;
                    else
                        $scope.multiCollapseVar = y;
                };
            }
        }
    }])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html'

    })

      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
        controller:'loginController',
        resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/login.js'
                        ]
                    })
                }
            }
    })


        //用户管理模块-查询
      .state('dashboard.search-tenant',{
            templateUrl:'views/tenant/search-tenant.html',
            url:'/tenant/search',
            controller:'tenantController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                            name:'sbAdminApp',
                            files:['scripts/controllers/tenantController.js']
                        })
                }
            }
        })
        //用户管理模块-添加
        .state('dashboard.create-tenant',{
            templateUrl:'views/tenant/create-tenant.html',
            url:'/tenant/add',
            controller:'tenantController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                     return $ocLazyLoad.load({
                             name:'sbAdminApp',
                             files:['scripts/controllers/tenantController.js']
                })
            }
        }
        })
        //用户管理模块-修改
        .state('dashboard.modify-tenant',{
            templateUrl:'views/tenant/modify-tenant.html',
            url:'/tenant/modify/{tenantId}',
            // controller:'tenantController',
            controller: ['$scope', '$stateParams','tenantsService', 
                function (  $scope,   $stateParams, tenantsService) {
              
                 var tenant = tenantsService.get($stateParams.tenantId);
                 alert("地址"+tenant.address);
                 // alert("success"+data);
                 // alert($scope.tenant.tenantId)；
                    // tenantsService.get(11);
                  // $scope.tenant = {
                  //   "address":"1111xxx",
                  //   "signingDate":"2015-01-01",
                  //   "tenantName":"mexxx",
                  //   "contact":"王霞"
              
                  // };
                }] ,
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/tenantController.js']
                    })
                }
            }
        })
        //平台交易报表-查询
        .state('dashboard.search-tradeStatistics',{
            templateUrl:'views/tradeStatistics/search-TradeStatistics.html',
            url:'/tradeStatistics/search',
            controller:'tradeStatisticsController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/tradeStatisticsController.js']
                    })
                }
            }
        })
        .state('dashboard.role-privilege',{
            templateUrl:'views/privilege/role-privilege.html',
            url:'/role-privilege',
            controller:'privilegeController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/privilegeController.js']
                    })
                }
            }
        })
        .state('dashboard.user-privilege',{
            templateUrl:'views/tenant/create-tenant.html',
            url:'/create-tenant',
            controller:'privilegeController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/privilegeController.js']
                    })
                }
            }
        })
        .state('dashboard.service-protocol',{
            templateUrl:'views/protocol/service-protocol.html',
            url:'/protocol/search',
            controller:'protocolController',
            resolve: {
                loadMyFile:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:['scripts/controllers/protocolController.js']
                    })
                }
            }
        })


        //用户管理
        .state('dashboard.userManger',{
            templateUrl:'views/EC-Pay/UserManger.html',
            url:'/userManger',
            controller:'ListUserCtrl',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/listUser.js'
                        ]
                    })
                }
            }
        })
  }
    ])
    //.config(['$routeProvider',
    //    function($routeProvider) {
    //        $routeProvider.
    //            when('/phones', {
    //                templateUrl: 'partials/phone-list.html',
    //                controller: 'PhoneListCtrl'
    //            }).
    //            when('/phones/:phoneId', {
    //                templateUrl: 'partials/phone-detail.html',
    //                controller: 'PhoneDetailCtrl'
    //            }).
    //            when('/protocol/search', {
    //                templateUrl:'views/protocol/service-protocol.html',
    //                controller:'protocolController'
    //            })
    //            otherwise({
    //                redirectTo: '/protocol/search'
    //            });
    //    }])
;



