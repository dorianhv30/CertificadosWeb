var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.selection']);
app.controller('UsuariosCtrl', ['$scope', '$http', 'uiGridConstants', function ($scope, $http, uiGridConstants) {
  $scope.usuario = {};
  $scope.filaSeleccionada = false;
  
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
        $scope.usuario = angular.toJson(row.entity);
        $scope.filaSeleccionada = true;
      });
    gridApi.core.on.filterChanged( $scope, function() {
         $scope.filaSeleccionada = false;
         $scope.usuario = {};
        }); 
  };

  $http.get('http://localhost:8080/CertificadosRest/api/usuarios')
    .success(function(data) {
      $scope.gridOptions.data = data;
      
      // $interval whilst we wait for the grid to digest the data we just gave it
      $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
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