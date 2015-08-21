/**
 * Created by MaMingJiang on 2015/8/11.
 */
angular.module('sbAdminApp')
    .controller('loginController', function ($scope,$http,$state) {
        $scope.user = {
            username: '123user',
            password: '222password'
        };

        $scope.login = function(user){

         $http.get('json/userlist.json').success(function(data) {
             $scope.user.username = data[0].username;
             $scope.user.password = data[0].password;
             //window.location.href = "#/dashboard/tenant/search";
             $state.go("dashboard.search-tenant");
        });

        }
        //  $scope.login = function(userData){
        //    alert(userData.username);
        //$http({
        //    method: 'POST',
        //    url: 'json/phones.json',
        //    data: userData,  // pass in data as strings
        //    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //})
        //    .success(function (data) {
        //        if (!data.success) {
        //            // if not successful, bind errors to error variables
        //            alert("error");
        //
        //        } else {
        //            // if successful, bind success message to message
        //            $scope.message = data.message;
        //            alert("success");
        //            window.location.href = "#/dashboard/home";
        //
        //        }
        //    })
        //    .error(function (data, status) {
        //        alert(data);
        //        //$scope.data = data || "Request failed";
        //        $scope.status = status;
        //        $scope.haha = 'testHaha';
        //        alert($scope.status);
        //
        //
        //
        //    });
        //}
    });







