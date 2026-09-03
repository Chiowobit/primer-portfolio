//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio de la Sopa)
//==========================================================================================================================

//Creo y posiciono las casillas en función del número de filas y columnas de la aplicación y el tamaño del lienzo
//Cada casilla estará identificada con un id que empieza por "c", y le seguirán dos dígitos que indicarán la columna, una "_" y otros dos dígitos que indicarán la fila. Ejemplo: "c05_07"
//Cada casillas pertenecerá a la clase "casilla"

	function crear()
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
	
		//El elemento miLienzo, es el elemento sobre el que creamos la Sopa
		miLienzo = $('#lienzo');
		
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
						
				var div = $("<div>",
				{
					id: "c"+ix+"_"+jy,
					"class": "casilla",
					"unselectable": "on",
					css:{"left":pxt,"top":pyt}
				});
				
				miLienzo.append(div);
				
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
		},1000);
		
		//Ocultamos las pistas si el tactil, y si no lo es desactivamos la parte de zoom
		if($('#all').width() < 600) 
		{
			$('#info').removeClass('visible'); 
			$('#info').addClass('oculto');
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
		
		//Cargamos las palabras en la Sopa
		cargar();
	}
				
//Cargamos las palabras en las casillas correspondientes en función de la dirección que tengan

	function cargar()
	{	
		for(k=0;k<pa.length;k++)
		{
			fila = fi[k];
			columna = co[k];
			direccion = di[k];
			palabra = pa[k];
	
			if(k<10) var kz = "0"+k;
			else var kz = k;
	
			if(columna<10) var columnax = "0"+columna;
			else columnax = columna;
	
			if(fila<10) var filay = "0"+fila;
			else filay = fila;
			
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
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
					
					$("#c"+filax+"_"+columnay).html(palabra[i]);
				}
			}
		}
		//Rellenamos los huecos sin letras
		rellenar();
	}

//Rellenamos los huecos que se quedan vacios con letras aleatorias
	
	function rellenar()
	{
		var letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
		for(i=0;i<numFilas;i++)
		{
			if(i<10) var ix = "0"+i;
			else var ix = i;		
			for(j=0;j<numFilas;j++)
			{
				var aleatorio = parseInt(Math.random()*100);
				while(aleatorio >= letras.length-1)
				{
					aleatorio = parseInt(Math.random()*100);
				}
				
				if(j<10) var jy = "0"+j;
				else var jy = j;
						
				if($("#c"+ix+"_"+jy).html() == "") $("#c"+ix+"_"+jy).html(letras[aleatorio]);
			}
		}
		
		//Cargamos las pistas
		cargarPistas();
		
		//Inicializamos los eventos en funcion de si es tactil o no
		if(is_touch_device())
		{
			$(".casilla").bind("click",controlaInicio);
		}
		else
		{
			$(".casilla").mousedown(controlaInicio);
			$(".casilla").mouseup(controlaFinal);
		}
	}
	
//Cargar palabras a la derecha

	function cargarPistas()
	{
		var ol = $("<ol>");
		for(k=0;k<pa.length;k++)
		{
			if(k<10) var kx = "0"+k;
			else var kx = k;
			
			palabra = pa[k];
			
			var li = $("<li>");
			
			var div = $("<div>",
			{
				id: "divPista"+kx,
				"class": "cajaPista"
			});
			
			if(pistas == "palabra") $(div).html(palabra);
			if(pistas == "ninguna") $(div).html("????");
			if(pistas == "asteriscos")
			{
				var asteriscos = "";
				for(p=0;p<palabra.length;p++)
				{
					asteriscos += "_";
				}
				$(div).html(asteriscos);
			} 
	
			$(li).append(div);
			$(ol).append(li);
		}
		$("#contenidoPista").append(ol);	
	}
