angular.module('sbAdminApp')
    .controller('tenantController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        $http.get('json/tenants.json').success(function (data) {
            $scope.tenants = data;
        });

        $scope.createTenant = function (tenant) {
            alert(tenant.tenantname);
        }

        $scope.search = function (query) {

            alert(query.tenantId);
            alert(query.queryName);
            alert(query.beginTime);
            alert(query.endTime);
        }

        $scope.modifyTenant = function (tenant) {
            alert(tenant.tenantId);
            $scope.test = "1111";
            alert($scope.test);
            //$scope.tenant = tenant;
            //alert($rootScope.tenant.tenantId);
            $state.go('dashboard.modify-tenant');
        }

        $scope.deleteTenant = function (tenant) {
            alert(tenant.tenantId);

        }
    }]);
