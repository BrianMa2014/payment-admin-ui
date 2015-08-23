angular.module('sbAdminApp.tenant', [
  'ui.router'
])
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        // tenant//
        //////////////
        // .state('dashboard.tenants', {
        //     abstract: true,
        //     url: '/tenants',
        //     templateUrl: 'views/dashboard/main.html',
        //     resolve: {
        //     tenants: ['tenants',
        //       function( tenants){
        //         return tenants.all();
        //       }]
        //   }
        //   ,
        //   controller: ['$scope', '$state', 'tenants', 'utils',
        //     function (  $scope,   $state,   tenants,   utils) {

        //       $scope.tenants = tenants;

        //       $scope.goToRandom = function () {
        //         var randId = utils.newRandomKey($scope.tenants, "id", $state.params.tenantId);

        //         // $state.go() can be used as a high level convenience method
        //         // for activating a state programmatically.
        //         $state.go('tenants.detail', { tenantId: randId });
        //       };
        //     }]
        //      }
        //      )
        .state('dashboard.tenants.list', {

          // Using an empty url means that this child state will become active
          // when its parent's url is navigated to. Urls of child states are
          // automatically appended to the urls of their parent. So this state's
          // url is '/contacts' (because '/contacts' + '').
          url: '/tenant/list',

          // IMPORTANT: Now we have a state that is not a top level state. Its
          // template will be inserted into the ui-view within this state's
          // parent's template; so the ui-view within contacts.html. This is the
          // most important thing to remember about templates.
          templateUrl: '/views/tenant/tenant.list.html'
        })
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

        }]);