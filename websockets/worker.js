var webServices = 'http://api.openweathermap.org/data/2.5/weather?q=Mar%20del%20Plata,AR';

function loadXMLDoc(){
  var xmlhttp;
  xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      //La respuesta la parseamos a JSON
      var json = JSON.parse(xmlhttp.responseText);

      //Devolvemos la temperatura, la humedad y la presión atmosférica
      postMessage({temperatura:json.main.temp,humedad:json.main.humidity,presion:json.main.pressure});
      
    }
  };
  xmlhttp.open("GET",webServices,true);
  xmlhttp.send();
}

self.addEventListener('message', function(e) {
  loadXMLDoc();
}, false);



