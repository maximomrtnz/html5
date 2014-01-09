window.addEventListener('load',init);

var snake = [];

var apple = null;

var direction = 39;

var timmer = 0;

var score = 0;

var updateInterval;

function init(){
	//Obtenemos el canvas
	var canvas = document.querySelector('#game');

	//Seteamos las dimensiones de nuestro juego
	canvas.width  = 300;
	canvas.height = 300;

	//Obtenemos el contexto 2d del canvas (podriamos obtener el 3d si quisieramos)
	var context = canvas.getContext('2d');

	//Dibujamos nuestra viborita
	//que se conformara de 5 rectangulos verdes
	var initY = 0, initX = 0;
	for(var i=0;i<5;i++){
		//Indicamos que el color sera verde
		context.fillStyle="#000";
		//Dibujamos en el canvas un rectangulo
		context.fillRect(initX, initY, 10, 10);
		//Almacenamos el recatngulo en un array que contendra la informacion de cada rectangulo
		snake.push({posX:initX,posY:initY});
		//Nos corremos en el eje X a fin de dibujar el siguiente rectangulo
		//de la viborita
		initX+=12;
	}

	//Dibujamos el fondo
	drawBackground(context,canvas);

	//Dibujar score	
	drawScore(context,score,score);

	//El loop del juego sera cada 1/4 de segundo (250 ms)
	updateInterval = setInterval(function(){update(context,canvas)},250);

	//capturamos las teclas de movimiento
	window.addEventListener('keydown',onKeyPress);
}

function update(context,canvas){
	//Verificamos si se dio alguna condicion de perdida
	if(!checkGameOver(context,canvas)){
		//Dibujamos la viborita
		drawSnake(context);
		timmer++;
		if(apple == null && timmer%3 == 0){
			drawApple(context);
		}else if(apple != null){
			checkCollision(context);
		}
	}
}

function drawSnake(context){
	//Hacemos sonar el sonido de que nos movemos
	var audio = document.querySelector('#movementSound')
	audio.play();
	//Basicamente la viborita se mueve agregando un rectangulo mas y borrando otro
	for(var i=0;i<snake.length;i++){
		if(i==0){
			//Indicamos que el color sera verde
			context.fillStyle="#33FF66";
			context.fillRect(snake[i].posX, snake[i].posY, 10, 10);
		}
		if(i==snake.length-1){
			switch(direction){
				case 37:
					//Movemos la cabeza
					snake[i].posX-=12;
				break;
				case 39:
					//Movemos la cabeza
					snake[i].posX+=12;
					break;
				case 38:
					//Up
					//Movemos la cabeza
					snake[i].posY-=12;
					break;
				case 40:
					//Down
					//Movemos la cabeza
					snake[i].posY+=12;
					break;		
			}
			
		}else{
			snake[i].posX = snake[i+1].posX;
			snake[i].posY = snake[i+1].posY;
		}
		//Indicamos que el color sera verde
		context.fillStyle="#000";
		//Dibujamos en el canvas un rectangulo
		context.fillRect(snake[i].posX, snake[i].posY, 10, 10);
	}	
}

function drawApple(context){
	var maxX=0,minX=300,maxY=0,minY=300;
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
	apple = {posX:Math.round(Math.random()*25)*12,posY:Math.round(Math.random()*25)*12};
	while((apple.posX>=minX) && (apple.posX<=maxX) && (apple.posY >= minY) && (apple.posY <= maxY)){
		apple = {posX:Math.round(Math.random()*25)*12,posY:Math.round(Math.random()*25)*12};
	}
	//Indicamos que el color sera rojo
	context.fillStyle="#f00";
	//Dibujamos en el canvas un rectangulo
	context.fillRect(apple.posX, apple.posY, 10, 10);
}

function drawScore(context,oldScore,newScore){
	///Dibujar score
	// Truco para cargar una fuente custom
	// con ello nos aseguramos de usar la fuente cuando esta cargada
	var image = new Image;
	image.src = 'fonts/pressstart2P.ttf';
	image.onerror = function() {
		//Borramos el viejo score
		//Dibujamos el score inicial
		context.font = '12px PressStart2P';
		context.fillStyle = '#33FF66';
		context.fillText(oldScore, 12, 24);
	    //Dibujamos el score inicial
		context.font = '12px PressStart2P';
		context.fillStyle = '#000';
		context.fillText(newScore, 12, 24);
	};	
}

function drawBackground(context,canvas){
	//Indicamos que el color sera verde
	context.fillStyle="#33FF66";
	//Dibujamos en el canvas un rectangulo
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function checkCollision(context){
	//Checkeamos la colision con la manzana
	if(apple != null){
		if(apple.posX <= snake[snake.length-1].posX && (apple.posX + 10) >= snake[snake.length-1].posX){
			if(apple.posY >= snake[snake.length-1].posY && (apple.posY - 10) <= snake[snake.length-1].posY){
				//Hacemos sonar el sonido de que comimos una manzana
				var audio = document.querySelector('#appleSound')
				audio.play();
				//Cargamos 10 puntos al score
				score+=10;
				drawScore(context,score-10,score);
				//Seteamos la manzana en null
				apple = null;
				//Al comer una manzana nuestra vivorita crece
				snake.push({posX:snake[snake.length-1].posX, posY:snake[snake.length-1].posY});
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
				context.fillStyle="#000";
				//Dibujamos en el canvas un rectangulo
				context.fillRect(snake[snake.length-1].posX, snake[snake.length-1].posY, 10, 10);
			}
		}	
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

function checkGameOver(context,canvas){

	if(snake[snake.length-1].posX+12>=300 || snake[snake.length-1].posX<0 || snake[snake.length-1].posY+12>=300 || snake[snake.length-1].posY<0){
		clearInterval(updateInterval);
		drawBackground(context,canvas);
		//Dibujamos un mensaje de game over
		var image = new Image;
		image.src = 'fonts/pressstart2P.ttf';
		image.onerror = function() {
			context.font = '20px PressStart2P';
			context.fillStyle = '#000';
			context.fillText('Game Over',60, 150);
		};	
		var audio = document.querySelector('#gameoverSound')
		audio.play();
		return true;
	}

	//Comprobamos si colisionamos contra nuestro propio cuerpo
	var i = 0;
	while(i<snake.length-1 && !(snake[i].posX <= snake[i].posX && (snake[i].posX + 10) >= snake[snake.length-1].posX && snake[i].posY >= snake[snake.length-1].posY && (snake[i].posY - 10) <= snake[snake.length-1].posY)){
		i++;
	}

	if(i<snake.length-1 && (snake[i].posX <= snake[snake.length-1].posX && (snake[i].posX + 10) >= snake[snake.length-1].posX && snake[i].posY >= snake[snake.length-1].posY && (snake[i].posY - 10) <= snake[snake.length-1].posY)){
		clearInterval(updateInterval);
		drawBackground(context,canvas);
		//Dibujamos un mensaje de game over
		var image = new Image;
		image.src = 'fonts/pressstart2P.ttf';
		image.onerror = function() {
			context.font = '20px PressStart2P';
			context.fillStyle = '#000';
			context.fillText('Game Over',60, 150);
		};	
		var audio = document.querySelector('#gameoverSound')
		audio.play();
		return true;
	}

	return false;

}