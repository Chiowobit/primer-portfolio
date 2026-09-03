//==========================================================================================================================
//Funciones que vamos a utilizar para inicializar elementos de nuestra aplicacion (Propio del Test)
//==========================================================================================================================
   
//Extraemos del XML todos los datos necesarios para nuestra aplicacion

	function extraerDatos()
	{
		tipo_actividad = "Test";
		
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
		
		numero_intentos = 0;
		
		if((xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0] != undefined)&&(xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0] != null)) sensible_mayusculas = xmlDoc.getElementsByTagName("sensible_mayusculas")[0].childNodes[0].nodeValue;
		else sensible_mayusculas = "no";
		if((xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0] != undefined)&&(xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0] != null)) sensible_acentos = xmlDoc.getElementsByTagName("sensible_acentos")[0].childNodes[0].nodeValue;
		else sensible_acentos = "no";
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
		
		tiempo = xmlDoc.getElementsByTagName("tiempo")[0].childNodes[0].nodeValue;
		if(tiempo == "si") tiempo = xmlDoc.getElementsByTagName("tiempo")[0].attributes.getNamedItem("maximo").value;
		else if (tiempo == "no") tiempo = 0;
		
		if (xmlDoc.getElementsByTagName("autor")[0].childNodes.length == 0) {
			autor = '';
		} else {
			autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;
		}
		descripcionUsuario = xmlDoc.getElementsByTagName("descripcionUsuario")[0].childNodes[0].nodeValue;
		globalFeedback = xmlDoc.getElementsByTagName("globalFeedback")[0].childNodes[0].nodeValue;
		
		registro = xmlDoc.getElementsByTagName("registro")[0];
		
		descripcion = xmlDoc.getElementsByTagName("descripcion")[0].childNodes[0].nodeValue;	
		enunciado = xmlDoc.getElementsByTagName("tituloActividad")[0].childNodes[0].nodeValue;
		txtTituloResponder = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
		
		orden_preguntas = xmlDoc.getElementsByTagName("orden_preguntas")[0].childNodes[0].nodeValue;
		numPreguntasTotal = xmlDoc.getElementsByTagName("numero_preguntas_totales")[0].childNodes[0].nodeValue;
		numPreguntasTotal = parseInt(numPreguntasTotal);
		numPreguntas = xmlDoc.getElementsByTagName("numero_preguntas_visibles")[0].childNodes[0].nodeValue;
		numPreguntas = parseInt(numPreguntas);
		porcentaje_superar_actividad = xmlDoc.getElementsByTagName("porcentaje_superar_actividad")[0].childNodes[0].nodeValue; 
		preguntas = xmlDoc.getElementsByTagName("pregunta");
		
		
		aPreguntas = new Array();  
		aRespuestas = new Array();
		
		var aceptar = 0;
		var posicion = 0;
		var colocadas = [];
		
		for(m=0;m<numPreguntasTotal;m++)
		{
			if(orden_preguntas == "ALEATORIO")
			{
				aceptar = 0;
				while(aceptar == 0)
				{
					posicion = Math.floor((Math.random()*1000));
					if(posicion < numPreguntasTotal)
					{
						aceptar=1;
						for(k=0;k<colocadas.length;k++)
						{
							if(colocadas[k] == posicion)
							{
								aceptar=0;
							}
						}
					}
				}
				colocadas.push(posicion);
				i = posicion;
			}
			else
			{
				i = m;
			}
			
			var enunciadoP = preguntas[i].getElementsByTagName("enunciado")[0];
			
			var aPreg = new Array();
			
			aPreg["tipo"] = preguntas[i].attributes.getNamedItem("tipo").value;
			aPreg["obligatoria"] = preguntas[i].attributes.getNamedItem("obligatoria").value;
			aPreg["id"] = preguntas[i].attributes.getNamedItem("id").value;
            aPreg["feedback"] = preguntas[i].attributes.getNamedItem("feedback").value;
			
			if((enunciadoP.childNodes[0] != undefined)&&(enunciadoP.childNodes[0] != null)) aPreg["pregunta"] = enunciadoP.childNodes[0].nodeValue;
			else aPreg["pregunta"] = "";
			aPreg["tipoE"] = enunciadoP.attributes.getNamedItem("tipo").value;
			aPreg["video"] = enunciadoP.attributes.getNamedItem("video").value;
			aPreg["videoT"] = enunciadoP.attributes.getNamedItem("videoStartTime").value;
			aPreg["audio"] = enunciadoP.attributes.getNamedItem("audio").value;
			if(enunciadoP.attributes.getNamedItem("image") != undefined) aPreg["imagen"] = enunciadoP.attributes.getNamedItem("image").value;
			else aPreg["imagen"] = "";
			
			aPreguntas[m] = aPreg;
			
			var respuestas = preguntas[i].getElementsByTagName("opciones")[0];
			var opciones = respuestas.getElementsByTagName("opcion");
			
			var aResp = new Array();
			
			for(j=0;j<opciones.length;j++)
			{
				var aRespI = new Array();
				
				aRespI["respuesta"] = opciones[j].childNodes[0].nodeValue;
				aRespI["correcta"] = opciones[j].attributes.getNamedItem("resp").value;
				if(opciones[j].attributes.getNamedItem("image") != undefined) aRespI["imagen"] = opciones[j].attributes.getNamedItem("image").value;
				else aRespI["imagen"] = "";
				
				aResp[j] = aRespI;
			}
			
			aRespuestas[m] = aResp;
		}
        
        gMargenes = xmlDoc.getElementsByTagName("margenes")[0];
        mActivo = gMargenes.attributes.getNamedItem("activo").value;
        margenes = gMargenes.getElementsByTagName("margen");
        if(mActivo == 'si')
        {
            aMargenes = new Array();
            for(k=0;k<margenes.length;k++)
			{
			     aMargen = new Array();
			     aMargen["ini"] = margenes[k].attributes.getNamedItem("ini").value;
                 aMargen["fin"] = margenes[k].attributes.getNamedItem("fin").value;
                 aMargen["mensaje"] = margenes[k].attributes.getNamedItem("mensaje").value;
                 aMargenes[k] = aMargen;
			}
        }
				
		var idioma = xmlDoc.getElementsByTagName("idioma")[0];
		txtPuntos = idioma.getElementsByTagName("txtPuntos")[0].childNodes[0].nodeValue;
		txtTiempo = idioma.getElementsByTagName("txtTiempo")[0].childNodes[0].nodeValue;
		txtTiempoRestante = idioma.getElementsByTagName("txtTiempoRestante")[0].childNodes[0].nodeValue;
		txtRespuestaIncorrecta = idioma.getElementsByTagName("txtRespuestaIncorrecta")[0].childNodes[0].nodeValue;
		txtActNoSuperada = idioma.getElementsByTagName("txtTituloActividadNoSuperada")[0].childNodes[0].nodeValue;
		txtTiempoSuperado = idioma.getElementsByTagName("txtTiempoSuperado")[0].childNodes[0].nodeValue;
		txtCerrar = idioma.getElementsByTagName("txtCerrar")[0].childNodes[0].nodeValue;
		txtRespuestaCorrecta = idioma.getElementsByTagName("txtRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtBoxRespuestaCorrecta = idioma.getElementsByTagName("txtBoxRespuestaCorrecta")[0].childNodes[0].nodeValue;
		txtSensibleMayusculas = idioma.getElementsByTagName("txtSensibleMayusculas")[0].childNodes[0].nodeValue;
		txtNoSensibleMayusculas = idioma.getElementsByTagName("txtNoSensibleMayusculas")[0].childNodes[0].nodeValue;
		txtSensibleAcentos = idioma.getElementsByTagName("txtSensibleAcentos")[0].childNodes[0].nodeValue;
		txtNoSensibleAcentos = idioma.getElementsByTagName("txtNoSensibleAcentos")[0].childNodes[0].nodeValue;
		txtTituloErrorAudio = idioma.getElementsByTagName("txtTituloErrorAudio")[0].childNodes[0].nodeValue;
		txtErrorAudio = idioma.getElementsByTagName("txtErrorAudioSoportado")[0].childNodes[0].nodeValue;
		txtObligatoria = idioma.getElementsByTagName("txtObligatoria")[0].childNodes[0].nodeValue;
		txtProgreso = idioma.getElementsByTagName("txtProgreso")[0].childNodes[0].nodeValue;
		txtPorcentajeMinimo1 = idioma.getElementsByTagName("txtPorcentajeMinimo1")[0].childNodes[0].nodeValue;
		txtPorcentajeMinimo2 = idioma.getElementsByTagName("txtPorcentajeMinimo2")[0].childNodes[0].nodeValue;
		txtPreguntas = idioma.getElementsByTagName("txtPreguntas")[0].childNodes[0].nodeValue;
		txtContestadas = idioma.getElementsByTagName("txtContestadas")[0].childNodes[0].nodeValue;
		txtNoContestadas = idioma.getElementsByTagName("txtNoContestadas")[0].childNodes[0].nodeValue;
		txtNumObligatoria1 = idioma.getElementsByTagName("txtNumObligatoria1")[0].childNodes[0].nodeValue;
		txtNumObligatorias1 = idioma.getElementsByTagName("txtNumObligatorias1")[0].childNodes[0].nodeValue;
		txtNumObligatorias2 = idioma.getElementsByTagName("txtNumObligatorias2")[0].childNodes[0].nodeValue;
		txtFinalizar = idioma.getElementsByTagName("txtFinalizar")[0].childNodes[0].nodeValue;
		txtMal = idioma.getElementsByTagName("txtMal")[0].childNodes[0].nodeValue;
		txtBien = idioma.getElementsByTagName("txtBien")[0].childNodes[0].nodeValue;
		txtVerCorregir = idioma.getElementsByTagName("txtVerCorregir")[0].childNodes[0].nodeValue;
		txtHasAprobado = idioma.getElementsByTagName("txtHasAprobado")[0].childNodes[0].nodeValue;
		txtHasSuspendido = idioma.getElementsByTagName("txtHasSuspendido")[0].childNodes[0].nodeValue;
		txtTuPuntuacionEs = idioma.getElementsByTagName("txtTuPuntuacionEs")[0].childNodes[0].nodeValue;
		txtPosiblesRespuestas = idioma.getElementsByTagName("txtPosiblesRespuestas")[0].childNodes[0].nodeValue;
		txtTuRespuesta = idioma.getElementsByTagName("txtTuRespuesta")[0].childNodes[0].nodeValue;
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
		txtImprimir = idioma.getElementsByTagName("txtImprimir")[0].childNodes[0].nodeValue;
		txtPantallaCompleta = idioma.getElementsByTagName("txtPantallaCompleta")[0].childNodes[0].nodeValue;
		txtAnterior = idioma.getElementsByTagName("txtAnterior")[0].childNodes[0].nodeValue;
		txtSiguiente = idioma.getElementsByTagName("txtSiguiente")[0].childNodes[0].nodeValue;
		txtInfoAdicional = idioma.getElementsByTagName("txtInfoAdicional")[0].childNodes[0].nodeValue;	
		txtSocial = idioma.getElementsByTagName("txtSocial")[0].childNodes[0].nodeValue;
	}
	
//Inicializamos los diferentes elementos de nuestra aplicacion
	
	function inicializarElementos()
	{
	    //Inicializamos los colores de la aplicacion
		inicializarColores();
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
		//Inicializamos los botones para avanzar o retroceder por las preguntas
		inicializarBotones();	
	}
	
//Inicializamos los botones para avanzar o retroceder por las preguntas
	
	function inicializarBotones()
	{
		$("#btnAtras").html(txtAnterior);
		$("#btnAdelante").html(txtSiguiente);
		$("#btnAtras").click(function(e){e.preventDefault();cambiarPregunta("AT");});
		$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
	}
