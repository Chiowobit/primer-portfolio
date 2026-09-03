//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio de Ruleta Palabras)
//==========================================================================================================================
   
//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	var tipo_actividad = '';
	var origen_recursos = '';
	var rutaRecursos = '';
	var ocultar_reiniciar = '';
	var ocultar_respuestas = '';
	var ocultar_redes = '';
	var colorFuente = '';
	var colorFuenteB = '';
	var colorFuenteInt = '';
	var colorFondo = '';
	var colorFondoInt = '';
	var colorBotones = '';
	var logoPersonalizado = '';
  var franjaPersonalizada = '';
  var numero_intentos = '';
	var puntos_resta = '';
	var puntos = '';
  var sensible_mayusculas = '';
  var sensible_acentos = '';
  var sensible_mayusculas_ocultar = '';
  var sensible_acentos_ocultar = '';
  var autor = '';
  var descripcionUsuario = '';
	var registro = '';
	var tiempo = '';
	var descripcion = '';
	var enunciado = '';
	var pregunta = '';
	var txtGrupo = '';
	var elementos = '';
	var nIntentos = '';
	var txtPuntos = '';
	var txtTiempo = '';
	var txtTiempoRestante = '';
	var txtRespuestaIncorrecta = '';
	var txtTiempoSuperado = '';
	var txtCerrar = '';
	var txtTituloRespuestaCorrecta = '';
	var txtSuperadoNumeroIntentos = '';
	var txtTituloSuperadoNumeroIntentos = '';
	var txtTituloActividadNoSuperada = '';
	var txtTituloActividadSuperada = '';
	var txtActividadSuperada = '';
	var txtTituloRespuestaIncorrecta = '';
	var txtGrupoCorrecto = '';
	var txtBoxRespuestaCorrecta = '';
	var txtAceptar = '';
	var txtTiempoMaximo = '';
	var txtSensible = '';
	var txtMayusculasMinusculas = '';
	var txtAcentos = '';
	var txtComenzar = '';
	var txtAutor = '';
	var txtAyuda = '';
	var txtMostrarMas = '';
	var txtMostrarMenos = '';
	var txtReiniciar = '';
	var txtVolverJugar = '';
	var txtResponder = '';
	var txtRegistrarse = '';
	var txtAcceder = '';
	var txtCompartirResultado = '';
	var txtImprimir = '';
	var txtPantallaCompleta = '';
  var txtEmpieza = '';
  var txtContiene = '';
  var txtSiguiente = '';
  var txtComprobar = '';
  var txtSocial = '';
	
	function extraerDatos()
	{	
		tipo_actividad = "RuletaPalabras";
		
		try{origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;}catch(e){origen_recursos = "";}
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
		
		numero_intentos = xmlDoc.getElementsByTagName("numero_intentos")[0].childNodes[0].nodeValue;
		puntos_resta = xmlDoc.getElementsByTagName("puntos_resta")[0].childNodes[0].nodeValue;
		puntos = xmlDoc.getElementsByTagName("puntos")[0].childNodes[0].nodeValue;
		
		if(xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0] != undefined)
		{
			sensible_mayusculas = xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_mayusculas = "no";
		}
		
		if(xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0] != undefined)
		{
			sensible_acentos = xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_acentos = "no";
		}
		
		if(xmlDoc.getElementsByTagName("sensible_mayusculas_ocultar")[0].childNodes[0] != undefined)
		{
			sensible_mayusculas_ocultar = xmlDoc.getElementsByTagName("sensible_mayusculas_ocultar")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_mayusculas_ocultar = "no";
		}
		
		if(xmlDoc.getElementsByTagName("sensible_acentos_ocultar")[0].childNodes[0] != undefined)
		{
			sensible_acentos_ocultar = xmlDoc.getElementsByTagName("sensible_acentos_ocultar")[0].childNodes[0].nodeValue;
		}
		else
		{
			sensible_acentos_ocultar = "no";
		}
		
		if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {
			autor = '';
		} else {
			autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;
		}
		try{descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;}catch(e){descripcionUsuario = "";}
		
		registro = xmlDoc.getElementsByTagName("registro")[0];
		
		tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		if(tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value;
		else if (tiempo == "no") tiempo = 0;
				
		try{descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;}catch(e){descripcion = "";}
		enunciado = xmlDoc.getElementsByTagName("tituloApli")[0].childNodes[0].nodeValue;
		pregunta = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
        
		txtGrupo = xmlDoc.getElementsByTagName("idioma")[0].getElementsByTagName("txtGrupo")[0].childNodes[0].nodeValue;
		
		elementos = new Array();
		var palabras = xmlDoc.getElementsByTagName("palabras")[0].getElementsByTagName("pal");
		for(i=0;i<palabras.length;i++)
		{
			var datosPalabra = new Array();
            palabra = palabras[i];
            datosPalabra["Deftipo"] =  palabra.getElementsByTagName("deftipo")[0].childNodes[0].nodeValue;
            datosPalabra["Opcion"] =  palabra.getElementsByTagName("opcion")[0].childNodes[0].nodeValue;
			datosPalabra["Letra"] =  palabra.getElementsByTagName("letra")[0].childNodes[0].nodeValue;
            if(palabra.getElementsByTagName("definicion")[0].childNodes[0]==undefined){
                datosPalabra["Definicion"] = "";
            }
            else{
                 datosPalabra["Definicion"] =  palabra.getElementsByTagName("definicion")[0].childNodes[0].nodeValue;
            } 
            if(datosPalabra["Palabra"] =  palabra.getElementsByTagName("palabra")[0].childNodes[0] ==undefined){
                                 datosPalabra["Palabra"] = "";
            }
            else{
                datosPalabra["Palabra"] =  palabra.getElementsByTagName("palabra")[0].childNodes[0].nodeValue;   
            }  
                     
            datosPalabra["Activa"] =  palabra.getElementsByTagName("palActiva")[0].childNodes[0].nodeValue;
            elementos[i] = datosPalabra;
		}
       
		var idioma = xmlDoc.getElementsByTagName("idioma")[0];
		nIntentos = idioma.getElementsByTagName("nIntentos")[0].childNodes[0].nodeValue;
		txtPuntos = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
		txtTiempo = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
		txtTiempoRestante = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
		
		txtRespuestaIncorrecta = idioma.getElementsByTagName("txtRespuestaIncorrecta")[0].childNodes[0].nodeValue;
		txtTiempoSuperado = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
		txtCerrar = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
		txtTituloRespuestaCorrecta = idioma.getElementsByTagName("txtTituloRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtSuperadoNumeroIntentos = idioma.getElementsByTagName("txtSuperadoNumeroIntentos")[0].childNodes[0].nodeValue;
		txtTituloSuperadoNumeroIntentos = idioma.getElementsByTagName("txtTituloSuperadoNumeroIntentos")[0].childNodes[0].nodeValue;
		txtTituloActividadNoSuperada = idioma.getElementsByTagName("txtTituloActividadNoSuperada")[0].childNodes[0].nodeValue;
		txtTituloActividadSuperada = idioma.getElementsByTagName("txtTituloActividadSuperada")[0].childNodes[0].nodeValue;
		txtActividadSuperada = idioma.getElementsByTagName("txtActividadSuperada")[0].childNodes[0].nodeValue;
  		txtTituloRespuestaIncorrecta = idioma.getElementsByTagName("txtTituloRespuestaIncorrecta")[0].childNodes[0].nodeValue;
  		txtGrupoCorrecto = idioma.getElementsByTagName("txtGrupoCorrecto")[0].childNodes[0].nodeValue;
		txtBoxRespuestaCorrecta = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
		
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
		txtImprimir = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
		txtPantallaCompleta = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
        txtEmpieza = idioma.getElementsByTagName("txtEmpieza")[0].childNodes[0].nodeValue;
        txtContiene = idioma.getElementsByTagName("txtContiene")[0].childNodes[0].nodeValue;
        txtSiguiente = idioma.getElementsByTagName("txtSiguente")[0].childNodes[0].nodeValue;
        txtComprobar = idioma.getElementsByTagName("txtComprobar")[0].childNodes[0].nodeValue;
        txtSocial = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
        
	}
	
//Inicializamos los diferentes elementos de nuestra aplicacion
	
	function inicializarElementos()
	{
	    //Inicializamos los colores de la aplicacion
		inicializarColores();
		//Inicializamos eventos principales
		inicializarEventosPrincipales();
		//Inicializamos los valores para la pantalla inicial
		inicializarPantallaInicial();
		//Inicializamos los parametros
		inicializarParametros();
		//Inicializamos el titulo de la propia aplicacion
		inicializarTituloAct();
		//Inicializamos la alerta correcta
		inicializarAlertaCorrecta();
		//Inicializar alerta incorrecta
		inicializarAlertaIncorrecta();
		//Inicializamos enlaces reinicio
		inicializarRecargar();
		//Inicializamos enlaces ayuda
		inicializarAyuda();
		//Inicializamos el registro
		inicializarRegistro();
	}

//Inicializamos los eventos principales

	function inicializarEventosPrincipales()
	{
		$(window).resize(function () {redimensionar();});
	}