window.addEventListener('load',init);

var snake = [];

var apple = null;

var direction = 39;

var timmer = 0;

function init(){
	//Obtenemos el canvas
	var canvas = document.querySelector('#game');

	//Seteamos las dimensiones de nuestro juego
	canvas.width  = 400;
	canvas.height = 400;

	//Obtenemos el contexto 2d del canvas (podriamos obtener el 3d si quisieramos)
	var context = canvas.getContext('2d');

	//Dibujamos nuestra viborita
	//que se conformara de 5 rectangulos verdes
	var initY = 0, initX = 0;
	for(var i=0;i<5;i++){
		//Indicamos que el color sera verde
		context.fillStyle="#0f0";
		//Dibujamos en el canvas un rectangulo
		context.fillRect(initX, initY, 10, 10);
		//Almacenamos el recatngulo en un array que contendra la informacion de cada rectangulo
		snake.push({posX:initX,posY:initY});
		//Nos corremos en el eje X a fin de dibujar el siguiente rectangulo
		//de la viborita
		initX+=12;
	}
	//El loop del juego sera cada 1 segundo (1000 ms)
	setInterval(function(){update(context)},1000);

	//capturamos las teclas de movimiento
	window.addEventListener('keydown',onKeyPress);
}

function update(context){
	drawSnake(context);
	timmer++;
	if(apple == null && timmer%3 == 0){
		drawApple(context);
	}else if(apple != null){
		checkCollision();
	}
}

function drawSnake(context){
	//Basicamente la viborita se mueve agregando un rectangulo mas y borrando otro
	context.clearRect(snake[0].posX,snake[0].posY,10,10);
	for(var i=0;i<snake.length-1;i++){
		snake[i].posX = snake[i+1].posX;
		snake[i].posY = snake[i+1].posY;
	}	
	switch(direction){
		case 37:
			//Movemos la cabeza
			snake[snake.length-1].posX-=12;
			break;
		case 39:
			//Movemos la cabeza
			snake[snake.length-1].posX+=12;
			break;
		case 38:
			//Up
			//Movemos la cabeza
			snake[snake.length-1].posY-=12;
			break;
		case 40:
			//Down
			//Movemos la cabeza
			snake[snake.length-1].posY+=12;
			break;		
	}
	//Indicamos que el color sera verde
	context.fillStyle="#0f0";
	//Dibujamos en el canvas un rectangulo
	context.fillRect(snake[snake.length-1].posX, snake[snake.length-1].posY, 10, 10);
}

function drawApple(context){
	var maxX=0,minX=400,maxY=400,minY=0;
	for (var i = 0; i < snake.length; i++) {
		if(snake[i].posX>maxX){
			maxX = snake[i].posX;
		}
		if(snake[i].posX<minX){
			minX = snake[i].posX;
		}
		if(snake[i].posY>maxY){
			maxY = snake[i].posY;
		}
		if(snake[i].posX<minY){
			minY = snake[i].posY;
		}	
	}
	apple = {posX:Math.round(Math.random()*400)%400,posY:Math.round(Math.random()*400)%400};
	while((apple.posX>=minX) && (apple.posX<=maxX) && (apple.posY >= minY) && (apple.posY <= maxY)){
		apple = {posX:Math.round(Math.random()*400)%400,posY:Math.round(Math.random()*400)%400};
	}
	//Indicamos que el color sera rojo
	context.fillStyle="#f00";
	//Dibujamos en el canvas un rectangulo
	context.fillRect(apple.posX, apple.posY, 10, 10);
}

function checkCollision(){
	if(apple.posX == snake[snake.length-1].posX && apple.posY == snake[snake.length-1].posY){
		console.log('collision');
	}
}

function onKeyPress(event){
	var keyPressed = event.keyCode; 
	if(keyPressed == 37){
		if(direction!=39){
			direction = keyPressed;
		}	
	}else if(keyPressed == 39){
		if(direction != 37){
			direction = keyPressed;
		}
	}else if(keyPressed == 40){
		if(direction != 38){
			direction = keyPressed;
		}
	}else if(keyPressed == 38){
		if(direction != 40){
			direction = keyPressed;
		}
	}
}
