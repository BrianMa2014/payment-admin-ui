/**
 * Created by MaMingJiang on 2015/8/11.
 */
angular.module('sbAdminApp')
    .controller('loginController', function ($scope,$http,$state) {
        //$scope.user = {
        //    username: '123user',
        //    password: '222password'
        //};

        $scope.login = function(user){

         //$http.get('json/userlist.json').success(function(data) {
             //$scope.user.username = data[0].username;
             //$scope.user.password = data[0].password;
             //$state.go("dashboard.tenant-list",{currentPage:1,pageSize:5});
        //});
            var formData =JSON.stringify([{
                "userName":user.userName,
                "password":user.password
            }]);
            $http({
                method: "POST",
                url: 'http://10.32.34.38:8083/facade/json/com.yintai.payment.user/User/loginUser',
                data: $.param({params: formData}),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                if(data.val.id)
                {
                    alert("登陆成功");
                    $state.go('dashboard.tenant-list', {currentPage: 1, pageSize: 5});
                }
                else{
                    alert("登陆失败");
                }
            }).error(function (data, status, headers, config) {
                alert("操作失败");
                $state.go('dashboard.tenant-list', {currentPage: 1, pageSize: 5});
            });



        }
    });







