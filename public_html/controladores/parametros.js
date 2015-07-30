app.controller('CertificadoCtrl', function ($scope, $http) {
    $scope.provincias = [];
    $scope.cantones = [];
    $scope.distritos = [];
    $scope.provincia

      $scope.cargarProvincias = function(){
	    $http({
	            method: 'GET',
	            url: 'http://localhost:8080/CertificadosSRV/api/provincia'
	        }).success(function (result) {
	        $scope.provincias = result;
	        $scope.provincia = $scope.provincias[0].idProvincia;
	        $scope.cargarCantones($scope.provincia);
	    });       
	  }
      $scope.cargarCantones = function(item){
	    $http({
            method: 'GET',
            url: 'http://localhost:8080/CertificadosSRV/api/provincia/cantones/' + item
        }).success(function (result) {
        $scope.cantones = result;
        $scope.canton = $scope.cantones[0].idCanton;
        $scope.cargarDistritos($scope.canton);
    	});
	  }  

	  $scope.cargarDistritos = function(item){
	    $http({
            method: 'GET',
            url: 'http://localhost:8080/CertificadosSRV/api/canton/distritos/' + item
        }).success(function (result) {
        $scope.distritos = result;
        $scope.distrito = $scope.distritos[0].idDistrito;
    	});
	  } 

	  $scope.iniciar = function(){
        $http({
            method: 'GET',
            url: 'http://localhost:8080/CertificadosSRV/api/parametro/' + 1
        }).success(function (result) {
        $scope.parametros = result;
        	$http({
	            method: 'GET',
	            url: 'http://localhost:8080/CertificadosSRV/api/provincia'
	        }).success(function (result) {
	        	$scope.provincias = result;
        		$scope.provincia = $scope.parametros.idDistrito.idCanton.idProvincia.idProvincia;
        		$http({
		            method: 'GET',
		            url: 'http://localhost:8080/CertificadosSRV/api/provincia/cantones/' + $scope.parametros.idDistrito.idCanton.idProvincia.idProvincia
		    	}).success(function (result) {
		        	$scope.cantones = result;
       				$scope.canton = $scope.parametros.idDistrito.idCanton.idCanton;
       				$http({
			        	method: 'GET',
			        	url: 'http://localhost:8080/CertificadosSRV/api/canton/distritos/' + $scope.parametros.idDistrito.idCanton.idCanton
			    }).success(function (result) {
			        $scope.distritos = result;
			        $scope.distrito = $scope.parametros.idDistrito.idDistrito;
			    	});
		    	});
	    	});       
    	});
	  } 

	   $scope.guardarParametros = function(){
	   	$scope.parametros.idDistrito.idDistrito = $scope.distrito;
	    $http({
            method: 'PUT',
            url: 'http://localhost:8080/CertificadosSRV/api/parametro/' + $scope.parametros.idParametro,
            data: $scope.parametros
        }).success(function (result) {
        	console.log("test");
    	});
	  } 
});