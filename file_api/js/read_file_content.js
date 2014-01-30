window.onload = load;

function load(){
	//Obtenemos el elemento file input
	var fileInput = document.querySelector('#fileInput');

	//Agregamos un listener, para capturar el evento on change,
	//el cual se ejecutara cuando seleccionemos un archivo
	fileInput.addEventListener('change',onChange);
}

function onChange(){
	//Obtenemos una lista de objetos File  
	//tambien llamada FileList
	//como no esta habilitado para multiples archivos 
	//accedemos al unico archivo
	var file = this.files[0];

	//Checkeamos sea un archivo de texto
	if(file.type.indexOf("text")==-1)
		return;

	//Instanciamos un objeto FileReader
	//el cual usaremos para leer el archivo
	var fileReader = new FileReader();

	//Asignamos el evento onLoad a una función
	//este evento se disparara cuando el contenido del archivo
	//se ha cargado en memoría.
	//Hecho esto lo mostraremos por consola
	fileReader.onload = function(e) {
    	console.log(fileReader.result);
  	}
  	
  	//Leemos el contenido del archivo,
  	//esto disparara el evento on Load
  	//es importante notar que el segundo paramatro es la codificación
  	//por defecto es UTF-8
  	fileReader.readAsArrayBuffer(file,"UTF-8");  
}