app.controller('UsuariosCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  //Variables globales
  $scope.usuario = {};
  $scope.mostrarGrid = true;
  $scope.ocultarFrmActualizar = true;
  $scope.ocultarFrmNuevo = true;
  $scope.fila=-1;
  $scope.puestos = {};
  $scope.deshabilitaActualizar = true;
  
  // metodos del scope
  $scope.cancelar = function() {
       $scope.mostrarGrid = true;
       $scope.ocultarFrmActualizar = true;
       $scope.ocultarFrmNuevo = true; 
       $scope.deshabilitaActualizar = true;
       $scope.gridApi.selection.clearSelectedRows();
   };
   
   $scope.actualizar = function() {
       $http({
            method: 'PUT',
            url: 'http://localhost:8080/CertificadosRest/api/usuarios/' + $scope.usuario.idUsuario,
            data: $scope.usuario
        }).success(function (result) {
            $scope.gridOptions.data[$scope.fila] = $scope.usuario; 
        });
       $scope.mostrarGrid = true;
       $scope.ocultarFrmActualizar = true;                  
   };
   
   $scope.guardar = function() {
       $scope.usuario.estado = 'A';
       $scope.usuario.clave = 'Temporal123';
       $scope.usuario.nombreUsuario = $scope.usuario.nombre.substring( 0, 1 ) + $scope.usuario.primerApellido;
       $http({
            method: 'POST',
            url: 'http://localhost:8080/CertificadosRest/api/usuarios/',
            data: $scope.usuario
        }).success(function (result) {
            $scope.gridOptions.data.push($scope.usuario); 
        });
        
       $scope.mostrarGrid = true;
       $scope.ocultarFrmNuevo = true;                  
   };
   
   $scope.mostrarFrmActualizar = function() {
       $scope.mostrarGrid = false;
       $scope.ocultarFrmActualizar = false; 
       $scope.ocultarFrmNuevo = true;  
   };
   
   $scope.mostrarFrmNuevo = function() {
       $scope.usuario = {};
       $scope.mostrarGrid = false;
       $scope.ocultarFrmActualizar = true; 
       $scope.ocultarFrmNuevo = false;
       
   };
  
   
  // Carga de grid
  $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false, enableFiltering: true };

  $scope.gridOptions.columnDefs = [
      { field: 'nombre',pinnedLeft:true},      
      { field: 'primerApellido', pinnedLeft:true},
      { field: 'segundoApellido'},
      { field: 'nombreUsuario', name:'Usuario'},
      { field: 'idPerfil.descripcion',name:'Puesto', enableSorting: false},
      { field: 'correo', enableSorting: false},
      { field: 'estado', enableSorting: false, filter: {
          term: 'A',
          type: uiGridConstants.filter.SELECT,
          selectOptions: [ { value: 'A', label: 'Activo' }, { value: 'I', label: 'Inactivo' }]
        },
         cellFilter: 'mapEstado', headerCellClass: $scope.highlightFilteredHeader
      }
    ];

  $scope.gridOptions.multiSelect = false;
  $scope.gridOptions.modifierKeysToMultiSelect = false;
  $scope.gridOptions.noUnselect = true;
  $scope.gridOptions.onRegisterApi = function( gridApi ) {
    $scope.gridApi = gridApi;
    gridApi.selection.on.rowSelectionChanged($scope,function(row){
        $scope.usuario = row.entity;
        $scope.fila = $scope.gridOptions.data.indexOf(row.entity);
        $scope.puestoActual = row.entity.idPerfil;
        $scope.deshabilitaActualizar = false;
        $scope.$apply();
      });
    gridApi.core.on.filterChanged( $scope, function() {
         $scope.mostrarGrid = true;
         $scope.usuario = {};
         $scope.$apply();
        }); 
  };

  $http.get('http://localhost:8080/CertificadosRest/api/usuarios')
    .success(function(data) {
      $scope.gridOptions.data = data;
      
      // $interval whilst we wait for the grid to digest the data we just gave it
      $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
    });
    
  $http.get('http://localhost:8080/CertificadosRest/api/perfiles').
        success(function(data, status, headers, config) {
          $scope.puestos = data;
        }).
        error(function(data, status, headers, config) {
         alert("Error cargando perfiles" + status)
        });
    
}])
.filter('mapEstado', function() {
  var EstadoHash = {
    A: 'Activo',
    I: 'Inactivo'
  };
 
  return function(input) {
    if (!input){
      return '';
    } else {
      return EstadoHash[input];
    }
  };
});