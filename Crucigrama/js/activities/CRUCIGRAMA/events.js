//==========================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio del Crucigrama)
//==========================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion
//Dependiendo de si es táctil o no aplicamos unos eventos u otros

	var respuestasDadas = [];

    function comenzar()
    {
        ayudas=Array();

        for(i=0;i<pa.length;i++){
            ayudas[i]=Array();
            ayudas[i]["letra"]=0;
			ayudas[i]["palabra"]=0;            
			respuestasDadas[i] = [];
        }
        intentos=0;
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
     	if($('#all').width() >= 600) $('#'+primera).click();
     	
     	if(is_touch_device())
		{
			var myScroll;
			myScroll = setTimeout(function(){new iScroll('wrapper', { zoom:true })},2000);
		}
		else
		{
			$('#wrapper').css("overflow","hidden");
			$('#lienzo').mousedown(capturarCoordenadasInicio);
			$('#lienzo').mouseup(pararDesplazamiento);
			$('#lienzo').mousemove(desplazarLienzo);
			
			$('#scroller').addClass('cursorGrab');
			document.getElementById('scroller').onmousewheel = wheel;
    		document.getElementById('scroller').addEventListener('DOMMouseScroll', wheel, false);
		}
   	}

//Redimensionamos el tamaño y posicion de las casillas del crucigrama cuando cambia el tamaño de la pantalla, controlamos el zoom del elemento 'scroller' con los botones inferiores para ello
//Esta variable controla la escala que aplicamos al lienzo
var escala = 1;
//Esta variable almacena la escala anterior, para mostrar o no el indicador de escala
var escalaAnterior = 1;
//Esta variable controla el zoom entre el zoom con los botones, y el zoom del iscroll en dispositivos táctiles
var controlZoom = 0;

	function redimensionar(tipo)
	{
		if((tipo == "redi")&&(redimensionamos == 0))
		{
    		//Una vez conocemos la cantidad de celdas, establecemos el tamaño de las mismas en función de las dimensiones disponibles
			var tamMaximoAncho = $('#wrapper').width();
			var tamMaximoAlto = $('#wrapper').height();
		
			tamCasillaAncho = parseInt(tamMaximoAncho/columnas);
			tamCasillaAlto = parseInt(tamMaximoAlto/filas);
		
			if(tamCasillaAncho >= tamCasillaAlto)
			{ 
				tamCasilla = tamCasillaAlto;
				tamMaximo = tamMaximoAlto;
				$('#scroller').width(tamCasilla*columnas);
			}
			else 
			{
				tamCasilla = tamCasillaAncho;
				tamMaximo = tamMaximoAncho;
				$('#scroller').width($('#wrapper').width());
			}
		
			$('#scroller').addClass('unselectable');
			
			$('#lienzo').css('background-size',""+tamCasilla+"px "+tamCasilla+"px");
			
			if(tamCasilla < 12) tamNumerito = 2;
			else if(tamCasilla < 15) tamNumerito = 3;
			else if(tamCasilla < 18) tamNumerito = 4;
			else if(tamCasilla < 21) tamNumerito = 5;
			else if(tamCasilla < 24) tamNumerito = 6;
			else if(tamCasilla < 26) tamNumerito = 7;
			else if(tamCasilla < 30) tamNumerito = 8;
			else if(tamCasilla < 35) tamNumerito = 9;
			else if(tamCasilla < 40) tamNumerito = 10;
			else if(tamCasilla < 45) tamNumerito = 11;
			else tamNumerito = 12;
			
			var px = 0;
			var py = 0;
	
			for(i=0;i<filas;i++)
			{
				if(i<10) var ix = "0"+i;
				else var ix = i;		
				for(j=0;j<columnas;j++)
				{
					pxt=px+"px";
					pyt=py+"px";
		
					if(j<10) var jy = "0"+j;
					else var jy = j;
			
					$("#c"+ix+"_"+jy).css({"top":pyt,"left":pxt});	
					$("#sp"+ix+"_"+jy).css({"top":pyt,"left":pxt,"font-size":tamNumerito+"px"});	
					
					px = px + (tamCasilla);
			
					var tamLetra = tamCasilla-8;
					if(tamLetra < 7) tamLetra = 7;
					$("#c"+ix+"_"+jy).css({"width":tamCasilla+"px","height":tamCasilla+"px","font-size":tamLetra+"px", "line-height":tamCasilla+"px"});
				}
				px = 0;
				py = py + (tamCasilla);
			}	
	
			//Asignamos la altura al lienzo
			var altoLienzo = tamCasilla*filas;
			$('#lienzo').height(altoLienzo);
			
			//Recolocamos el lienzo en el centro
			var margenX = ($("#wrapper").width()-$("#scroller").width())/2;
			$('#scroller').css("left",margenX);
			
			//Reinicializamos la descripción Inicial de Usuario
			cargarDescripcionInicio();
		}
		else if(redimensionamos == 1)
		{
			redimensionamos = 0;
		}
		
		if(tipo == "encaja")
		{	
			controlZoom = 1;
			
			$('#encajarEnPantalla').addClass('disable');
			$('#zoomDown').addClass('disable');
			$('#zoomUp').removeClass('disable');
			
			escalaAnterior = escala;
			escala = 1;
			
			//Recolocamos el lienzo en el centro
			var margenX = ($("#wrapper").width()-$("#scroller").width())/2;
			$('#scroller').css("left",margenX);
	
			if(escala != escalaAnterior)
			{
				var zoom = parseInt(100*escala);
				$('#infoZoom').html(zoom+"%");
				$('#infoZoom').fadeIn(500);
				setTimeout(function(){$('#infoZoom').fadeOut(500)},2000);
			}
	
			actualX = 0;
			actualY = 0;
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+actualX+"px,"+actualX+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualX+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualX+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualX+")");

		}
		if(tipo == "up")
		{	
			controlZoom = 1;
			
			$('#encajarEnPantalla').removeClass('disable');
			$('#zoomDown').removeClass('disable');
			if(escala >= 4.9) $('#zoomUp').addClass('disable');
			
			if(escala != 5)
			{
				escalaAnterior = escala;
				escala = escala + 0.1;
				if(escala >= 5) escala = 5;
		
				if(escala != escalaAnterior)
				{
					var zoom = parseInt(100*escala);
					$('#infoZoom').html(zoom+"%");
					$('#infoZoom').fadeIn(500);
					setTimeout(function(){$('#infoZoom').fadeOut(500)},2000);
				}
		
				$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+actualX+"px,"+actualY+"px)");
				$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
				$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
				$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
			}
		
		}
		if(tipo == "down")
		{	
			controlZoom = 1;
			
			if(escala == 1.1) 
			{
				$('#encajarEnPantalla').addClass('disable');
				$('#zoomDown').addClass('disable');
			}
			$('#zoomUp').removeClass('disable');
			
			if(escala != 1)
			{
				escalaAnterior = escala;
				escala = escala - 0.1;
				if(escala <= 1) escala = 1;
		
				if(escala != escalaAnterior)
				{
					var zoom = parseInt(100*escala);
					$('#infoZoom').html(zoom+"%");
					$('#infoZoom').fadeIn(500);
					setTimeout(function(){$('#infoZoom').fadeOut(500)},2000);
				}
		
				$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+actualX+"px,"+actualY+"px)");
				$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
				$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
				$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")");
		
				var limX = (($('#scroller').width() * escala - $('#scroller').width())/ 2) - (($('#wrapper').width()-$('#scroller').width())/2);
				if($('#wrapper').width() > $('#scroller').width()*escala) limX = 0;  
				var limY = ($('#scroller').height() * escala - $('#scroller').height())/ 2;
				var limYB = (($('#scroller').height() * escala - $('#scroller').height())/ 2) + ($('#scroller').height() - $('#wrapper').height());
			
				if(actualX >= limX)
				{
					$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+limX+"px,"+actualY+"px)");
					$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+limX+","+actualY+")");
					$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+limX+","+actualY+")");
					$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+limX+","+actualY+")");
					actualX = limX;
				}
				else if(actualX < -limX)
				{
					$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+"px,"+actualY+"px)");
					$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+actualY+")");
					$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+actualY+")");
					$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+actualY+")");
					actualX = -limX;
				}
				if(actualY >= limY)
				{
					$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+actualX+"px,"+limY+"px)");
					$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+limY+")");
					$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+limY+")");
					$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+limY+")");
					actualY = limY;
				}
				else if(actualY < -limYB)
				{
					$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+actualX+"px,"+(-limYB)+"px)");
					$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+(-limYB)+")");
					$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+(-limYB)+")");
					$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+actualX+","+(-limYB)+")");
					actualY = -limYB;
				}
		
				if(escala < 1)
				{
					$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+",0px,0px)");
					$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+",0,0)");
					$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+",0,0)");
					$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+",0,0)");
					actualX = 0;
					actualY = 0;
				}
			}
		}	
	}

//Funciones y variables que van a controlar el movimiento del elemento scroller al pulsar con el ratón y arrastrar
var activadoMover = 0;
var actualX = 0;
var actualY = 0;
var moviX = 0;
var moviY = 0;
	
	function capturarCoordenadasInicio(ev)
	{	
		$('body').addClass('cursorGrabbing');
		
		var matrizInicioMoz = "matrix("+escala+",0,0,"+escala+","+actualX+"px,"+actualY+"px)";
		var matrizInicio = "matrix("+escala+",0,0,"+escala+","+actualX+","+actualY+")";
		$('#scroller').css("-moz-transform", matrizInicioMoz);
		$('#scroller').css("-ms-transform", matrizInicio);
		$('#scroller').css("-o-transform", matrizInicio);
		$('#scroller').css("-webkit-transform", matrizInicio);
	
		if(activadoMover == 1) activadoMover = 0;
		else activadoMover = 1;
		inicioX = ev.clientX;
		inicioY = ev.clientY;
	}

	function pararDesplazamiento(ev)
	{
		$('body').removeClass('cursorGrabbing');
		
		activadoMover = 0;
	
		var matriz = $('#scroller').css("-moz-transform");
		if(matriz == undefined) matriz = $('#scroller').css("-ms-transform");
		if(matriz == undefined) matriz = $('#scroller').css("-o-transform");
		if(matriz == undefined) matriz = $('#scroller').css("-webkit-transform");
	
		var arrayMatriz = matriz.split(',');
		trasX = parseInt(arrayMatriz[4]);
		trasY = parseInt(arrayMatriz[5]);
	
		actualX = trasX;
		actualY = trasY;
	
		var limX = (($('#scroller').width() * escala - $('#scroller').width())/ 2) - (($('#wrapper').width()-$('#scroller').width())/2);
		if($('#wrapper').width() > $('#scroller').width()*escala) limX = 0;  
		var limY = ($('#scroller').height() * escala - $('#scroller').height())/ 2;
		var limYB = (($('#scroller').height() * escala - $('#scroller').height())/ 2) + ($('#scroller').height() - $('#wrapper').height());
		
		if(trasX >= limX)
		{
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+limX+"px,"+moviY+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+limX+","+moviY+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+limX+","+moviY+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+limX+","+moviY+")");
			moviX = limX;
			actualX = limX;
		}
		else if(trasX < -limX)
		{
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+"px,"+moviY+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+moviY+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+moviY+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+(-limX)+","+moviY+")");
			moviX = -limX;
			actualX = -limX;
		}
		if(trasY >= limY)
		{
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+moviX+"px,"+limY+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+limY+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+limY+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+limY+")");
			moviY = limY;
			actualY = limY;
		}
		else if(trasY < -limYB)
		{
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+moviX+"px,"+(-limYB)+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+(-limYB)+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+(-limYB)+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+(-limYB)+")");
			moviY = -limYB;
			actualY = -limYB;
		}
	
		if(escala < 1)
		{
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+",0px,0px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+",0,0)");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+",0,0)");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+",0,0)");
			actualX = 0;
			actualY = 0;
		}
	}

	function desplazarLienzo(ev)
	{
		var movX = ev.clientX;
		var movY = ev.clientY;
		if(activadoMover == 1)
		{
			moviX = movX-inicioX + actualX;
			moviY = movY-inicioY + actualY;
			$('#scroller').css("-moz-transform","matrix("+escala+",0,0,"+escala+","+moviX+"px,"+moviY+"px)");
			$('#scroller').css("-ms-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+moviY+")");
			$('#scroller').css("-o-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+moviY+")");
			$('#scroller').css("-webkit-transform","matrix("+escala+",0,0,"+escala+","+moviX+","+moviY+")");
		}
	}
				
//Actualizamos la palabra anterior cuando hacemos click en la palabra, o cuando focalizamos con la combinación de letras y focalizamos la casilla
//Esta variable contendra el numero de palabra a la que pertenece la casilla que ha estado focalizada justamente antes, sobre todo para controlar las intersecciones entre palabras. Por eso, cuando focalizamos mediante conbinacion de teclas o haciendo click, esta variable toma el valor de dicha palabra
var NpalabraAnterior = -1;
//Controlamos si el foco viene de un evento click o no
var clickar = 0;

	function actualizar(event)
	{
		//Asi sabemos ya que el foco viene de un click
		clickar = 1;
		//Cogemos el id del elemento pulsado y activamos la palabra que le corresponde
		id = event.target.getAttribute("id");
    	NpalabraAnterior = event.target.getAttribute("class").substring(9,11);
    	NpalabraAnterior = parseInt(NpalabraAnterior,10);
    	activar(id);
    	//Activamos el input donde vamos a ir escribiendo y lo colocamos en la misma posicion de la casilla seleccionada
    	//Solo en pantallas grandes, ya que si es de menos de 600 pixeles saltará una alerta y se focalizará al pulsar sobre responder
  		if($('#all').width() >= 600) $('#control').focus();
  		
  		//Colocamos el input en el elemento seleccionado para poder escribir
  		$('#control').css("top",document.getElementById(id).style.top);
		$('#control').css("left",document.getElementById(id).style.left);
	}

//Si hacemos click sobre el numero que indica la palabra en la celda, también activamos la palabra
	
	function clickCelda(event)
	{
		var idNumerito = event.target.getAttribute("id");
    	var idCelda = "c"+idNumerito.substring(2,7);
    	$("#"+idCelda).click();
	}
				
//Activa las casillas correspondientes a la palabra de la casilla focalizada
//Esta variable controla la primera casilla focalizada, para lanzar el contador de tiempo
var lanzar = 0;

    function activar(valorId)
 	{	
    	//La primera vez que hacemos focalizamos una casilla lanzamos el contador de tiempo
    	if(lanzar == 0) 
    	{
    		idInterval = setInterval(contador,1000);
    		lanzar = 1;
    	}
					
		//Desactivamos todas las casillas
		desactivar("activo");
					
		//Extraemos la clase y el identificador de la casilla que ha llamado a lña función
		//A partir de aquí, tenemos disponible el id y la clase del elemento seleccionado, para utilizarlo en cualquier función
		id = valorId;
		clase = document.getElementById(id).className;
					
		//Controlamos que en las intersecciones no focalice la palabra equivocada y se mantenga en la actual
		//Dependiendo de cuál ha sido la casilla activa anterior, nos mantenemos en esa palabra
		var Npalabra = clase.substring(9,11);
		Npalabra = parseInt(Npalabra,10);
		var Npalabra2 = clase.substring(20,22);
		Npalabra2 = parseInt(Npalabra2,10);
					
		if((Npalabra != NpalabraAnterior)&&(Npalabra2 == NpalabraAnterior)) 
		{
			Npalabra = Npalabra2;
			if(Npalabra2<10) Npalabra2 = "0"+Npalabra2;
			claseParcial = "e"+Npalabra2; 
		}
		else
		{ 
			claseParcial = clase.substring(8,11);
		}
		
		//Activamos las casillas de la palabra que corresponda					
		$("."+claseParcial).addClass("activaPalabra");
		
		//Activamos la casilla focalizada
		$("#"+id).addClass("foco");
		
		//Colocamos el input donde escribimos en la misma posicion de la casilla seleccionada
		$('#control').css("top",document.getElementById(id).style.top);
		$('#control').css("left",document.getElementById(id).style.left);		
		
		//Mostramos la pista correspondiente a la palabra activa
		mostrarPista(Npalabra);
	}
						
//Desactiva todas las casillas, y deja el crucigrama como al inicio

    function desactivar(opcion)
    {	
		$(".activa").removeClass("foco");
		$(".activa").removeClass("activaPalabra");
		$(".activa").removeClass("ok");
		$(".activa").removeClass("error");
		clase = "";
		id = "";
		claseParcial = "";
		//Si la desactivación viene por fin de palabra, desfocalizamos el input
		if(opcion == "fin")
		{
			$('#control').blur();
			var audio = document.getElementById("audio_0");
			if(audio != null)
			{
				$('#iconoAudio').removeClass("pPause");
				$('#iconoAudio').addClass("pPlay");
				audio.pause();
				clearTimeout(timeoutCanvas);
			}
			//Cuando terminamos de escribir una palabra, volvemos al estado original del crucigrama
			if(escala != 1)
			{
				redimensionar('encaja');
			}
		}
	}  
         		
//Muestra la pista correspondiente, en función de la palabra que este focalizada
//Mediante esta variable, controlamos la pista mostrada, para no volver a mostrarla en cada letra de cada palabra
var Nmostrado = -1;
//Esta variable contendra el identificador del timeout que va dibujando el canvas del reproductor de audio 
var timeoutCanvas = 0;
	
	function mostrarPista(Npalabra)
	{	
		var tipo = ti[Npalabra];
		var valorPista = de[Npalabra];
		
		//Solo volvemos a cargar la pista si cambiamos de palabra o hacemos click
		if((clickar == 1)||(Nmostrado != Npalabra))
		{
			var audio = document.getElementById("audio_0");
			if(audio != null)
			{
				$('#iconoAudio').removeClass("pPause");
				$('#iconoAudio').addClass("pPlay");
				audio.pause();
				clearTimeout(timeoutCanvas);
			}
			activarPista();
			clickar = 0;
			
			$('#pista').show();
			$("#nPalabra").text(Npalabra+1);
			
			if(tipo == "texto")
			{	
				$("#pistaSonidoPrincipal").hide();
				$("#pista").html(valorPista);	
			}
			else if(tipo == "imagen")
			{
				//Esta variable controlara el error de imagen
				var errorImagen = 0;
				
				var rutaPista = rutaRecursos+valorPista;
				
				$("#pistaSonidoPrincipal").hide();
				$('#pista').html("<img src='img/loader.gif'>");
				var img = new Image();
				img.src = rutaPista;
				img.id = 'imagenPista';
				img.onload = function() {errorImagen=1;$("#pista").html('');$("#pista").append(img);}
				setTimeout(function(){if(errorImagen == 0)errores(0,-1);},5000);
			}
			else if(tipo == "audio")
			{
				var rutaPista = rutaRecursos+valorPista;
                var rutaPistaOgg = rutaRecursosInicio+valorPista;
	
				pos = -Math.PI/2;
				posS = pos + salto;
				clearTimeout(timeoutCanvas);
				$(".timeSound").show();
				$("#pistaSonidoPrincipal").show();
				$("#pista").text("");
				$("#pista").hide();
					
				//var cadena = "<audio id='audio_0' src='"+rutaPista+"' onError='errores(1,-1);' type='audio/mpeg'></audio>";
				var cadena = "<audio id='audio_0'><source src='"+rutaPista+"' type='audio/mpeg'></source><source src='"+rutaPista.substring(0,rutaPista.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaPistaOgg.substring(0,rutaPistaOgg.length-3)+"ogg' onError='errores(1,-1);' type='audio/ogg'></source></audio>";
				
				cadena += "<div class='groupPlayer' id='contenedorPlayer_0'>";
				cadena += "<div id='iconoAudio_0' class='iPlayer pPlay'></div>";
				cadena += "<div class='playerEduca'></div>";
				cadena += "<canvas id='reproductor_0' class='canvasPlayer' width='131' height='131'></canvas>";
				cadena += "<div class='bgPlayer'></div>";
				cadena += "</div>";
				$("#imageSound").html(cadena);
					
				$('#contenedorPlayer_0').click(function(){reproducirClick("audio_0");if($('#all').width() >= 600) if(id != "") $('#control').focus();});
				controlDuracion("audio_0");
			}
		}
		Nmostrado = Npalabra;
	}
				
//Controlamos el audio y sus parámetros de tiempo transcurrido y duración de la pista
//Reproducimos el elemento de audio que le indicamos
	
	function reproducir(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		document.getElementById(media).play();
		$('#iconoAudio_'+numElemento).removeClass('pPlay');
		$('#iconoAudio_'+numElemento).addClass('pPause');
	}
	
//Reproducimos el elemento de audio que le indicamos cuando clickamos sobre el Play

	function reproducirClick(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		if($('#iconoAudio_'+numElemento).hasClass("pPlay"))
		{
			document.getElementById(media).play();
			$('#iconoAudio_'+numElemento).removeClass("pPlay");
			$('#iconoAudio_'+numElemento).addClass("pPause");
			setTimeout(function(){actualizarReproductor(numElemento)},tiempoSalto);
			controlTiempo(media);
		}
		else
		{
			$('#iconoAudio_'+numElemento).removeClass("pPause");
			$('#iconoAudio_'+numElemento).addClass("pPlay");
			document.getElementById(media).pause();
			clearTimeout(timeoutCanvas);
		}
	}

//Controlamos el tiempo de la pista de audio y lo vamos actualizando en el indicador
	
	function controlTiempo(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		var audio = document.getElementById(media);
		var seg= audio.currentTime;
		var h = Math.floor(seg / 3600);
		seg=seg % 3600;
		var min =Math.floor(seg / 60);
		seg = Math.floor(seg % 60);
		if (seg.toString().length < 2) seg="0"+seg;
		if (min.toString().length < 2) min="0"+min;
		document.getElementById('tiempo_'+numElemento).innerHTML = min+":"+seg;
		
		if(!audio.ended)
		{			
			setTimeout(function(){controlTiempo(media);},1000);
		}
		else
		{
			pos = -Math.PI/2;
			posS = pos + salto;
			$('#iconoAudio_'+numElemento).removeClass('pPause');
			$('#iconoAudio_'+numElemento).addClass('pPlay');
			var miLienzo = document.getElementById('reproductor_'+numElemento);
			var lienzo = miLienzo.getContext('2d');
			lienzo.clearRect(0,0,240,240);
			clearTimeout(timeoutCanvas);
			document.getElementById('tiempo_'+numElemento).innerHTML = "00:00";
			try{audio.currentTime = 0;}catch(e){}
			audio.pause();
			if(audio.currentTime != 0) document.getElementById(media).load();
		}
	}

//Cargamos la duración de la pista en el indicador
		
	function controlDuracion(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		var audio = document.getElementById(media);
		if(!isNaN(audio.duration))
		{
			duracion = audio.duration;
			var seg= audio.duration;
			var h = Math.floor(seg / 3600);
			seg=seg % 3600;
			var min =Math.floor(seg / 60);
			seg = Math.floor(seg % 60);
			if (seg.toString().length < 2) seg="0"+seg;
			if (min.toString().length < 2) min="0"+min;
			if(isNaN(min)) document.getElementById('duracion_'+numElemento).innerHTML = "--:--";
			else document.getElementById('duracion_'+numElemento).innerHTML = min+":"+seg;
			controlTiempo(media);
			actualizarReproductor(numElemento);
			reproducir(media);
		}
		else
		{
			setTimeout(function(){controlDuracion(media);},50);
		}
	}

//Vamos dibujando mediante canvas el circulo que va marcando el tiempo transcurrido de la pista
//Estas variables controlan los angulos que necesitamos para ir dibujando el círculo mediante canvas
var salto = 2*Math.PI/100;
var pos = -Math.PI/2;
var posS = pos + salto;	

	function actualizarReproductor(numElemento)
	{
		tiempoSalto = duracion/100*1000;
		var miLienzo = document.getElementById('reproductor_'+numElemento);
		var lienzo = miLienzo.getContext('2d');

		lienzo.beginPath();
		lienzo.strokeStyle = '#99CC33';
		lienzo.lineCap = 'round';
		lienzo.shadowOffsetX = 0;
		lienzo.shadowOffsetY = 0;
		lienzo.shadowBlur = 10;
		lienzo.shadowColor = "rgba(153, 204, 51, 0.6)";
		lienzo.lineWidth = 10.0;
		lienzo.arc(65,65,60,pos,posS,false);
		lienzo.stroke();
		
		pos = posS;
		posS = posS + salto;
		if(posS <= 3*Math.PI/2)
		{
			timeoutCanvas = setTimeout(function(){actualizarReproductor(numElemento)},tiempoSalto);
		}
		else
		{
			pos = -Math.PI/2;
			posS = pos + salto;
		}
	}

//Gestionamos la imagen que presentamos en el reproductor de audio mientras estamos reproduciento, o mientras esta parado
	
	function gestionaAudio(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		if($('#iconoAudio_'+numElemento).hasClass('pPlay'))
		{
			document.getElementById(media).play();
			$('#iconoAudio_'+numElemento).removeClass('pPlay');
			$('#iconoAudio_'+numElemento).addClass('pPause');
		}
		else
		{
			document.getElementById(media).pause();
			$('#iconoAudio_'+numElemento).removeClass('pPause');
			$('#iconoAudio_'+numElemento).addClass('pPlay');
		}
	}

//Si pulsamos la tecla de borrar en una casilla vacía, salta a la casilla anterior y la borra

	function borra()
	{
		var Npalabra = clase.substring(9,11);
		Npalabra = parseInt(Npalabra,10);
		var Npalabra2 = clase.substring(20,22);
		Npalabra2 = parseInt(Npalabra2,10);
					
		if(Npalabra != NpalabraAnterior) if(Npalabra2 == NpalabraAnterior) Npalabra = Npalabra2;
		
  		var direccion = di[Npalabra];
  		var col = parseInt(id.substring(4,6),10);
  		var colM = col-1;
  		var fil = parseInt(id.substring(1,3),10);
  		var filM = fil-1;
  					
  		if(col<10) var colx = "0"+col;
		else colx = col;
		if(colM<10) var colMx = "0"+colM;
		else colMx = colM;
		
		if(fil<10) var fily = "0"+fil;
		else fily = fil;
		if(filM<10) var filMy = "0"+filM;
		else filMy = filM;
		
		//Desactivamos si nos salimos de los limites o si la casilla no es de la clase activa				
  		if(direccion == "H")
  		{
  			if(!$("#c"+fily+"_"+colMx).hasClass('activa')) return false; 
  			else if((colM >= columnas)||(colM < 0)) return false;
  			else {activar("c"+fily+"_"+colMx);$("#c"+fily+"_"+colMx).html("");}
  		}
  		else if(direccion == "V") 
  		{
  			if(!$("#c"+filMy+"_"+colx).hasClass('activa')) return false;
  			else if((filM >= filas)||(filM < 0)) return false;
  			else {activar("c"+filMy+"_"+colx);$("#c"+filMy+"_"+colx).html("");}
  		}
	}	
				
//Nos movemos por las casillas al pulsar las teclas de movimiento

	function mueve(dir)
	{
		var Npalabra = clase.substring(9,11);
		var direccion = di[Npalabra];
  		var col = parseInt(id.substring(4,6),10);
  		var colM = col+1;
  		var colMi = col-1;
  		var fil = parseInt(id.substring(1,3),10);
  		var filM = fil+1;
  		var filMi = fil-1;
  		
  		if(col<10) var colx = "0"+col;
		else colx = col;
		if(colM<10) var colMx = "0"+colM;
		else colMx = colM;
		if(colMi<10) var colMxi = "0"+colMi;
		else colMxi = colMi;
	
		if(fil<10) var fily = "0"+fil;
		else fily = fil;
		if(filM<10) var filMy = "0"+filM;
		else filMy = filM;
		if(filMi<10) var filMyi = "0"+filMi;
		else filMyi = filMi;
  					
		if(dir == "d") {if(!$("#c"+fily+"_"+colMx).hasClass('activa')) desactivar('fin'); else activar("c"+fily+"_"+colMx);}
		if(dir == "i") {if(!$("#c"+fily+"_"+colMxi).hasClass('activa')) desactivar('fin'); else activar("c"+fily+"_"+colMxi);}
		if(dir == "a") {if(!$("#c"+filMy+"_"+colx).hasClass('activa')) desactivar('fin'); else activar("c"+filMy+"_"+colx);}
		if(dir == "b") {if(!$("#c"+filMyi+"_"+colx).hasClass('activa')) desactivar('fin'); else activar("c"+filMyi+"_"+colx);}
	}
				
//En el momento que escribimos una letra, la pasa del input a la casilla, la convierte a mayusculas y salta a la siguiente casilla
//Tenemos en cuenta la orientación de la palabra
//Estos arrays contendran las casillas sobre las que añadimos un DIV para crer la animación, para luego ir eliminando dichos DIVs para que todo funcione correctamente
var controlAnimacion = [];
var contenidoAnimacion = [];

//Quitamos el DIV que metemos en las casillas para poder hacer la animacion

	function quitaLetra()
	{
		for(i=0;i<controlAnimacion.length;i++)
		{
			$("#"+controlAnimacion[i]).html(contenidoAnimacion[i]);
			delete controlAnimacion[i];
			delete contenidoAnimacion[i];
		}
	}
					

//Mostramos la letra correcta en la casilla focalizada

	function ayudal()
	{
		if(id != "") {
			var Npalabra = clase.substring(9,11);
			Npalabra = parseInt(Npalabra,10);
			var fila = fi[Npalabra];
			var columna = co[Npalabra];
			var direccion = di[Npalabra];
	
			if(direccion == "H")
			{
				var posicion = parseInt(id.substring(4,6),10)-columna;
			}	
			if(direccion == "V")
			{
				var posicion = parseInt(id.substring(1,3),10)-fila;
			}
	
			var palabra = pa[Npalabra];
            ayudas[Npalabra]["letra"]=ayudas[Npalabra]["letra"]+1;
			var letra = palabra.substring(posicion,posicion+1);
			if($("#"+id).html() != letra)
			{ 
				actualizaPuntos(1);
			}
			ponerLetra(letra);
			$("#sinfoco").focus();
			$("#control").focus();
		}
	}

//Muestro la palabra correcta que pertenece a la casilla focalizada

	function ayudap()
	{
		if(id != "")
		{
			var Npalabra = claseParcial.substring(1,3);
			Npalabra = parseInt(Npalabra,10);
			var fila = fi[Npalabra];
			var columna = co[Npalabra];
			var direccion = di[Npalabra];
			var palabra = pa[Npalabra];
            ayudas[Npalabra]["palabra"]=ayudas[Npalabra]["palabra"]+1;
			if(columna<10) var columnax = "0"+columna;
			else columnax = columna;
		
			if(fila<10) var filay = "0"+fila;
			else filay = fila;
					
			var contador = 0;
			if(direccion == "V")
			{
				var cont=0;
				for(i=fila;i<=(palabra.length+fila-1);i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
				
					if(i == fila) id = "c"+ix+"_"+columnax;
					var letra = palabra.substring(cont,cont+1);
					if($("#c"+ix+"_"+columnax).html() != letra) contador ++;
	
					ponerLetra(letra);
					$("#sinfoco").focus();
					$("#control").focus();
					cont++;
				}
			}
			if(direccion == "H")
			{
				var cont=0;
				for(j=columna;j<=(palabra.length+columna-1);j++)
				{
					if(j<10) var jy = "0"+j;
					else var jy = j;
				
					if(j == columna) id = "c"+filay+"_"+jy;
					var letra = palabra.substring(cont,cont+1);
					if($("#c"+filay+"_"+jy).html() != letra) contador ++; 
				
					//Añadimos la clase pistaLetra y luego se la quitamos para crear la animación
					ponerLetra(letra);
					$("#sinfoco").focus();
					$("#control").focus();
					cont++;
				}
			}
			desactivar('fin');
			actualizaPuntos(contador);
			var audio = document.getElementById("audio_0");
			if(audio != null)
			{
				$('#iconoAudio').removeClass("pPause");
				$('#iconoAudio').addClass("pPlay");
				audio.pause();
				clearTimeout(timeoutCanvas);
			}
		}
	}
				
//Actualizar puntos en funcion de las ayudas solicitadas
//En esta variable tendremos la cantidad de letras de ayuda que hemos solicitada
var cantidadSolicitadas = 0;
var puntosRestados = 0;
var puntosReg = 100;

	function actualizaPuntos(numL)
	{
		var total = $(".activa").length;
		var descuento = 100 / total;
		cantidadSolicitadas += numL;
		cantidadActual =  (total - cantidadSolicitadas) * descuento - puntosRestados;
		if(cantidadActual < 0) cantidadActual = 0;
		puntosReg = parseInt(cantidadActual);
		$("#numPuntos").html(parseInt(cantidadActual));
	}
    
    function restaPuntos(cant)
	{
		var total = $(".activa").length;
		var descuento = 50 / total;
        var puntosActual = parseInt($("#numPuntos").html(),10);
		cantidadActual = puntosActual - cant*descuento;
        puntosRestados += parseInt(cant*descuento);
		if(cantidadActual < 0) cantidadActual = 0;
        puntosReg = parseInt(cantidadActual);
		$("#numPuntos").html(parseInt(cantidadActual));
        if(parseInt(cantidadActual) == 0)
        {
            $('#btnComprobar').unbind("click");
			cargarPantallaFinal('intentos',getDatosRespuestas(0));
        }
	}
    
    function finPuntos(cant)
	{
		var total = $(".activa").length;
		var descuento = 100 / total;
        var puntosActual = parseInt($("#numPuntos").html(),10);
		cantidadActual = puntosActual - cant*descuento;
		if(cantidadActual < 0) cantidadActual = 0;
		$("#numPuntos").html(parseInt(cantidadActual));
        puntosReg = parseInt(cantidadActual);
	}
				
//Comprobar si el contenido introducido es el correcto letra por letra

	function corregir(tipo)
	{
	   intentos++;
	   contadorErrores = 0;
		//Por si se ha quedado alguna celda con el DIV de la animación los quitamos
		quitaLetra();
		//Si hay algun audio activo lo paramos para que no siga la reproducción
		var audio = document.getElementById("audio_0");
		if(audio != null) audio.pause();
		
		var error = 0;
		$(".activa").removeClass("foco");
		$(".activa").removeClass("activaPalabra");
	
		for(k=0;k<pa.length;k++)
		{
			fila = fi[k];
			columna = co[k];
			direccion = di[k];
			palabra = pa[k];
            resp="";
			
			if(columna<10) var columnax = "0"+columna;
			else columnax = columna;
			
			if(fila<10) var filay = "0"+fila;
			else filay = fila;
					
			cont = 0;
			
			if(direccion == "V")
			{
				for(i=fila;i<=(palabra.length+fila-1);i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
				
					var contenido = $("#c"+ix+"_"+columnax).html();
                    if(contenido != "undefined"){
						contenido = adaptarContenido(contenido);
                        resp+= $("#c"+ix+"_"+columnax).html();
                    }
                    
					var correcto = palabra.substring(cont,cont+1);

					if((contenido != "")||(tipo == "fin"))
					{
						if(contenido != correcto) 
						{
                            if(!$("#c"+ix+"_"+columnax).hasClass("error")) contadorErrores++;
							else if(tipo == "fin") contadorErrores++;
							$("#c"+ix+"_"+columnax).addClass("error"); 
							error = 1;
						}
						else 
						{
							$("#c"+ix+"_"+columnax).addClass("ok");
						}
					}
					else
					{
						$("#c"+ix+"_"+columnax).addClass("error");
						error = 1;
					}
					cont++;
				}
			}
		
			if(direccion == "H")
			{
				for(j=columna;j<=(palabra.length+columna-1);j++)
				{
					if(j<10) var jy = "0"+j;
					else var jy = j;
					
					var contenido = $("#c"+filay+"_"+jy).html();
					var correcto = palabra.substring(cont,cont+1);
                    if(contenido != "undefined"){
						contenido = adaptarContenido(contenido);
                        resp+= $("#c"+filay+"_"+jy).html();
                    }
					if((contenido != "")||(tipo == "fin"))
					{
						if(contenido != correcto) 
						{
						    if(!$("#c"+filay+"_"+jy).hasClass("error")) contadorErrores++;
                            else if(tipo == "fin") contadorErrores++;
							$("#c"+filay+"_"+jy).addClass("error");
							error = 1;
						}
						else 
						{
							$("#c"+filay+"_"+jy).addClass("ok"); 
						}
					}
					else
					{
						$("#c"+filay+"_"+jy).addClass("error");
						error = 1;
					}
					cont++;
				}
			}
            if(resp==palabra){
                correcto=1;
            }
            else {
                correcto=0;
			}
			var respuestasDadasParcial = [];
			respuestasDadasParcial['respuesta'] = resp;
			respuestasDadasParcial['correcta'] = correcto;
			respuestasDadas[k].push(respuestasDadasParcial);
		}
        
        if(tipo == "fin") error = 2;
        
		if(error == 0)
		{ 	
			$('#btnComprobar').unbind("click");
			//Si todo esta correcto, mostramos pantalla final
			if(puntosReg >= 50){
				cargarPantallaFinal('OK',getDatosRespuestas(1));
			} 
            else{
				cargarPantallaFinal('noSuperada',getDatosRespuestas(0));
            }
		}
		else
		{
			actualizarIntentos();
            if(tipo == "fin") finPuntos(contadorErrores);
            else restaPuntos(contadorErrores);
			var audio = document.getElementById("audio_0");
			if(audio != null)
			{
				$('#iconoAudio').removeClass("pPause");
				$('#iconoAudio').addClass("pPlay");
				audio.pause();
				clearTimeout(timeoutCanvas);
			}
		}
	}
	
//Actualizamos los intentos
	
	function actualizarIntentos()
	{
		if(lanzar == 1) 
    	{
			var cadenaIntentos = $('#numIntentos').text();
			var pos = cadenaIntentos.indexOf("/");
			var numeroIntentos = parseInt(cadenaIntentos.substring(0,pos+1));
			if(numeroIntentos <= numero_intentos-1)
			{
				numeroIntentos++;
				cadenaIntentos = numeroIntentos+"<sup>/"+numero_intentos+"</sup>";
				$('#numIntentos').html(cadenaIntentos);
				$('#cajaIntentos').addClass('alertLuz');
				setTimeout(function(){$('#cajaIntentos').removeClass('alertLuz');},1000);
			}
		
			if(numeroIntentos == numero_intentos)
			{
				$('#btnComprobar').unbind("click");
				cargarPantallaFinal('intentos',getDatosRespuestas(0));
			}
		}
	}
	
//Funcion que controla el tipo de error cuando no disponemos del audio o de la imagen			
	
	function errores(tipo,numero)
	{	
		var mensajeError = "<div class='message mError'>";
		mensajeError += "<div class='titMessage'></div>";
		mensajeError += "<div class='descMessage'></div>";
		mensajeError += "<div class='iMessage'></div>";
		mensajeError += "</div>";
		
		//Error al cargar la imagen
		if(tipo == 0)
		{	
			if(numero == -1)
			{
				$('#pista').html(mensajeError);
			}
			else
			{
				$("#pistaImagenFinal_"+numero).html(mensajeError);
			}
			$('.titMessage').text(txtTituloErrorImagen);
			$('.descMessage').text(txtErrorImagen);
		}
		//Error al cargar el audio
		else if(tipo == 1)
		{
			if(numero == -1)
			{
				$("#imageSound").html(mensajeError);
				$('#pista').hide();
				$(".timeSound").hide();
			}
			else
			{
				$("#imageSound_"+numero).html(mensajeError);
				$(".timeSound").hide();
			}
			$('.titMessage').text(txtTituloErrorAudio);
			$('.descMessage').text(txtErrorAudio);
		
		}
	}
	
//Completamos la pantalla final con la corrección de las palabras y su feedback si esque lo tiene

	function completarPantallaFinal()
	{		
		var palabraCorrecta;
		var palabraEscrita = "";
		for(k=0;k<pa.length;k++)
		{	
			//Creamos cada uno de los elementos de la pantalla final
			crearElementosFinal(k);
			
			//Una vez creado lo completamos con los parametros correspondientes
			$('#numRespuesta_'+k).html(k+1);
			
			palabraCorrecta = pa[k];
			
			if(k < 10) kx = "0"+k;
			else kx = k;
			
			casillasPalabra = $(".e"+kx);
			for(i=0;i<casillasPalabra.length;i++)
			{
				palabraEscrita += adaptarContenido(casillasPalabra[i].innerHTML);
			}
			if(palabraCorrecta == palabraEscrita)
			{
				$('#pCorrecta_'+k).html(palabraCorrecta);
				$('#pEscrita_'+k).hide();
			}
			else
			{
				$('#contentRespuesta_'+k).addClass('respuestaIncorrecta');
				$('#pCorrecta_'+k).html(palabraCorrecta);
				$('#pEscrita_'+k).html(palabraEscrita);
			}
			
			palabraEscrita = "";
		}
		
		//Inicializamos loe eventos de la pantalla final
		$('.accordionButton').click(function() {
			$('.accordionButton').removeClass('on');
	 		$('.accordionContent').slideUp('slow');
			if($(this).next().is(':hidden') == true) {
				$(this).addClass('on');
				$(this).next().slideDown('slow');
				pararAudio();
				cargarFinal(this);
		 	}
		 	else
		 	{
		 		pararAudio();
		 	}
		 	
		 	 
	 	});
		$('.accordionContent').hide();
	}

//Creamos cada uno de los elementos de la lista de la pantalla final

	function crearElementosFinal(k)
	{
		var tipo = ti[k];
		var cadenaHTML = "";
		
		cadenaHTML += "<li>";
		cadenaHTML += "<div class='accordionButton' id='accordion_"+k+"'>";
		cadenaHTML += "<div class='contentRespuesta' id='contentRespuesta_"+k+"'>";
		cadenaHTML += "<span class='numRespuesta' id='numRespuesta_"+k+"'>11</span>";
		cadenaHTML += "<span class='txtRespuesta'><span class='tachado' id='pEscrita_"+k+"'>buetsfadvvashsseri</span><span id='pCorrecta_"+k+"'>Buitrssfsdfegbseefse</span></span>";
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "<span title='"+txtInfoAdicional+"' class='iExtraInfo'></span>";
			}
		}
		cadenaHTML += "</div>";
		cadenaHTML += "</div>";
		cadenaHTML += "<div class='accordionContent'>";
		cadenaHTML += "<div class='contentInfoRespuesta'>";
		cadenaHTML += "<div class='contentPista'>";
		
		if(tipo == "texto")
		{
			cadenaHTML += "<div class='pistaTexto'><span id='pista_"+k+"'>Informaci&oacute;n sobre la palabra en formato Texto</span></div>";
		}
		else if(tipo == "imagen")
		{
			cadenaHTML += "<div class='pistaImagen' id='pistaImagenFinal_"+k+"'>";
        	cadenaHTML += "</div>";
        }
		else if(tipo == "audio")
		{
			var num = k+1;
			cadenaHTML += "<div class='pistaSonido'>";
			cadenaHTML += "<div class='imageSound' id='imageSound_"+num+"'></div>";
			cadenaHTML += "<div class='timeSound'><span id='tiempo_"+num+"' class='infoTime'>00:00</span> | <span id='duracion_"+num+"' class='infoTime'>00:00</span></div>";
			cadenaHTML += "</div>";
		}
		
		cadenaHTML += "</div>";
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "<div class='txtExtraInfo' id='txtExtraInfo_"+k+"'></div>";
       		}
       	}
        cadenaHTML += "</div>";				  
        cadenaHTML += "</div>";  				
        cadenaHTML += "</li>";
        
        $("#listaFinal").html($("#listaFinal").html()+cadenaHTML);       				   			
	}

//Cargamos cada uno de los contenidos de cada elemento al desplegarlo
	
	function cargarFinal(enlace)
	{
		var idAccordion = $(enlace).attr('id');
		var k = parseInt(idAccordion.substring(10,13),10);
		var tipo = ti[k];
		var valorPista = de[k];
			
			if(tipo == "texto")
			{	
				$('#pista_'+k).html(valorPista);	
			}
			else if(tipo == "imagen")
			{
				//Esta variable controlara el error de imagen
				var errorImagen = 0;
				
				var rutaPista = rutaRecursos+valorPista;
				
				$("#pistaImagenFinal_"+k).html("<img src='img/loader.gif'>");
				var img = new Image();
				img.src = rutaPista;
				img.onload = function() {errorImagen=1;$("#pistaImagenFinal_"+k).html('');$("#pistaImagenFinal_"+k).append(img);}
				setTimeout(function(){if(errorImagen == 0)errores(0,k);},2000);
			}
			else if(tipo == "audio")
			{
				$(".timeSound").show();
				
				var rutaPista = rutaRecursos+valorPista;
                var rutaPistaOgg = rutaRecursosInicio+valorPista;
				
				var num = k+1;
				//var cadena = "<audio id='audio_"+num+"' src='"+rutaPista+"' onError='errores(1,"+num+");' type='audio/mpeg'></audio>";
				var cadena = "<audio id='audio_"+num+"'><source src='"+rutaPista+"' type='audio/mpeg'></source><source src='"+rutaPista.substring(0,rutaPista.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaPistaOgg.substring(0,rutaPistaOgg.length-3)+"ogg' onError='errores(1,"+num+");' type='audio/ogg'></source></audio>";
				cadena += "<div class='groupPlayer' id='contenedorPlayer_"+num+"'>";
				cadena += "<div id='iconoAudio_"+num+"' class='iPlayer pPlay'></div>";
				cadena += "<div class='playerEduca'></div>";
				cadena += "<canvas id='reproductor_"+num+"' class='canvasPlayer' width='131' height='131'></canvas>";
				cadena += "<div class='bgPlayer'></div>";
				cadena += "</div>";
				$("#imageSound_"+num).html(cadena);
				
				$('#contenedorPlayer_'+num).click(function(){reproducirClick("audio_"+num);});
				controlDuracion("audio_"+num);
			}
			
			if(globalFeedback == 1) 
			{
				if(fe[k] != undefined)
				{
					$("#txtExtraInfo_"+k).html(fe[k]);
				}
			}
	}

//Paramos el audio tanto cuando cerramos un elemento como cuando abrimos otro para que no se sobrepongan
	
	function pararAudio()
	{
		pos = -Math.PI/2;
		posS = pos + salto;
		for(k=0;k<pa.length;k++)
		{	
			var audio = document.getElementById("audio_"+k);
			if(audio != null) audio.load();
			$('.imageSound').html('');
		}
	}

	function adaptarContenido(contenido) {
		switch (contenido) {
		case 'À':
		case 'Á':
		case 'Â':
		case 'Ã':
		case 'Ä':
		case 'Å':
			return 'A';
			break;
		case 'È':
		case 'É':
		case 'Ê':
		case 'Ë':
			return 'E';
			break;
		case 'Ì':
		case 'Í':
		case 'Î':
		case 'Ï':
		case 'Ĩ':
			return 'I';
			break;
		case 'Ò':
		case 'Ó':
		case 'Ô':
		case 'Õ':
		case 'Ö':
		case 'Ø':
			return 'O';
			break;
		case 'Ù':
		case 'Ú':
		case 'Û':
		case 'Ü':
		case 'Ů':
		case 'Ũ':
			return 'U';
			break;
		case 'Ý':
		case 'Ÿ':
			return 'Y';
			break;
		case 'Š':
			return 'S';
			break;
		case 'Ž':
			return 'Z';
			break;
		default:
			return contenido;
		}
	}

	function getDatosRespuestas(s) {
		var pos = 0;
		var datos = {};
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = [];
		for(posicion=0;posicion<respuestasDadas.length;posicion++) {
			for(posicion2=0;posicion2<respuestasDadas[posicion].length;posicion2++) {
				datos['r'][pos] = {};
				if (respuestasDadas[posicion][posicion2]['correcta'] == 1) {
					datos['r'][pos]['s'] = 1;
				} else {
					datos['r'][pos]['s'] = 0;
				}
				datos['r'][pos]['i'] = posicion;
				datos['r'][pos]['a'] = respuestasDadas[posicion][posicion2]['respuesta'];
				pos++;
			}
		}
		return datos;
	}

	function actualizaPuntosFinal(tipoAlerta) {

	}

	function procesarLetra(e) {
		if (e.ctrlKey == false) {
			switch (e.which) {
			case 8:
				if ($("#"+id).html() == "") {
					borra();
				} else {
					$("#"+id).html("");
				}
				break;
			case 39:
				mueve("d");
				break;
			case 37:
				mueve("i");
				break;
			case 38:
				mueve("b");
				break;
			case 40:
				mueve("a");
				break;
			default:
				letraTecleada = $("#control").val().charAt(0).toUpperCase();
				$("#control").val($("#control").val().substring(1));
				if (((letraTecleada >= 'A') && (letraTecleada <= 'Z')) || (letraTecleada == 'Ñ')) {
					ponerLetra(letraTecleada);
				}
			}
			$("#sinfoco").focus();
			$("#control").focus();
		}
	}

	function ponerLetra(letraTecleada) {
		$("#"+id).html("<div class='letra'>"+letraTecleada+"</div>");
		controlAnimacion.push(id);
		contenidoAnimacion.push(letraTecleada);
		setTimeout(quitaLetra,800);
		var Npalabra = clase.substring(9,11);
		Npalabra = parseInt(Npalabra,10);
		var Npalabra2 = clase.substring(20,22);
		Npalabra2 = parseInt(Npalabra2,10);
				
		if(Npalabra != NpalabraAnterior) if(Npalabra2 == NpalabraAnterior) Npalabra = Npalabra2;
	
		var direccion = di[Npalabra];
		var col = parseInt(id.substring(4,6),10);
		var colM = col+1;
		var fil = parseInt(id.substring(1,3),10);
		var filM = fil+1;
			
		if(direccion == "H") limite = co[Npalabra] + pa[Npalabra].length;
		if(direccion == "V") limite = fi[Npalabra] + pa[Npalabra].length;
				
		if((((direccion == "V")&&(limite-1 < filM))||((direccion == "H")&&(limite-1 < colM)))&&($("#"+id).html() != " "))
		{
			if(idTimeout != "pista") setTimeout(function(){clearTimeout(idTimeout);},1000);
			desactivar("fin");
			NpalabraAnterior = -1;
		}
		else
		{
			if(col<10) var colx = "0"+col;
			else colx = col;
			if(colM<10) var colMx = "0"+colM;
			else colMx = colM;
	
			if(fil<10) var fily = "0"+fil;
			else fily = fil;
			if(filM<10) var filMy = "0"+filM;
			else filMy = filM;
						
			if(direccion == "H") activar("c"+fily+"_"+colMx);
			if(direccion == "V") activar("c"+filMy+"_"+colx);
			
			NpalabraAnterior = Npalabra;
		}
	}