//app.directive('template', function() {
//    return {
//     restrict : 'E',
//     template : '../000313.html'
//    }
//});
app.directive('certificacion', function () {
    return {
        restrict: 'E',
        scope: {
            templateid: "=",
            estudianteinfo: "=",
            annoActual: "="
        },
        link: function ($scope)
        {
            $scope.$watch('templateid', function (templateid)
            {
                if (templateid.codigoPlantilla !== undefined)
                {
                    var mes = new Array();
                    mes[0] = "Enero";                  
                    mes[1] = "Febrero";
                    mes[2] = "Marzo";
                    mes[3] = "Abril";
                    mes[4] = "Mayo";
                    mes[5] = "Junio";
                    mes[6] = "Julio";
                    mes[7] = "Agosto";
                    mes[8] = "Setiembre";
                    mes[9] = "Octubre";
                    mes[10] = "Noviembre";
                    mes[11] = "Diciembre";
                    $scope.fechaActual = new Date(); 
                    $scope.diaActual = $scope.fechaActual;
                    $scope.mesActual = mes[$scope.fechaActual.getMonth()];
                    $scope.fechaActual = $scope.fechaActual.getFullYear();
                    $scope.dynamicTemplateUrl = templateid.codigoPlantilla + '.html';
                    
                }
                else {
                    $scope.dynamicTemplateUrl = '000313.html';
                }
            });
        },
        template: '<ng-include src="dynamicTemplateUrl"></ng-include>'
    };

});

