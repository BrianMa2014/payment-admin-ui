angular
    .module('sbAdminApp.merchant', [
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
            .state('dashboard.merchant-list', {
                templateUrl: 'views/merchant/search-merchant.html',
                url: '/merchant/list/:tenantNo',
                controller: ['$scope', '$http','$stateParams', function ($scope, $http, $stateParams) {

                    //根据租户号查询租户信息

                    $http({
                        method: "GET",
                        url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.tenant/TenantManage/queryTenant?params=["' + $stateParams.tenantNo + '"]'
                    }).success(function (data, status, headers, config) {
                        $scope.tenant = {
                            "code": data.val.code,
                            "name": data.val.name,
                            "createTime": data.val.createTime,
                            "contractName": data.val.contractName,
                            "address": data.val.address,
                            "phone":data.val.phone
                        };

                    }).error(function (data, status, headers, config) {
                        alert("未查到该租户信息");
                        $state.go("dashboard.tenant-list",{currentPage:0,pageSize:5});
                    });

                    //根据租户号查询租户下的所有商户
                    $http({
                        method: "GET",
                        url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/queryMerchants?params=["'+$stateParams.tenantNo+'"]'
                    }).success(function (data, status, headers, config) {

                        $scope.merchants = data.val;

                    }).error(function (data, status, headers, config) {
                        alert("未查到该商户信息");
                        $state.go("dashboard.merchant-list",{currentPage:1,pageSize:5});
                    });

                }]
            })
            //租户管理模块-添加
            .state('dashboard.merchant-add', {
                templateUrl: 'views/merchant/create-merchant.html',
                url: '/merchant/add/:tenantNo',
                //controller: 'merchantController'
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
                            $state.go("dashboard.tenant-list",{tenantNo:$stateParams.tenantNo});
                        });

                    }]
            })

            //租户管理模块-修改
            .state('dashboard.merchant-modify', {
                templateUrl: 'views/merchant/modify-merchant.html',
                url: '/merchant/modify/:merchantCode',
                controller: ['$scope', '$stateParams', '$state', '$http',
                    function ($scope, $stateParams, $state, $http) {

                        $http({
                            method: "GET",
                            url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/findMerchantByCode?params=["'+$stateParams.merchantCode+'"]'
                        }).success(function (data, status, headers, config) {

                            $scope.merchant = {
                                "code":data.val.code,
                                "name":data.val.name,
                                "tenantCode": data.val.tenantCode,
                                "contact": data.val.contact,
                                "phone":data.val.phone,
                                "address": data.val.address
                            };


                        }).error(function (data, status, headers, config) {
                            alert("未查到该商户信息");
                            $state.go("dashboard.tenant-list",{currentPage:1,pageSize:5});
                        });
                    }]
            })
    }])
    .controller('merchantController', ['$scope', '$http', '$state', function ($scope, $http, $state) {

        //$http.get('json/tenants.json').success(function (data) {
        //    $scope.tenants = data;
        //});
        //新建租户
        $scope.createMerchant = function (merchant,tenant) {
            var formData =JSON.stringify([{
                "name":merchant.name,
                "contact":merchant.contact,
                "phone":merchant.phone,
                "address":merchant.address,
                "tenantCode":tenant.tenantNo
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/registerMerchant',
                data: $.param({params: formData}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                alert("新建成功");
            }).error(function (data, status, headers, config) {
                alert("操作失败");
            });
            //$state.go('dashboard.merchant-list',{tenantNo:tenant.tenantNo});
            $state.go("dashboard.tenant-list",{currentPage:0,pageSize:5});
        }

        $scope.searchByMerchantCode = function (query,tenant) {
                // Get 请求
                $http({
                    method: "GET",
                    url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/queryMerchantByCode?params=["'+tenant.code+'","'+query.merchantCode+'"]'
                }).success(function (data, status, headers, config) {
                    $scope.merchants = [{
                        "id":data.val.id,
                        "code": data.val.code,
                        "name": data.val.name,
                        "contact": data.val.contact,
                        "address": data.val.address,
                        "phone": data.val.phone
                    }];
                    //$scope.merchant = data.val;
                    $scope.query.merchantName="";
                    //$scope.totalCount = 1;
                    //$scope.totalPage = 1;
                    //$scope.currentPage = 0;
                }).error(function (data, status, headers, config) {
                    alert("未查到该商户信息");
                    $state.go("dashboard.tenant-list",{tenantNo:tenant.tenantNo});
                });

        }

        $scope.searchByMerchantName = function (query,tenant) {
            // Get 请求
            $http({
                method: "GET",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/queryMerchantByName?params=["'+tenant.code+'","'+query.merchantName+'"]'
            }).success(function (data, status, headers, config) {
                $scope.merchants = [{
                    "code": data.val.code,
                    "name": data.val.name,
                    "contact": data.val.contact,
                    "address": data.val.address,
                    "phone": data.val.phone
                }]
                    $scope.query.merchantCode="";
                    $scope.totalCount = 1;
                    $scope.totalPage = 1;
                    $scope.currentPage = 0;
            }).error(function (data, status, headers, config) {
                alert("未查到该商户信息");
                $state.go("dashboard.tenant-list",{tenantNo:tenant.tenantNo});
            });

        }
        //修改租户信息
        $scope.modifyMerchant = function (merchant) {
            var formData =JSON.stringify([{
                "code":merchant.code,
                "name":merchant.name,
                "contact":merchant.contact,
                "phone":merchant.phone,
                "address":merchant.address,
                "tenantCode":merchant.tenantCode
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/modifyMerchant',
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

            $state.go('dashboard.tenant-list',{currentPage:1,pageSize:5});
        }

        //删除商户
        $scope.deleteMerchant = function (merchantCode,tenantNo) {
            if (confirm("确认要删除？")) {
                $http({
                    method: "GET",
                    url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.merchant/Merchant/removeMerchant?params=["' + merchantCode + '"]'
                }).success(function (data, status, headers, config) {
                    alert("删除成功");
                    //$state.go("dashboard.merchant-list",{tenantNo:tenant.tenantNo});
                    $state.go("dashboard.tenant-list",{currentPage:0,pageSize:5});
                }).error(function (data, status, headers, config) {
                    alert("删除失败");
                });
            }
        }
    }
    ])


;