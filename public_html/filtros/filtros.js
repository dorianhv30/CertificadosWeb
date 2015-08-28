app.filter('cantidadALetras', function () {
  return function (n)
    {
      
      var texto = "";
      var valor;
      var residuo;
      var unidades=['',' uno ',' dos ',' tres ',' cuatro ',' cinco ',' seis ',' siete ',' ocho ',' nueve '];
      var decenas=['','',' veinte ',' treinta ',' cuarenta ',' cincuenta ',' sesenta ',' setenta ',' ochenta ',' noventa '];
      var decimos=[' diez ',' once ',' doce ',' trece ',' catorce ',' quince ',' dieciseis ',' diecisiete ',' dieciocho ',' diecinueve '];
      var centenas=['cien',' ciento ',' doscientos ',' trescientos ',' cuatrocientos ',' quinientos ',' seiscientos ',' setecientos ',' ochocientos ',' novecientos '];
      valor = Math.floor(n/1000);
      residuo = n % 1000;
      texto = texto + unidades[valor] + "mil ";
      if(residuo > 99){
        valor = Math.floor(residuo/100);
        residuo = residuo%100;
        texto = texto + centenas[valor]; 
      }      
      if(residuo > 9 && residuo < 20){
         residuo = residuo % 10;
         texto = texto + decimos[residuo]; 
      }
      else{
         valor = Math.floor(residuo/10);         
         texto = texto + decenas[valor];
         residuo = residuo % 10;
         texto = texto + " y " + unidades[residuo];
      }
      texto = texto.trim();
      return texto;
      };
});


