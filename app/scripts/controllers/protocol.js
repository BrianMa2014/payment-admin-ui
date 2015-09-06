angular
    .module('sbAdminApp.protocol', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'ngFileUpload'
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider

            .state('dashboard.protocol-list',{
                templateUrl:'views/protocol/search-protocol.html',
                url:'/protocol/search',
                controller:'protocolController'
            })
            .state('dashboard.add-protocol',{
                templateUrl:'views/protocol/create-protocol.html',
                url:'/protocol/add',
                controller:'protocolController'
            })

    }])
    .controller('protocolController',['$scope','$http', 'Upload', '$timeout', function($scope,$http, Upload, $timeout) {
        $scope.upload = function(file) {
            alert(file);
            file.upload = Upload.upload({
                url: 'http://10.32.34.38:8083/uploadPrikey',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                fields: {tenantCode: 1111},
                file: file,
                fileFormDataName: 'file'
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });

            file.upload.progress(function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }]);
