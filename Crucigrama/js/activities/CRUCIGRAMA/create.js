//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio del Crucigrama)
//==========================================================================================================================

//Creo y posiciono las casillas en función del número de filas y columnas de la aplicación y el tamaño del lienzo
//Cada casilla estará identificada con un id que empieza por "c", y le seguirán dos dígitos que indicarán la columna, una "_" y otros dos dígitos que indicarán la fila. Ejemplo: "c05_07"
//Cada casillas pertenecerá a la clase "casilla"
//Crearemos anclas en cada casilla para poder focalizar la pantalla en cada palabra cuando estemos trabajando en pantallas pequeñas

	function crear()
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
	
		//El elemento miLienzo, es el elemento sobre el que creamos el crucigrama
		miLienzo = $('#lienzo');
		miLienzo.html('<input id="control" type="text" size="2" autocomplete="off"><input id="sinfoco" type="text" size="2" autocomplete="off">');		
		
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
						
				var div = $("<div>",
				{
					id: "c"+ix+"_"+jy,
					"class": "casilla",
					css:{"left":pxt,"top":pyt}
				});
				
				miLienzo.append(div);
				
				px = px + (tamCasilla);
				
				var tamLetra = tamCasilla-8;
				if(tamLetra < 7) tamLetra = 7;
				$("#c"+ix+"_"+jy).css({"width":tamCasilla+"px","height":tamCasilla+"px","font-size":tamLetra+"px", "line-height":tamCasilla+"px"});
			}
			px = 0;
			py = py + (tamCasilla);
		}
		
		var altoLienzo = tamCasilla*filas;
		$('#lienzo').height(altoLienzo);
		
		//Centramos el lienzo una vez cargado
		setTimeout(function(){
			var margenX = ($("#wrapper").width()-$("#scroller").width())/2;
			$('#scroller').css("left",margenX);
		},1000);
		
		//Activamos para finalizar las casillas en las que podemos introducir contenido
		cargar();
	}
				
//Activo las casillas que van a tener contenido con las características y eventos necesarios
//Cada casilla en la que podamos introducir contenido, pertenecera a la clase "activa"
//A cada casilla activa, se le añadirá la clase "e" seguida de dos dígitos que indicarán a que palabra pertenece
//Si pertenece a dos palabras diferentes, la clase será: "casilla e01 activa e05" la primera clase "e" indicará la palabra principal a la que pertenece
//La primera casilla de cada palabra, tendrá como palabra principal siempre dicha palabra
//Cada elemento span de cada primera casilla de cada palabra se utilizará para poner el número de palabra
//Cada elemento span estará identificada con un id que empieza por "sp", y le seguirán dos dígitos que indicarán la columna, una "_" y otros dos dígitos que indicarán la fila. Ejemplo: "sp05_07"
//Cada elemento span pertenecerá a la clase "numerito"
//Esta variable contendra el id de la primera casilla de la primera palabra para activarla al acceder
var primera = "";

	function cargar()
	{
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
			
			if(k == 0) primera = "c"+filay+"_"+columnax;
			
			if(direccion == "V")
			{
				for(i=fila;i<=(palabra.length+fila-1);i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					if(i==fila) 
					{
						pxt=document.getElementById("c"+ix+"_"+columnax).style.left;
						pyt=document.getElementById("c"+ix+"_"+columnax).style.top;
						
						var span = $("<span>",
						{
							id: "sp"+ix+"_"+columnax,
							"class": "numerito",
							css:{"left":pxt,"top":pyt,"font-size":tamNumerito+"px"}
						});
						
						miLienzo.append(span);
						$("#sp"+ix+"_"+columnax).html($("#sp"+ix+"_"+columnax).html()+(k+1));
					}
					$("#c"+ix+"_"+columnax).addClass("e"+kz);
						
					if((i==fila)&&($("#c"+ix+"_"+columnax).hasClass("activa")))
					{
						var clase = document.getElementById("c"+ix+"_"+columnax).className;
						var p1 = clase.substring(9,11);
						var p2 = clase.substring(20,22);
						document.getElementById("c"+ix+"_"+columnax).className = "casilla e"+p2+" activa e"+p1;
					}
					else
					{
						$("#c"+ix+"_"+columnax).addClass("activa");
					}
				}
			}
		
			if(direccion == "H")
			{
				for(j=columna;j<=(palabra.length+columna-1);j++)
				{
					if(j<10) var jy = "0"+j;
					else var jy = j;
				
					if(j==columna)
					{
						pxt=document.getElementById("c"+filay+"_"+jy).style.left;
						pyt=document.getElementById("c"+filay+"_"+jy).style.top;
						
						var span = $("<span>",
						{
							id: "sp"+filay+"_"+jy,
							"class": "numerito",
							css:{"left":pxt,"top":pyt,"font-size":tamNumerito+"px"}
						});
						
						miLienzo.append(span);
						$("#sp"+filay+"_"+jy).html(k+1);
					}
					$("#c"+filay+"_"+jy).addClass("e"+kz);
								
					if((j==columna)&&($("#c"+filay+"_"+jy).hasClass("activa")))
					{
						var clase = document.getElementById("c"+filay+"_"+jy).className;
						var p1 = clase.substring(9,11);
						var p2 = clase.substring(20,22);
						document.getElementById("c"+filay+"_"+jy).className = "casilla e"+p2+" activa e"+p1;
					}
					else
					{
						$("#c"+filay+"_"+jy).addClass("activa");
					}
							
				}
			}
		}
		
		//Borramos las casillas innecesarias y las simulamos con la imagen de fondo
		for(i=0;i<filas;i++)	
		{
			if(i<10) var ix = "0"+i;
			else var ix = i;		
			for(j=0;j<columnas;j++)
			{
				if(j<10) var jy = "0"+j;
				else var jy = j;
						
				if(!$("#c"+ix+"_"+jy).hasClass('activa')) $("#c"+ix+"_"+jy).remove();
			}
		}
		
		//Asignamos los eventos correspondientes a cada una de las casillas activas y al input
		$(".activa").click(actualizar);
		$(".numerito").click(clickCelda);
		
		$("#control").on('paste',function(e) {
			e.preventDefault();
		});

		$("#control").keyup(procesarLetra);

		if(is_touch_device())
		{
			$("#info .btnAccionPrincipal").show();
		}

	}