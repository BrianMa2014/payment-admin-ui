angular.module('sbAdminApp')
    .controller('protocolController',['$scope','$http', function($scope,$http) {

        $http.get('json/tenants.json').success(function(data) {
            $scope.tenants = data;
        });

        $http.get('json/payment-mode.json').success(function(data) {
            $scope.paymentModes = data;
        });

        $scope.search=function(query){


            alert(query.tenantId);
            alert(query.modeId);
            alert(query.protocolValid);

        }
    }]);
