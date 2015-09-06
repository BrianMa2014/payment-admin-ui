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
    'angular-loading-bar',
    'sbAdminApp.tenant',
    'sbAdminApp.merchant',
    'sbAdminApp.protocol',
    'sbAdminApp.user'
  ])
    //时间输入框格式过滤指令
    .directive('dateFormat', ['$filter',function($filter) {
        var dateFilter = $filter('date');
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function formatter(value) {
                    return dateFilter(value, 'yyyy-MM-dd'); //format
                }

                function parser() {
                    return ctrl.$modelValue;
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);

            }
        };
    }])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider

      .state('dashboard', {
        url:'/yt',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    //'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })

        //.state('dashboard.userlist',{
        //    url:'/user',
        //    controller: 'MainCtrl',
        //    templateUrl:'views/user/userlist.html',
        //    resolve: {
        //        loadMyFiles:function($ocLazyLoad) {
        //            return $ocLazyLoad.load({
        //                name:'sbAdminApp',
        //                files:[
        //                    'scripts/controllers/main.js',
        //                    'scripts/directives/timeline/timeline.js',
        //                    'scripts/directives/notifications/notifications.js',
        //                    'scripts/directives/chat/chat.js',
        //                    'scripts/directives/dashboard/stats/stats.js'
        //                ]
        //            })
        //        }
        //    }
        //})

        .state('dashboard.rolelist',{
            url:'/privilege',
            controller: 'MainCtrl',
            templateUrl:'views/privilege/rolelist.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'sbAdminApp',
                        files:[
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/chat/chat.js',
                            'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })


      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
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
        //.state('dashboard.create-user',{
        //    templateUrl:'views/user/create-user.html',
        //    url:'/user/add'
            //,
            //controller:'tenantController'
            //,
            //resolve: {
            //    loadMyFile:function($ocLazyLoad) {
            //        return $ocLazyLoad.load({
            //            name:'sbAdminApp',
            //            files:['scripts/controllers/tenantController.js']
            //        })
            //    }
            //}
        //})
        //.state('dashboard.modify-user',{
        //    templateUrl:'views/user/modify-user.html',
        //    url:'/user/modify'
            //,
            //controller:'tenantController'
            //,
            //resolve: {
            //    loadMyFile:function($ocLazyLoad) {
            //        return $ocLazyLoad.load({
            //            name:'sbAdminApp',
            //            files:['scripts/controllers/tenantController.js']
            //        })
            //    }
            //}
        //})
        .state('dashboard.role-privilege',{
            templateUrl:'views/privilege/role-privilege.html',
            url:'/role-privilege',
            controller:'privilegeController'
            //,
            //resolve: {
            //    loadMyFile:function($ocLazyLoad) {
            //        return $ocLazyLoad.load({
            //            name:'sbAdminApp',
            //            files:['scripts/controllers/privilegeController.js']
            //        })
            //    }
            //}
        })
        .state('dashboard.create-role',{
            templateUrl:'views/privilege/create-role.html',
            url:'/role/create',
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
  }]);

    
