app.controller('UsuariosCtrl', ['$scope', '$http', '$interval', 'uiGridConstants', function ($scope, $http, $interval, uiGridConstants) {
  $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

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
  $scope.gridOptions.enableRowSelection = true;
  $scope.gridOptions.onRegisterApi = function( gridApi ) {
    $scope.gridApi = gridApi;
  };

  $http.get('http://localhost:8080/CertificadosRest/api/usuarios')
    .success(function(data) {
      $scope.gridOptions.data = data;
      
      // $interval whilst we wait for the grid to digest the data we just gave it
      //$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
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
