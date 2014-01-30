window.onload = load;

function load(){
	//Obtenemos el elemento file input
	var fileInput = document.querySelector('#fileInput');

	//Agregamos un listener, para capturar el evento on change,
	//el cual se ejecutara cuando seleccionemos uno o mas archivos
	fileInput.addEventListener('change',onChange);
}

function onChange(){
	//Obtenemos una lista de objetos File  
	//tambien llamada FileList
	var files = this.files;

	//Iteramos sobre ella para obtener cada File que la conforma
	//y mostrar algunos de los atributos que nos provee la File API
	//por consola
	for(var i = 0; files.length ; i++){
		console.log('Nombre :'+files[i].name);
		console.log('Tamaño :'+files[i].size +'Bytes');
		console.log('Tipo :'+files[i].type);		
	}
}