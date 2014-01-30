var redRange,greenRange,blueRange,imagePixel,canvas,ctx;

window.onload = function(){
	var file = document.querySelector('#file');
	file.addEventListener('change',onChange);

	redRange = document.querySelector('#red');
	greenRange = document.querySelector('#green');
	blueRange =document.querySelector('#blue');

	redRange.addEventListener('change',onColorChange);
	greenRange.addEventListener('change',onColorChange);
	blueRange.addEventListener('change',onColorChange)


	canvas = document.querySelector('#editor');

	ctx = canvas.getContext('2d');

	var downloadButton = document.querySelector('#download');

	download.addEventListener('click',onClickDownload);

};

function onClickDownload(){
	window.open(canvas.toDataURL());
}

function onChange(evt){
	var file = evt.target;
	var files = file.files[0]; 

	if(files.type.indexOf('image')==-1){
		return;
	}

	var reader = new FileReader();

	reader.addEventListener('load',onLoadImageFile);

	reader.readAsDataURL(files);
}

function onLoadImageFile(evt){
	var imageUrl = evt.target.result;

	var img = new Image();

	img.onload = function(){
		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img,0,0,img.width,img.height);
		var arr = ctx.getImageData(0, 0, canvas.width, canvas.height);
    	imagePixel = arr.data;
	};

	img.src = imageUrl;
}

function onColorChange(evt){
	var newImage = ctx.createImageData(canvas.width, canvas.height);
	var pixels = imagePixel;


	var rgb = {r:parseInt(redRange.value),g:parseInt(greenRange.value),b:parseInt(blueRange.value)};

    for(var i = 0; i < pixels.length; i+=4){
        var r = pixels[i]+rgb.r;
        
        var g = pixels[i + 1]+rgb.g;
        
        var b = pixels[i + 2]+rgb.b;
        
        var a = pixels[i + 3];

        r = (r>255)?255:r;
        r = (r<0)?0:r;

        g = (g>255)?255:g;
        g = (g<0)?0:g;
        
        b = (b>255)?255:b;
        b = (b<0)?0:b;

	   	newImage.data[i] = r;
        newImage.data[i + 1] = g;
        newImage.data[i + 2] = b;
        newImage.data[i + 3] = a;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(newImage, 0, 0);
}