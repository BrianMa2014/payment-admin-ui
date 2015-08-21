angular.module('sbAdminApp')
    .service('tenantService', function () {
        //$scope.tenant = {};
        this.searchTenant = function (tenantId) {
            var tenant = {
                "tenantId": "1122",
                "tenantName": "name222"
            }
            alert(tenant.tenantName);
            //$scope.tenant = tenant;
            return tenant;
        }
    })
    .controller('tenantController', ['$scope', '$http', '$state','tenantService', function ($scope, $http, $state, tenantService) {

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
            $scope.tenant = tenantService.searchTenant(tenant.tenantId);
            //$scope.tenant = tenant;
            $state.go('dashboard.modify-tenant');
        }

        $scope.deleteTenant = function (tenant) {
            alert(tenant.tenantId);

        }

    }

    ])

;
