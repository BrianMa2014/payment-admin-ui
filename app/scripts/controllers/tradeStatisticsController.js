angular.module('sbAdminApp')
    .controller('tradeStatisticsController',['$scope','$http', function($scope,$http) {

        $http.get('json/trades.json').success(function(data) {
            $scope.trades = data;
        });
    }]);