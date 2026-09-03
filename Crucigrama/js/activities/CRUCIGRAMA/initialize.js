//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio del Crucigrama)
//==========================================================================================================================

//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	function extraerDatos()
	{
		//Las variables que no estan definidas en este caso, pero se utilizan el los JS comunes, las inicializamos así
		
		tipo_actividad = "Crucigrama";
		
		try{
			origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;
		}catch(e)
		{
			origen_recursos="";
		}
        
		if(origen_recursos){
			rutaRecursos = origen_recursos;
		}
		ocultar_reiniciar = xmlDoc.getElementsByTagName("ocultar_reiniciar")[0].childNodes[0].nodeValue;
		ocultar_respuestas = xmlDoc.getElementsByTagName("ocultar_respuestas")[0].childNodes[0].nodeValue;
		ocultar_redes = xmlDoc.getElementsByTagName("ocultar_redes")[0].childNodes[0].nodeValue;
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
		
		numero_intentos = "noDefinido";
		sensible_mayusculas = "noDefinido";
		sensible_mayusculas_ocultar = "si";
		sensible_acentos_ocultar = "si";
		sensible_acentos = "noDefinido"; 
		
		if(xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0] != undefined)
		{
			tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		}
		else
		{
			tiempo = "no";
		}
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
		enunciado = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
        botonesOcultos = xmlDoc.getElementsByTagName("botonesOcultos")[0].childNodes[0].nodeValue;
			
		var idioma = xmlDoc.getElementsByTagName("idioma")[0];
		instrucciones = idioma.getElementsByTagName("instrucciones")[0].childNodes[0].nodeValue;
		txtPuntos = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
		txtTiempo = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
		txtTiempoRestante = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
		comprobar = idioma.getElementsByTagName("comprobar")[0].childNodes[0].nodeValue;
		txtRespuestaIncorrecta = idioma.getElementsByTagName("txtRespuestaIncorrecta")[0].childNodes[0].nodeValue;
		txtActNoSuperada = idioma.getElementsByTagName("txtActNoSuperada")[0].childNodes[0].nodeValue;
		txtTiempoSuperado = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
		txtCerrar = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
		txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtRespuestaCorrecta = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtBoxRespuestaCorrecta = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtPedirPistaPalabra = idioma.getElementsByTagName("txtPedirPistaPalabra")[0].childNodes[0].nodeValue;
		txtPedirPistaLetra = idioma.getElementsByTagName("txtPedirPistaLetra")[0].childNodes[0].nodeValue;
		txtDefinicionAudio = idioma.getElementsByTagName("txtDefinicionAudio")[0].childNodes[0].nodeValue;
		txtTituloDefinicion = idioma.getElementsByTagName("txtTituloDefinicion")[0].childNodes[0].nodeValue;
		txtTituloErrorImagen = idioma.getElementsByTagName("txtTituloErrorImagen")[0].childNodes[0].nodeValue;
		txtErrorImagen = idioma.getElementsByTagName("txtErrorImagen")[0].childNodes[0].nodeValue;
		txtTituloErrorAudio = idioma.getElementsByTagName("txtTituloErrorAudio")[0].childNodes[0].nodeValue;
		txtErrorAudio = idioma.getElementsByTagName("txtErrorAudioSoportado")[0].childNodes[0].nodeValue;
		nIntentos = idioma.getElementsByTagName("nIntentos")[0].childNodes[0].nodeValue;
		txtSuperadoNumeroIntentos = idioma.getElementsByTagName("txtSuperadoNumeroIntentos")[0].childNodes[0].nodeValue;
        txtActividadNoSuperada = idioma.getElementsByTagName("txtActividadNoSuperada")[0].childNodes[0].nodeValue;
        
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
		txtResponder = idioma.getElementsByTagName("txtResponder")[0].childNodes[0].nodeValue;
		txtRegistrarse = idioma.getElementsByTagName("txtRegistrarse")[0].childNodes[0].nodeValue;
		txtAcceder = idioma.getElementsByTagName("txtAcceder")[0].childNodes[0].nodeValue;
		txtCompartirResultado = idioma.getElementsByTagName("txtCompartirResultado")[0].childNodes[0].nodeValue;
		txtAumentar = idioma.getElementsByTagName("txtAumentar")[0].childNodes[0].nodeValue;
		txtReducir = idioma.getElementsByTagName("txtReducir")[0].childNodes[0].nodeValue;
		txtImprimir = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
		txtPantallaCompleta = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
		txtInfoAdicional = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;
		txtSocial = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
				
		columnas = xmlDoc.getElementsByTagName("numero_columnas")[0].childNodes[0].nodeValue;
		filas = xmlDoc.getElementsByTagName("numero_filas")[0].childNodes[0].nodeValue;
		
		//Creamos una serie de arrays con la informacion de las palabras
		pa = [];
		ti = [];
		de = [];
		fi = [];
		co = [];
		di = [];
		fe = [];
	
		var palab = xmlDoc.getElementsByTagName("palabra");
		for (var i = 0; i < palab.length; i++)
 		{
  			pa[i] = palab[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
  			ti[i] = palab[i].getElementsByTagName("tipo")[0].childNodes[0].nodeValue;
  			de[i] = palab[i].getElementsByTagName("definicion")[0].childNodes[0].nodeValue;
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

//Inicializamos los elementos del crucigrama
	
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
		//Inicializamos el titulo de la propia aplicacion
		inicializarTituloAct();
		//Inicializamos el evento del boton comprobar
		inicializarBtnComprobar();
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
//Esta variable controla si hacemos redimension al ir a contestar en dispositivos pequeños
var redimensionamos = 0;
	
	function inicializarPista()
	{
		$('#pistaLetra').text(txtPedirPistaLetra);
		$('#pistaPalabra').text(txtPedirPistaPalabra);
		$('#btnResponder').text(txtResponder);
		$('#btnCerrar').click(function(e){e.preventDefault();desactivarPista();desactivar("fin");});
		$('#btnResponder').click(function(e){e.preventDefault();desactivarPista();redimensionamos=1;$('#control').focus();setTimeout(function(){$('#control').focus();},1200);});
		idTimeout = "pista";
		$('#pistaLetra').click(function(e){e.preventDefault();desactivarPista();ayudal();});
		$('#pistaPalabra').click(function(e){e.preventDefault();desactivarPista();ayudap();});
	}

//Desactivamos la pista
	
	function desactivarPista()
	{
		if($('#all').width() <= 600) $(".activa").bind("click", actualizar);
		$('#info').removeClass('visible');
		$('#info').addClass('oculto');
		$('#shadow').removeClass('visible');
		$('#shadow').addClass('oculto');
		var audio = document.getElementById("audio_0");
		if(audio != null) audio.pause();
	}

//Activamos la pista
	
	function activarPista()
	{
		if($('#all').width() <= 600) $(".activa").unbind("click");
		$('#info').removeClass('oculto');
		$('#info').addClass('visible');
		$('#shadow').removeClass('oculto');
		$('#shadow').addClass('visible');
	}
	
//Inicializamos el boton de comprobar
	
	function inicializarBtnComprobar()
	{
		$('#btnComprobar').text(comprobar);
		$('#btnComprobar').click(function(e){e.preventDefault();corregir();});
	}

//Inicializamos los botones de ayuda

    function inicializarBtnsAyuda()
    {
        if(botonesOcultos == 1) $(".btnsPistaExtra").hide();
    }

