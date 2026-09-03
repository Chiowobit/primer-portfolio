//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio de Relacionar Columnas)
//==========================================================================================================================
   
//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	function extraerDatos()
	{
		tipo_actividad = "RelacionarColumnas";
		
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
		
		if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {
			autor = '';
		} else {
			autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;
		}
		descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
		
		registro = xmlDoc.getElementsByTagName("registro")[0];
		
		tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		if(tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value;
		else if (tiempo == "no") tiempo = 0;
				
		descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;
		enunciado = xmlDoc.getElementsByTagName("tituloApli")[0].childNodes[0].nodeValue;
		pregunta = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
        
		txtGrupo = xmlDoc.getElementsByTagName("idioma")[0].getElementsByTagName("txtGrupo")[0].childNodes[0].nodeValue;
		
		grupos = new Array();
		var parejas = xmlDoc.getElementsByTagName("pareja");
		for(i=0;i<parejas.length;i++)
		{
			var datosPareja = new Array();
			
			datosPareja["id"] = parejas[i].attributes.getNamedItem("id").value;
            elementoA = parejas[i].getElementsByTagName("elementoA")[0];
			elementoB = parejas[i].getElementsByTagName("elementoB")[0];
            datosPareja["elementoA_Tipo"] =  elementoA.attributes.getNamedItem("tipo").value;
			datosPareja["elementoA_Valor"] =  elementoA.childNodes[0].nodeValue;
            datosPareja["elementoB_Tipo"] =  elementoB.attributes.getNamedItem("tipo").value;
			datosPareja["elementoB_Valor"] =  elementoB.childNodes[0].nodeValue;
            
            grupos[i] = datosPareja;
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
		//Activamos la redimensión del crucigrama al cambiar el tamaño de la ventana 
		$(window).resize(function () {redimensionar();});
	}