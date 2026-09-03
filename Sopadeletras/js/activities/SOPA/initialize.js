//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio de la Sopa)
//==========================================================================================================================

//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	function extraerDatos()
	{
		tipo_actividad = "Sopa";
		
		//Las variables que no estan definidas en este caso, pero se utilizan el los JS comunes, las inicializamos así
		numero_intentos = "noDefinido";
		sensible_mayusculas = "noDefinido";
		sensible_acentos = "noDefinido";
		sensible_mayusculas_ocultar = "si";
		sensible_acentos_ocultar = "si";
        
        try{
			origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;
		}catch(e)
		{
			origen_recursos="";
		}
        
		if(origen_recursos){
			rutaRecursos = origen_recursos;
		}
		try{
    	botonReinicio = xmlDoc.getElementsByTagName("boton_reiniciar")[0].childNodes[0].nodeValue;
    }catch(e){
    	botonReinicio = 'visible';
    }
        try{
        	colorFuente = xmlDoc.getElementsByTagName("color_fuente")[0].childNodes[0].nodeValue;
        	colorFuenteB = xmlDoc.getElementsByTagName("color_fuente_b")[0].childNodes[0].nodeValue;
        	colorFuenteInt = colorFuente.substring(2,colorFuente.length);
        	colorFuente = "#"+colorFuente.substring(2,colorFuente.length);
        	colorFuenteB = "#"+colorFuenteB.substring(2,colorFuenteB.length);
        }catch(e){
        	colorFuente = "#FFFFFF";
        	colorFuenteB = "#111111";
        }
        colorFondo = xmlDoc.getElementsByTagName("color_fondo_h")[0].childNodes[0].nodeValue;
				colorFondoInt = colorFondo.substring(2,colorFondo.length);
        colorFondo = "#"+colorFondo.substring(2,colorFondo.length);
				colorBotones = xmlDoc.getElementsByTagName("color_botones_h")[0].childNodes[0].nodeValue;
				colorBotones = colorBotones.substring(2,colorBotones.length);
        try{
        	logoPersonalizado = xmlDoc.getElementsByTagName("logoPersonalizado")[0].childNodes[0].nodeValue;
        }catch(e){
        	logoPersonalizado = "";
        }
        try{
        	franjaPersonalizada = xmlDoc.getElementsByTagName("franjaPersonalizada")[0].childNodes[0].nodeValue;
        }catch(e){
        	franjaPersonalizada = "";
        }
		
		tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		if(tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value;
		else if (tiempo == "no") tiempo = 0;
		
		globalFeedback = xmlDoc.getElementsByTagName("globalFeedback")[0].childNodes[0].nodeValue;
		if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {
			autor = '';
		} else {
			autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;
		}
		descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
		
		registro = xmlDoc.getElementsByTagName("registro")[0];
				
		descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
		descripcionT = xmlDoc.getElementsByTagName("descripcionT")[0].childNodes[0].nodeValue;
		enunciado = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
		
		numFilas = xmlDoc.getElementsByTagName("numero_filas")[0].childNodes[0].nodeValue;
		
		pistas = xmlDoc.getElementsByTagName("pistas")[0].childNodes[0].nodeValue;
			
		var idioma = xmlDoc.getElementsByTagName("idioma")[0];
		instrucciones = idioma.getElementsByTagName("instrucciones")[0].childNodes[0].nodeValue;
		txtPuntos = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
		txtTiempo = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
		txtTiempoRestante = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
		comprobar = idioma.getElementsByTagName("comprobar")[0].childNodes[0].nodeValue;
		txtRespuestaIncorrecta = "";
		txtActNoSuperada = "";
		txtTiempoSuperado = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
		txtCerrar = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
		txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtRespuestaCorrecta = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtBoxRespuestaCorrecta = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtActividadNoSuperada = idioma.getElementsByTagName("txtActividadNoSuperada")[0].childNodes[0].nodeValue;
        
		txtMostrarPalabra = idioma.getElementsByTagName("txtMostrarPalabra")[0].childNodes[0].nodeValue;
		txtAceptar = idioma.getElementsByTagName("txtAceptar")[0].childNodes[0].nodeValue;
		txtTiempoMaximo = idioma.getElementsByTagName("txtTiempoMaximo")[0].childNodes[0].nodeValue;
		txtSensible = idioma.getElementsByTagName("txtSensible")[0].childNodes[0].nodeValue;
		txtMayusculasMinusculas = idioma.getElementsByTagName("txtMayusculasMinusculas")[0].childNodes[0].nodeValue;
		txtAcentos = idioma.getElementsByTagName("txtAcentos")[0].childNodes[0].nodeValue;
		txtComenzar = idioma.getElementsByTagName("txtComenzar")[0].childNodes[0].nodeValue;
		txtAutor = idioma.getElementsByTagName("txtAutor")[0].childNodes[0].nodeValue;
		txtAyuda = idioma.getElementsByTagName("txtAyuda")[0].childNodes[0].nodeValue;
		txtMostrarMas = idioma.getElementsByTagName("txtMostrarMas")[0].childNodes[0].nodeValue;
		txtMostrarMenos = idioma.getElementsByTagName("txtMostrarMenos")[0].childNodes[0].nodeValue;
		txtReiniciar = idioma.getElementsByTagName("txtReiniciar")[0].childNodes[0].nodeValue;
		txtVolverJugar = idioma.getElementsByTagName("txtVolverJugar")[0].childNodes[0].nodeValue;
		txtRegistrarse = idioma.getElementsByTagName("txtRegistrarse")[0].childNodes[0].nodeValue;
		txtAcceder = idioma.getElementsByTagName("txtAcceder")[0].childNodes[0].nodeValue;
		txtCompartirResultado = idioma.getElementsByTagName("txtCompartirResultado")[0].childNodes[0].nodeValue;
		txtAumentar = idioma.getElementsByTagName("txtAumentar")[0].childNodes[0].nodeValue;
		txtReducir = idioma.getElementsByTagName("txtReducir")[0].childNodes[0].nodeValue;
		txtImprimir = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
		txtPantallaCompleta = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
		txtPistas = idioma.getElementsByTagName("txtPistas")[0].childNodes[0].nodeValue;
		txtInfoAdicional = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;
		txtSocial = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
        
        botonesOcultos = xmlDoc.getElementsByTagName("botonesOcultos")[0].childNodes[0].nodeValue;
		
		//Creamos una serie de arrays con la informacion de las palabras
		pa = [];
		fi = [];
		co = [];
		di = [];
		fe = [];
	
		var palab = xmlDoc.getElementsByTagName("palabra");
		for (var i = 0; i < palab.length; i++)
 		{
  			pa[i] = palab[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
  			fi[i] = parseInt(palab[i].getElementsByTagName("fila")[0].childNodes[0].nodeValue);
  			co[i] = parseInt(palab[i].getElementsByTagName("columna")[0].childNodes[0].nodeValue);
  			di[i] = palab[i].getElementsByTagName("direccion")[0].childNodes[0].nodeValue;
  			if(globalFeedback == 1)
  			{
  				if(palab[i].getElementsByTagName("feedback")[0].childNodes[0] != undefined)
  				{
  					fe[i] = palab[i].getElementsByTagName("feedback")[0].childNodes[0].nodeValue;
  				}
  			}
  		}
	}

//Inicializamos los elementos de la Sopa
	
	function inicializarElementos()
	{
	    //Inicializamos los colores de la aplicacion
		inicializarColores();
		//Inicializamos eventos principales
		inicializarEventosPrincipales();
		//Inicializamos los valores para la pantalla inicial
		inicializarPantallaInicial();
		//Inicializamos los valores para la barra de la pista
		inicializarPista();
		//Inicializamos los parametros
		inicializarParametros();
		//Inicializamos los puntos iniciales
		inicializarPuntosSopa();
		//Inicializamos el titulo de la propia aplicacion
		inicializarTituloAct();
		//Inicializamos el evento del boton comprobar
		inicializarBtnMostrar();
        //Inicializamos los botones de ayuda
		inicializarBtnsAyuda();
		//Inicializamos la alerta correcta
		inicializarAlertaCorrecta();
		//Inicializar alerta incorrecta
		inicializarAlertaIncorrecta();
		//Inicializamos enlaces reinicio
		inicializarRecargar();
		//Inicializamos enlaces ayuda
		inicializarAyuda();
		//Inicializamos enlaces ayuda táctil
		inicializarAyudaTactil();
		//Inicializamos los botones de zoom
		inicializarZoom();
		//Inicializamos el registro
		inicializarRegistro();	
	}

//Inicializamos los eventos principales

	function inicializarEventosPrincipales()
	{
    	//Activamos la redimensión del crucigrama al cambiar el tamaño de la ventana 
		$(window).resize(function () {redimensionar("redi");});
	}
	
//Inicializamos la pista con los eventos necesarios para ello
	
	function inicializarPista()
	{
		$('#btnCerrar').click(function(e){e.preventDefault();desactivarPista();});
		idTimeout = "pista";
		$("#btnPistas").text(txtPistas);
		$("#btnPistas").click(function(e){e.preventDefault();activarPista();});
	}

//Desactivamos la pista
	
	function desactivarPista()
	{
		$('#info').removeClass('visible');
		$('#info').addClass('oculto');
		$('#shadow').removeClass('visible');
		$('#shadow').addClass('oculto');
	}

//Activamos la pista
	
	function activarPista()
	{
		$('#info').removeClass('oculto');
		$('#info').addClass('visible');
		$('#shadow').removeClass('oculto');
		$('#shadow').addClass('visible');
	}
	
//Inicializamos los puntos

	function inicializarPuntosSopa()
	{
		$("#numPuntos").html("0");
	}
	
//Inicializamos el boton de comprobar
	
	function inicializarBtnMostrar()
	{
		$('#btnMostrar').text(txtMostrarPalabra);
		$('#btnMostrar').click(function(e){e.preventDefault();mostrar();});
	}
	
//Inicializamos enlaces ayuda táctil
	
	function inicializarAyudaTactil()
	{
		if(is_touch_device())
		{
			$('#pantallaAyuda').text(descripcionT);
		}
	}

//Inicializamos los botones de ayuda

    function inicializarBtnsAyuda()
    {
        if(botonesOcultos == 1) $("#btnMostrar").css("visibility","hidden");
    }