app.controller('CertificacionesCtrl', ['$scope', '$http','$compile', function ($scope, $http, $compile) {
    $scope.certificaciones = {};
    $scope.estudiantes = {};
    $scope.estudiantesxnivel = {};
    $scope.certificacion;
    $scope.estudiante;
    $scope.mostrar = false;
    
    $scope.inicializar = function(){           
	    $http({
	            method: 'GET',
	            url: 'http://localhost:8080/CertificadosRest/api/certificacion'
	        }).success(function (result) {
	        $scope.certificaciones = result;
                $http({
                    method: 'GET',
                    url: 'http://localhost:8080/CertificadosRest/api/estudiantexnivel'
                    }).success(function (result) {
                    $scope.estudiantes = result;
                    $scope.estudiantesxnivel = $scope.estudiantes;
                    });
               
	    });
    };
    
    $scope.$watch('certificacion', function() {
        $scope.estudiantesxnivel = $.grep( $scope.estudiantes, function( n ) {
                                        return ( n.nivel.idNivel === $scope.certificacion.idNivel.idNivel);;
                                      });        
  });
  
  $scope.generar = function() {
       $scope.mostrar = true;
   };
       
}]);


