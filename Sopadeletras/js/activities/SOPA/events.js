//==========================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio de la Sopa)
//==========================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion
//Dependiendo de si es táctil o no aplicamos unos eventos u otros

    function comenzar()
    {
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
     	
     	//Lanzamos el contador de tiempo
		idInterval = setInterval(contador,1000);
     	
     	if(is_touch_device())
		{
			var myScroll;
			myScroll = setTimeout(function(){new iScroll('wrapper', { zoom:true })},2000);
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
		if(tipo == "redi")
		{	
			//Una vez conocemos la cantidad de celdas, establecemos el tamaño de las mismas en función de las dimensiones disponibles
			var tamMaximoAncho = $('#wrapper').width();
			var tamMaximoAlto = $('#wrapper').height();
		
			tamCasillaAncho = parseInt(tamMaximoAncho/numFilas);
			tamCasillaAlto = parseInt(tamMaximoAlto/numFilas);
		
			if(tamCasillaAncho >= tamCasillaAlto)
			{	 
				tamCasilla = tamCasillaAlto;
				tamMaximo = tamMaximoAlto;
			}
			else 
			{
				tamCasilla = tamCasillaAncho;
				tamMaximo = tamMaximoAncho;
			}
		
			$('#scroller').width(tamCasilla*numFilas);
			$('#scroller').addClass('unselectable');
		
			var px = 0;
			var py = 0;
	
			for(i=0;i<numFilas;i++)
			{
				if(i<10) var ix = "0"+i;
				else var ix = i;		
			
				for(j=0;j<numFilas;j++)
				{
					pxt=px+"px";
					pyt=py+"px";
			
					if(j<10) var jy = "0"+j;
					else var jy = j;
						
					$("#c"+ix+"_"+jy).css({"top":pyt,"left":pxt});	
				
					px = px + (tamCasilla);
				
					var tamLetra = tamCasilla-11;
					if(tamLetra < 7) tamLetra = 7;
					if(tamLetra > 21) tamLetra = 21;
					$("#c"+ix+"_"+jy).css({"width":tamCasilla+"px","height":tamCasilla+"px","font-size":tamLetra+"px","line-height":tamCasilla+"px"});
				}
				px = 0;
				py = py + (tamCasilla);
			}
		
			var altoLienzo = tamCasilla*numFilas;
			$('#lienzo').height(altoLienzo);
		
			//Centramos el lienzo una vez cargado
			setTimeout(function(){
				var margenX = ($("#wrapper").width()-$("#scroller").width())/2;
				$('#scroller').css("left",margenX);
			},500);
			
			//Ocultamos las pistas si el tactil, y si no lo es desactivamos la parte de zoom
			if($('#all').width() < 600) 
			{
				$('#info').removeClass('visible'); 
				$('#info').addClass('oculto');
				$("#btnPistas").show();
				$("#infoZoom").show();
				$(".zoomScroller").show();
			}
			else
			{
				$("#btnPistas").hide();
			}
			
			if(!is_touch_device())
			{
				$("#infoZoom").hide();
				$(".zoomScroller").hide();
			}
			
			//Recolocamos las lineas de las palabras	 
    		setTimeout(function(){
    		for(l=0;l<pa.length;l++)
    		{
    			if(l<10) var lx = "0"+l;
				else var lx = l;
				
				if($("#linea"+lx).length != 0)
				{
					fila = fi[l];
					columna = co[l];
					direccion = di[l];
					palabra = pa[l];
    				
    				if(fila<10) var filax0 = "0"+fila;
					else var filax0 = fila;
    				
    				if(columna<10) var columnax0 = "0"+columna;
					else var columnax0 = columna;
    				
    				var inicio = "c"+filax0+"_"+columnax0;
					
					if((direccion == "S")||(direccion == "E")||(direccion == "NE")||(direccion == "SE"))
					{
						filax = filax0;
						columnax = columnax0;
					}
					if(direccion == "SO")
					{
						var filax = fila + palabra.length-1;
						if(filax<10) var filax = "0"+filax;
						var columnax = columna - palabra.length+1;
						if(columnax<10) var columnax = "0"+columnax;
					}
					if(direccion == "O")
					{
						var columnax = columna - palabra.length+1;
						if(columnax<10) var columnax = "0"+columnax;
						filax = filax0;
					}
					if(direccion == "NO")
					{
						var filax = fila - palabra.length+1;
						if(filax<10) var filax = "0"+filax;
						var columnax = columna - palabra.length+1;
						if(columnax<10) var columnax = "0"+columnax;
					}
					if(direccion == "N")
					{
						var filax = fila - palabra.length+1;
						if(filax<10) var filax = "0"+filax;
						columnax = columnax0;
					}
				
					var final = "c"+filax+"_"+columnax;
    			
    				if((direccion == "S")||(direccion == "E")||(direccion == "NE")||(direccion == "SE")) comienzo = inicio;
    				else comienzo = final;
    				var anchura = tamCasilla*palabra.length;
					if((direccion == "NO")||(direccion == "NE")||(direccion == "SO")||(direccion == "SE")) anchura = tamCasilla*Math.SQRT2*palabra.length;
					
					$("#linea"+lx).css({"left":$("#"+comienzo).css("left"),"top":$("#"+comienzo).css("top"),"width":anchura,"height":tamCasilla-6});
    			}
    		}},300);
    		
    		$(".vertical").css("margin-top",-(tamCasilla+4));
			$(".diagonal").css("margin-top",-((tamCasilla/2)+4));
			$(".diagonal").css("margin-left",-(((tamCasilla/2)+4)/2));
			$(".diagonalInvertida").css("margin-top",(tamCasilla/2)-2);
			$(".diagonalInvertida").css("margin-left",((tamCasilla/2)+4)/2);
    		
			//Reinicializamos la descripción Inicial de Usuario
			cargarDescripcionInicio();
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

//Controlamos el inicio de la seleccion

	function controlaInicio(e)
	{
		idIni = e.target.getAttribute("id");
		fInicio = parseInt(idIni.substring(1,3),10);
		cInicio = parseInt(idIni.substring(4,6),10);
		$("#c"+idIni.substring(1,3)+"_"+idIni.substring(4,6)).addClass("activo");
		
		if(is_touch_device())
		{
			$(".casilla").unbind("click");
			$(".casilla").bind("click",controlaMov);
		}
		else
		{
			$(".casilla").bind("mouseover",controlaMov);
		}
		
		$(".casilla").removeClass("incorrecto");
		
		palabraActiva = $("#c"+idIni.substring(1,3)+"_"+idIni.substring(4,6)).html();
	}

//Permitimos el movimiento para seleccionar palabras
//Esta variable controla la direccion de la última palabra seleccionada 
var dire = "";

	function controlaMov(e)
	{
		idFin = e.target.getAttribute("id");
		fFinal = parseInt(idFin.substring(1,3),10);
		cFinal = parseInt(idFin.substring(4,6),10);
		
		if(fInicio == fFinal)
		{
			$(".casilla").removeClass("activo");
			
			if(fInicio<10) var fIniciox = "0"+fInicio;
			else var fIniciox = fInicio;
			
			if(cInicio <= cFinal)
			{
				dire = "E";
				palabraActiva = "";
				for(i=cInicio;i<=cFinal;i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
			
					$("#c"+fIniciox+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+fIniciox+"_"+ix).html();
				}
			}
			else if(cInicio > cFinal)
			{
				dire = "O";
				palabraActiva = "";
				for(i=cInicio;i>=cFinal;i--)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
			
					$("#c"+fIniciox+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+fIniciox+"_"+ix).html();
				}
			}
			idFinO = "c"+fIniciox+"_"+ix; 			
		}
		
		if(cInicio == cFinal)
		{
			dire = "vertical";
			
			$(".casilla").removeClass("activo");
			
			if(cInicio<10) var cIniciox = "0"+cInicio;
			else var cIniciox = cInicio;
			
			if(fInicio <= fFinal)
			{
				dire = "S";
				palabraActiva = "";
				for(i=fInicio;i<=fFinal;i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
			
					$("#c"+ix+"_"+cIniciox).addClass("activo");
					palabraActiva += $("#c"+ix+"_"+cIniciox).html();
				}
			}
			else if(fInicio > fFinal)
			{
				dire = "N";
				palabraActiva = "";
				for(i=fInicio;i>=fFinal;i--)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
			
					$("#c"+ix+"_"+cIniciox).addClass("activo");
					palabraActiva += $("#c"+ix+"_"+cIniciox).html();
				}
			}
			idFinO = "c"+ix+"_"+cIniciox; 			
		}
		
		if(Math.abs(cInicio-cFinal) == Math.abs(fInicio-fFinal))
		{
			dire = "diagonal";
			
			$(".casilla").removeClass("activo");
			
			if((fInicio <= fFinal)&&(cInicio <= cFinal))
			{
				dire = "SE";
				palabraActiva = "";
				for(i=cInicio;i<=cFinal;i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					j = fInicio + (i-cInicio);
					if(j<10) var jx = "0"+j;
					else var jx = j;
			
					$("#c"+jx+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+jx+"_"+ix).html();
				}
			}
			else if((fInicio <= fFinal)&&(cInicio > cFinal))
			{
				dire = "SO";
				palabraActiva = "";
				for(i=cInicio;i>=cFinal;i--)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					j = fInicio - (i-cInicio);
					if(j<10) var jx = "0"+j;
					else var jx = j;
			
					$("#c"+jx+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+jx+"_"+ix).html();
				}
			}
			else if((fInicio > fFinal)&&(cInicio <= cFinal))
			{
				dire = "NE";
				palabraActiva = "";
				for(i=cInicio;i<=cFinal;i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					j = fInicio - (i-cInicio);
					if(j<10) var jx = "0"+j;
					else var jx = j;
			
					$("#c"+jx+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+jx+"_"+ix).html();
				}
			}
			else if((fInicio > fFinal)&&(cInicio > cFinal))
			{
				dire = "NO";
				palabraActiva = "";
				for(i=cInicio;i>=cFinal;i--)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					j = fInicio + (i-cInicio);
					if(j<10) var jx = "0"+j;
					else var jx = j;
			
					$("#c"+jx+"_"+ix).addClass("activo");
					palabraActiva += $("#c"+jx+"_"+ix).html();
				}
			}
			idFinO = "c"+jx+"_"+ix; 		
		}
		
		//Si es tactil, con el segundo click comprobamos la palabra y habilitamos para seleccionar otra 
		if(is_touch_device())
		{
			controlaFinal();
			$(".casilla").unbind("click");
			$(".casilla").bind("click",controlaInicio);
		}
	}

//Controlamos cuando terminamos de seleccionar, y comprobamos la palabra
//Controlamos el acierto o fallo de las palabras mediante este array
var controlAciertos = [];
var final = 0;

	function controlaFinal()
	{
		$(".casilla").unbind("mouseover");
		
		for(k=0;k<pa.length;k++)
		{
			if(k<10) var kx = "0"+k;
			else var kx = k;
			
			var pai = "";
			
			for(m=0;m<pa[k].length;m++)
			{
				pai += pa[k].substring(pa[k].length-m-1,pa[k].length-m);
			}
			
			if((pa[k] == palabraActiva)||(pai == palabraActiva))
			{
				$(".activo").removeClass("incorrecto");
				$(".activo").addClass("correcto");
				if(controlAciertos[k] == undefined)
				{ 
					$("#divPista"+kx).addClass("correcto");
					$("#divPista"+kx).html(pa[k]);
					actualizaPuntos(k);
					dibujaLinea(idIni,idFinO,pai.length,"acierto",dire,kx);
				}
				controlAciertos[k] = 1;
				
				final = "";
				for(l=0;l<pa.length;l++)
				{
					if(controlAciertos[l] == undefined) {final = 0;break;}
					else final = 1;
				}
				if(final == 1)
                {
                    if(puntosReg >= 50){    
                        cargarPantallaFinal('OK',getDatosRespuestas(1)); 
                          
                    } 
                    else{
                        cargarPantallaFinal('noSuperada',getDatosRespuestas(0));
                        
                    }
                }
				
				break;
			}
			else
			{
				$(".activo").addClass("incorrecto");
				setTimeout(function(){$(".incorrecto").removeClass("incorrecto");},1000);
			} 
		}	
		$(".casilla").removeClass("activo");
	}

//Dibujamos las lineas sobre las palabras acertadas o que nos han facilitado

	function dibujaLinea(ini,fin,longitud,malBien,direccion,palabra)
	{
		var comienzo = "";
		if (direccion == "N"){direccion = "vertical"; comienzo = fin;}
		else if (direccion == "S"){direccion = "vertical"; comienzo = ini;}
		else if (direccion == "E"){direccion = "horizontal"; comienzo = ini;}
		else if (direccion == "O"){direccion = "horizontal"; comienzo = fin;}
		else if (direccion == "NO"){direccion = "diagonal"; comienzo = fin;}
		else if (direccion == "SO"){direccion = "diagonalInvertida"; comienzo = fin;}
		else if (direccion == "NE"){direccion = "diagonalInvertida"; comienzo = ini;}
		else if (direccion == "SE"){direccion = "diagonal"; comienzo = ini;}  
		
		var anchura = tamCasilla*longitud;
		if(direccion.substring(0,8) == "diagonal") anchura = tamCasilla*Math.SQRT2*longitud;
		var div = $("<div>",
		{
			id: "linea"+palabra,
			"class": "line "+malBien+" "+direccion,
			css:{"left":$("#"+comienzo).css("left"),"top":$("#"+comienzo).css("top"),"width":anchura,"height":tamCasilla-6}
		});
		$("#lienzo").append(div);
		
		$(".vertical").css("margin-top",-(tamCasilla+4));
		$(".diagonal").css("margin-top",-((tamCasilla/2)+4));
		$(".diagonal").css("margin-left",-(((tamCasilla/2)+4)/2));
		$(".diagonalInvertida").css("margin-top",(tamCasilla/2)-2);
		$(".diagonalInvertida").css("margin-left",((tamCasilla/2)+4)/2);
	}
	
//Actualizar puntos
var puntosReg = 0;
var arrayMitad=new Array()
	function actualizaPuntos(num)
	{
		var puntosSumar = Math.floor(100 / pa.length);
		if((puntosMitad == 1)&&(palabraMitad == num)){
			arrayMitad.push(num);
			puntosSumar = Math.round(puntosSumar / 2); 
			puntosMitad = 0;
		} 
		var puntosActuales = parseInt(puntosReg);
		var puntosTotales = parseInt(puntosSumar + puntosActuales);
		if(puntosTotales > 100) puntosTotales = 100;
		if((100 - puntosTotales) < puntosSumar) puntosTotales = 100;
		puntosReg = puntosTotales;
		$("#numPuntos").html(puntosTotales);
	}
	
//Mostramos una palabra cuando el usuario la solicita
//Estas variables controlan si la puntuación es la mitad o no, en función de las pistas solicitadas
var puntosMitad = 0;
var palabraMitad = -1;

	function mostrar()
	{
		//Quitamos la clase incorrecto a todas las casillas
		$(".casilla").removeClass("incorrecto");
		
		//Cuando pedimos pista y la pantalla es pequeña, mostramos las pistas y las ocultamos a los dos segundos
		if($('#all').width() <= 600) {activarPista();setTimeout(desactivarPista,2000);}
		
		for(k=0;k<pa.length;k++)
		{
			fila = fi[k];
			columna = co[k];
			direccion = di[k];
			palabra = pa[k];
			
			if(k<10) var kx = "0"+k;
			else var kx = k;
			
			if(($("#divPista"+kx).html() != pa[k])&&(controlAciertos[k] == undefined))
			{
				$("#divPista"+kx).html(pa[k]);
				puntosMitad = 1;
				palabraMitad = k;
				break;
			}
			else if(controlAciertos[k] == undefined)
			{
				$("#divPista"+kx).addClass("incorrectoF");
				controlAciertos[k] = 0;
		
				if(columna<10) var columnax = "0"+columna;
				else columnax = columna;
	
				if(fila<10) var filay = "0"+fila;
				else filay = fila;
			
				var ini = "c"+filay+"_"+columnax;
			
				if(direccion == "E")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila;
						if(filax<10) var filax = "0"+filax;
						columnay = columna + i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "SE")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila + i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna + i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "S")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila + i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "SO")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila + i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna - i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "O")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila;
						if(filax<10) var filax = "0"+filax;
						columnay = columna - i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "NO")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila - i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna - i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "N")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila - i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
			
				if(direccion == "NE")
				{
					for(i=0;i<=(palabra.length-1);i++)
					{
						if(i<10) var ix = "0"+i;
						else var ix = i;
					
						filax = fila - i;
						if(filax<10) var filax = "0"+filax;
						columnay = columna + i;
						if(columnay<10) var columnay = "0"+columnay;
					
						$("#c"+filax+"_"+columnay).addClass("incorrectoF");
					}
				}
				
				var fin = "c"+filax+"_"+columnay;
				
				dibujaLinea(ini,fin,palabra.length,"fallo",direccion,kx);
				
				final = "";
				for(l=0;l<pa.length;l++)
				{
					if(controlAciertos[l] == undefined) {final = 0;break;}
					else final = 1;
				}
				
				if(final == 1)
                {                      
                    if(puntosReg >= 50) {
                          cargarPantallaFinal('OK',getDatosRespuestas(1));
                    }
                    else{
                        cargarPantallaFinal('noSuperada',getDatosRespuestas(0));
                                                
                        }
                }
				
				break;
			}
		}	
	}
	
//Completamos la pantalla final con la corrección de las palabras y su feedback si esque lo tiene

	function completarPantallaFinal()
	{		
		for(k=0;k<pa.length;k++)
		{	
			//Creamos cada uno de los elementos de la pantalla final
			crearElementosFinal(k);
			
			//Una vez creado lo completamos con los parametros correspondientes
			$('#numRespuesta_'+k).html(k+1);
			
			if(k < 10) kx = "0"+k;
			else kx = k;
			
			$('#pCorrecta_'+k).html(pa[k]);
			if(controlAciertos[k] != 1) $("#contentRespuesta_"+k).addClass('respuestaIncorrecta');
		}
		
		//Inicializamos loe eventos de la pantalla final
		$('.accordionButton').click(function() {
			$('.accordionButton').removeClass('on');
	 		$('.accordionContent').slideUp('slow');
			if($(this).next().is(':hidden') == true) {
				$(this).addClass('on');
				$(this).next().slideDown('slow');
				cargarFinal(this);
		 	}
	 	});
		$('.accordionContent').hide();
	}

//Creamos cada uno de los elementos de la lista de la pantalla final

	function crearElementosFinal(k)
	{
		var cadenaHTML = "";
		
		cadenaHTML += "<li>";
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "<div class='accordionButton' id='accordion_"+k+"'>";
			}
		}
		cadenaHTML += "<div class='contentRespuesta' id='contentRespuesta_"+k+"'>";
		cadenaHTML += "<span class='numRespuesta' id='numRespuesta_"+k+"'></span>";
		cadenaHTML += "<span class='txtRespuesta'><span id='pCorrecta_"+k+"'></span></span>";
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "<span title='"+txtInfoAdicional+"' class='iExtraInfo'></span>";
			}
		}
		cadenaHTML += "</div>";
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "</div>";
			}
		}
		if(globalFeedback == 1)
		{
			if(fe[k] != undefined)
			{
				cadenaHTML += "<div class='accordionContent'>";
				cadenaHTML += "<div class='contentInfoRespuesta'>";
				cadenaHTML += "<div class='txtExtraInfo' id='txtExtraInfo_"+k+"'></div>";
				cadenaHTML += "</div>";				  
        		cadenaHTML += "</div>";
       		}
       	}  					
        cadenaHTML += "</li>";
        
        $("#listaFinal").html($("#listaFinal").html()+cadenaHTML);       				   			
	}

//Cargamos cada uno de los contenidos de cada elemento al desplegarlo
	
	function cargarFinal(enlace)
	{
		var idAccordion = $(enlace).attr('id');
		var k = parseInt(idAccordion.substring(10,13),10);
			
		if(globalFeedback == 1) 
		{
			if(fe[k] != undefined)
			{
				$("#txtExtraInfo_"+k).html(fe[k]);
			}
		}
	}

	function getDatosRespuestas(s) {
		var datos = {};
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = [];
		for(posicion=0;posicion<pa.length;posicion++) {
			datos['r'][posicion] = {};
			datos['r'][posicion]['s'] = controlAciertos[posicion];
			datos['r'][posicion]['i'] = posicion;
			datos['r'][posicion]['p'] = 0;
		}
		for (j=0;j<arrayMitad.length;j++) {
			datos['r'][arrayMitad[j]]['p']++;
		}
		return datos;
	}

	function actualizaPuntosFinal(tipoAlerta) {
		
	}