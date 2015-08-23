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
    .controller('tenantController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        $http.get('json/tenants.json').success(function (data) {
            $scope.tenants = data;
        });

        $scope.createTenant = function (tenant) {

            $http({
               method:"POST",
               url:"http://localhost:8080/SpringMVC/tenant/save",
               data:{
                   "tenantName":tenant.tenantName,
                   "signingDate":tenant.signingDate,
                   "contact":tenant.contact,
                   "address":tenant.address
                     }
            }).success(function(data){
                console.log(data);
                if(Boolean(data) == true){
                   alert("成功");  
                   $state.go("dashboard.search-tenant");  
                }
                else{
                   alert("失败"); 
                }
            }).error(function() {
                    alert("fail...");
                });
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
