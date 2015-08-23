angular.module('sbAdminApp.tenants.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('tenantsService', ['$http', function ($http) {
  var path = '../../json/tenants.json';
  var tenants = $http.get(path).then(function (resp) {
    
    return resp.data;
  });

  var factory = {};
 
  // factory.all = function () {
  //       return tenants;
  //     };
  factory.get = function (id) {
     
      // var tenant = {
      //               "address":"1111xxx",
      //               "signingDate":"2015-09-01",
      //               "tenantName":"mexxx",
      //               "contact":"王霞111"
              
      //             };  
     var tenant ={};
     $http({
               method:"GET",
               url:"http://localhost:8080/SpringMVC/tenant/getTenantById?tenantId="+id
            }).success(function(data){
                
                tenant = data;
                  alert("1"+tenant.tenantId);
                    alert("1"+tenant.tenantName);
                      alert("1"+tenant.signingDate);
                        alert("1"+tenant.contact);
                          alert("1"+tenant.address);
                // alert(tenant.tenantName);
                // if(Boolean(data) == true){
                //    alert("成功");  
                //    $state.go("dashboard.search-tenant");  
                // }
                // else{
                //    alert("获取商户失败"); 
                // }
            }).error(function(status) {
                    alert("获取商户失败"+status);
                });
  
     return tenant;
      };
  return factory;
}
]
);

