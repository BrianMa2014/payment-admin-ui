angular
    .module('sbAdminApp.tenant', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
    ])

    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

        $stateProvider

            //租户管理模块-查询
            .state('dashboard.tenant-list', {
                templateUrl: 'views/tenant/search-tenant.html',
                url: '/tenant/list/:currentPage/:pageSize',
                //controller: 'tenantController'

                controller: ['$scope', '$http','$stateParams', function ($scope, $http, $stateParams) {

                    //alert($stateParams.currentPage);
                    //alert($stateParams.pageSize);
                    //$http.get('json/tenants.json').success(function (data) {
                    //    $scope.tenants = data;
                    //});

                    $http({
                        method: "GET",
                        url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/queryTenants?params=[{"currentPage":' +
                        $stateParams.currentPage+',"pageSize":'+ $stateParams.pageSize +'}]'
                    }).success(function (data, status, headers, config) {
                        //alert("总页数"+data.val.totalPage);
                        //alert("总记录数"+data.val.totalCount);
                        //alert("当前页"+data.val.currentPage);
                        //alert("每页显示条数"+data.val.pageSize);
                        $scope.tenants = data.val.list;
                        $scope.totalCount = data.val.totalCount;
                        $scope.totalPage = data.val.totalPage;
                        $scope.currentPage = data.val.currentPage;
                    }).error(function (data, status, headers, config) {
                        alert("error"+data);
                    });
                }]
            })
            //租户管理模块-添加
            .state('dashboard.tenant-add', {
                templateUrl: 'views/tenant/create-tenant.html',
                url: '/tenant/add',
                controller: 'tenantController'
            })

            //租户管理模块-修改
            .state('dashboard.tenant-modify', {
                templateUrl: 'views/tenant/modify-tenant.html',
                url: '/tenant/modify/:tenantNo',
                controller: ['$scope', '$stateParams', '$state', '$http',
                    function ($scope, $stateParams, $state, $http) {
                        $scope.tenantNo = $stateParams.tenantNo;
                        //alert($stateParams.tenantNo);

                        $http({
                            method: "GET",
                            url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/queryTenant?params=["' + $stateParams.tenantNo + '"]'
                        }).success(function (data, status, headers, config) {

                            $scope.tenant = {
                                "tenantId":data.val.id,
                                "tenantNo": data.val.code,
                                "tenantName": data.val.name,
                                "signingDate": data.val.createTime,
                                "phone":data.val.phone,
                                "contact": data.val.contractName,
                                "address": data.val.address
                            };


                        }).error(function (data, status, headers, config) {
                            alert("未查到该租户信息");
                            $state.go("dashboard.tenant-list",{currentPage:1,pageSize:5});
                        });

                        //$scope.tenant = {
                        //    "tenantNo": "tenantNo1122",
                        //    "tenantName": "name1122",
                        //    "signingDate": "2015-01-01",
                        //    "contact": "name",
                        //    "address": "address"
                        //};

                    }]
            })
    }])
    .controller('tenantController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        //$http.get('json/tenants.json').success(function (data) {
        //    $scope.tenants = data;
        //});
        //新建租户
        $scope.createTenant = function (tenant) {
            var formData =JSON.stringify([{
                "name":tenant.tenantName,
                //"createTime":tenant.signingDate,
                "contractName":tenant.contact,
                "phone":tenant.phone,
                "address":tenant.address
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/createTenant',
                data: $.param({params: formData}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                alert("新建成功");
            }).error(function (data, status, headers, config) {
                alert("操作失败");
            });

            $state.go('dashboard.tenant-list',{currentPage:1,pageSize:5});
        }

        $scope.searchByTenantNo = function (query) {

                // Get 请求
                $http({
                    method: "GET",
                    url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/queryTenant?params=["' + query.code + '"]'
                }).success(function (data, status, headers, config) {
                    $scope.tenants = [{
                        "code": data.val.code,
                        "name": data.val.name,
                        "createTime": data.val.createTime,
                        "contractName": data.val.contractName,
                        "address": data.val.address,
                        "phone":data.val.phone
                    }];

                    $scope.totalCount = 1;
                    $scope.totalPage = 1;
                    $scope.currentPage = 0;
                }).error(function (data, status, headers, config) {
                    alert("未查到该租户信息");
                    $state.go("dashboard.tenant-list",{currentPage:0,pageSize:5});
                });

        }

        $scope.searchByTenantName = function (query) {
            // Get 请求
            $http({
                method: "GET",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/queryTenant?params=["' + query.tenantNo + '"]'
            }).success(function (data, status, headers, config) {
                $scope.tenants = [{
                    "tenantNo": data.val.code,
                    "tenantName": data.val.name,
                    "signingDate": data.val.createTime,
                    "contact": data.val.contractName,
                    "address": data.val.address
                }];
            }).error(function (data, status, headers, config) {
                alert("未查到该租户信息");
                $state.go("dashboard.tenant-list");
            });

        }
        //修改租户信息
        $scope.modifyTenant = function (tenant) {
            var formData =JSON.stringify([{
                "id":tenant.tenantId,
                "code":tenant.tenantNo,
                "name":tenant.tenantName,
                //"createTime":tenant.signingDate,
                "contractName":tenant.contact,
                "phone":tenant.phone,
                "address":tenant.address
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/modifyTenant',
                //data:"params="+str,
                data: $.param({params: formData}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                alert("修改成功");
            }).error(function (data, status, headers, config) {
                alert("修改失败");
            });

            $state.go('dashboard.tenant-list',{currentPage:0,pageSize:5});
        }

        //删除租户
        $scope.deleteTenant = function (tenantId) {
            if (confirm("确认要删除？")) {
                $http({
                    method: "GET",
                    url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/deleteTenant?params=["' + tenantId + '"]'
                }).success(function (data, status, headers, config) {
                    alert("删除成功");
                    $state.go("dashboard.tenant-list",{currentPage:0,pageSize:5});
                }).error(function (data, status, headers, config) {
                    alert("删除失败");
                });
            }
        }
    }
    ])


;