//app.directive('template', function() {
//    return {
//     restrict : 'E',
//     template : '../000313.html'
//    }
//});
app.directive('certificacion', function() {
    return {
     restrict : 'E',
     scope: {
          templateid: "=",
          estudianteinfo: "="
        },
        link: function($scope)
    {
      $scope.$watch('templateid', function(templateid)
      {
        if (templateid.codigoPlantilla !== undefined)
        {
            $scope.dynamicTemplateUrl = templateid.codigoPlantilla+'.html';
        }
        else{
            $scope.dynamicTemplateUrl = '000313.html';
        }
      });
    },

    template: '<ng-include src="dynamicTemplateUrl"></ng-include>'
  };
//     templateUrl: function(scope){
//         if (scope.templateid !== undefined){
//             return scope.templateid.codigoPlantilla+'.html';
//         }
//         else{
//            return '000313.html'; 
//         }
//      }
});

