//==========================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio del Test)
//==========================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion

    function comenzar()
    {	
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
		
		//Cargamos la primera pregunta
		$(".preguntas").hide();
		$("#pregunta"+cadenaBtn).show();
		setTimeout(function(){if($("#pistaAudio"+cadenaBtn).length != 0) $('#btnAudio'+cadenaBtn).click();},500);
		$("#numTest00").html((numBtn+1)+".");
		$("#indica").html((numBtn+1)+"/"+numPreguntas);
		$("#avance").css("width",(numBtn+1)*100/numPreguntas+"%");
		$("#btnAtras").unbind("click").addClass("disable").bind("click",function(e){e.preventDefault();});
		if(aPreguntas[numBtn]["obligatoria"] == "si")
		{
			$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
			$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
		} 
		
		//Lanzamos el contador de tiempo
		idInterval = setInterval(contador,1000);
   	}
   	
//Redimensionamos la aplicacion al cambiar de tamaño la pantalla

	function redimensionar()
	{	
		//Reinicializamos la descripción Inicial de Usuario
		cargarDescripcionInicio();
	}

//Controlamos el audio y sus parámetros de tiempo transcurrido y duración de la pista de audio
//Reproducimos el audio correspondiente

	function gestionReproducir(e)
	{
		var id = e.target.getAttribute('id');
		var cadenaId = id.substring(10,12);
		var numId = parseInt(cadenaId);
		if(numId<10) var numIdx = "00"+numId;
        else if(numId<100) var numIdx = "0"+numId;
		else var numIdx = numId;
		reproducir("audioR"+numIdx);
	}

//Reproducimos la pista de audio
var compruebaFin = 0;
	
	function reproducir(media,icono)
	{
		try{document.getElementById(media).currentTime = 0;}catch(e){}
		document.getElementById(media).pause();
		if(document.getElementById(media).currentTime != 0) document.getElementById(media).load();
		document.getElementById(media).play();
		$("#"+icono).removeClass("iPlay");
		$("#"+icono).addClass("iPause");
		
		clearInterval(compruebaFin);
		compruebaFin = setInterval(function(){controlFinalAudio(media,icono);},500);
	}

//Gestionamos el toogle entre play y pause que es controlado por el mismo botón
	
	function gestionReproducir(media,icono)
	{
		if($("#"+icono).hasClass("iPlay"))
		{
			$("#"+icono).removeClass("iPlay");
			$("#"+icono).addClass("iPause");
			reproducir(media,icono);
		}
		else
		{
			$("#"+icono).addClass("iPlay");
			$("#"+icono).removeClass("iPause");
			document.getElementById(media).pause();
		} 
	}

//Coontrolamos y gestionamos cuando termina de reproducirse la pista de audio
	
	function controlFinalAudio(media,icono)
	{
		if(document.getElementById(media).ended)
		{
			$("#"+icono).addClass("iPlay");
			$("#"+icono).removeClass("iPause");
			clearInterval(compruebaFin);
		}
	}
	
//Funcion que controla el tipo de error cuando no disponemos del audio			
	
	function errores(tipo)
	{
		if(tipo == -1)
		{
			$('#errorAudio').show();
			$('#audioOK').hide();
			$('#errorAudio').attr("title",txtErrorAudioSoportado);
		}
		else
		{
			$('#errorAudio_'+tipo).show();
			$('#audioOK_'+tipo).hide();
			$('#errorAudio_'+tipo).attr("title",txtErrorAudioSoportado);
		}
	}

//Activamos una pregunta u otra en funcion de los botones que pulsemos
//Estas variables controlan en que pregunta estamos
var numBtn = 0;
var numBtnAnterior = 0;
var cadenaBtn = "000";
var respondida = 0;
var respondido = [];
var saltar = "no";
var correccionActivada = 0;

	function cambiarPregunta(dir)
	{
		numBtnAnterior = numBtn;
		
		if(numBtnAnterior<10) cadenaBtnAnterior = "00"+numBtnAnterior;
        else if(numBtnAnterior<100) cadenaBtnAnterior = "0"+numBtnAnterior;
		else cadenaBtnAnterior = numBtnAnterior;
	
		if(dir == "AD")
		{
			if(aPreguntas[numBtnAnterior]["tipo"] == "unica")
			{
				respondida = 0;
				respondido[numBtnAnterior] = 0;
				for(m=0;m<aRespuestas[numBtnAnterior].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
						
					if($("#resp"+cadenaBtnAnterior+"_"+mx+":checked").val() == "on")
					{
						respondida = 1;
						respondido[numBtnAnterior] = 1;
					}
				}
			}
				
			if(aPreguntas[numBtnAnterior]["tipo"] == "multiple")
			{
				respondida = 0;
				respondido[numBtnAnterior] = 0;
				for(m=0;m<aRespuestas[numBtnAnterior].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					if($("#resp"+cadenaBtnAnterior+"_"+mx).is(':checked'))
					{
						respondida = 1;
						respondido[numBtnAnterior] = 1;
					}
				}
			}
				
			if(aPreguntas[numBtnAnterior]["tipo"].substring(0,7) == "escrita")
			{
				respondida = 0;
				respondido[numBtnAnterior] = 0;
				if($("#resp"+cadenaBtnAnterior+"_00").val() != "")
				{
					respondida = 1;
					respondido[numBtnAnterior] = 1;
				}
			}
			
			//Si la pregunta esta respondida, o no es obligatoria, actualizamos el numero de pregunta	
			if(((respondida == 1)&&(aPreguntas[numBtnAnterior]["obligatoria"] == "si"))||(aPreguntas[numBtnAnterior]["obligatoria"] != "si"))
			{
				saltar = "si";
				if(numBtn < numPreguntas) 
				{
					numBtn++;
			
					if(numBtn<10) cadenaBtn = "00"+numBtn;
                    else if(numBtn<100) cadenaBtn = "0"+numBtn;
					else cadenaBtn = numBtn;
				}
					
				if(numBtn == numPreguntas)
				{
					cargarProgreso();
				}
			} 
			else
			{
				saltar = "no";
			} 
		}
		else 
		{
			respondida = 2;
			if(numBtn > 0)
			{
				numBtn--;
				
				if(numBtn<10) cadenaBtn = "00"+numBtn;
                else if(numBtn<100) cadenaBtn = "0"+numBtn;
				else cadenaBtn = numBtn;
			}
			saltar = "si";
		}
		
		//Si aceptamos el salto de pregunta, lo hacemos y controlamos los botones activos o no
		if(saltar == "si")
		{
			//Ocultamos la pregunta anterior
			$(".preguntas").hide();
		
			//Mostramos la pregunta siguiente
			$("#pregunta"+cadenaBtn).show();
			if($("#pistaAudio"+cadenaBtnAnterior).length != 0)document.getElementById('pistaAudio'+cadenaBtnAnterior).pause();
			$('#iconoAudio'+cadenaBtnAnterior).removeClass("iPause").addClass("iPlay");
			$('#btnAudio'+cadenaBtn).click();
			
			if((aPreguntas[numBtn] != undefined)&&(numBtn != numPreguntas))
			{
				if(aPreguntas[numBtn]["obligatoria"] == "si")
				{
					if(aPreguntas[numBtn]["tipo"] == "unica")
					{
						for(m=0;m<aRespuestas[numBtn].length;m++)
						{
							if(m<10) var mx = "00"+m;
                            else if(m<100) var mx = "0"+m;
							else var mx = m;
						
							if($("#resp"+cadenaBtn+"_"+mx+":checked").val() == "on")
							{
								$("#btnAdelante").html(txtSiguiente);
								$("#btnAdelante").unbind("click");
								$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
								$("#btnAdelante").removeClass("disable").addClass("btn-primary");
								break;
							}
							else
							{
								$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
								$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
							}
						}
					}
				
					if(aPreguntas[numBtn]["tipo"] == "multiple")
					{
						for(m=0;m<aRespuestas[numBtn].length;m++)
						{
							if(m<10) var mx = "00"+m;
                            else if(m<100) var mx = "0"+m;
							else var mx = m;
					
							if($("#resp"+cadenaBtn+"_"+mx).is(':checked'))
							{
								$("#btnAdelante").html(txtSiguiente);
								$("#btnAdelante").unbind("click");
								$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
								$("#btnAdelante").removeClass("disable").addClass("btn-primary");
								break;
							}
							else
							{
								$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
								$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
							}
						}
					}
					
					if(aPreguntas[numBtn]["tipo"].substring(0,7) == "escrita")
					{
						if($("#resp"+cadenaBtn+"_00").val().length != 0)
						{
							$("#btnAdelante").html(txtSiguiente);
							$("#btnAdelante").unbind("click");
							$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
							$("#btnAdelante").removeClass("disable").addClass("btn-primary");
						}
						else
						{
							$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
							$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
						}
					}
				}
				else
				{
					$("#btnAdelante").html(txtSiguiente);
					$("#btnAdelante").unbind("click");
					$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
					$("#btnAdelante").removeClass("disable").addClass("btn-primary");
				}
			}
			
			if(numBtn == 0)
			{
				$("#btnAtras").unbind("click").addClass("disable").bind("click",function(e){e.preventDefault();});
			}
			else
			{
				$("#btnAtras").removeClass("disable");
				$("#btnAtras").unbind("click");
				$("#btnAtras").click(function(e){e.preventDefault();cambiarPregunta("AT");});
			}
			
			if(numBtn != numPreguntas)
			{
				$("#indica").html((numBtn+1)+"/"+numPreguntas);
				$("#avance").css("width",(numBtn+1)*100/numPreguntas+"%");
				$("#numTest"+cadenaBtn).html((numBtn+1)+".");
			}
			
			//Si es la última pantalla y estamos en la corrección, saltamos a la pantalla final directamente
			if(correccionActivada == 1)
			{
				if(numBtn == numPreguntas)
				{
					$('#resumen').show();
					$('#contentAct').hide();
					$("#btnVerCorreccion").unbind("click");
					$("#btnVerCorreccion").click(function(e){
						e.preventDefault();
						$('#resumen').hide();
						$('#contentAct').show();
						numBtn = 0;
						cadenaBtn = "000";
						$("#indica").html((numBtn+1)+"/"+numPreguntas);
						$("#avance").css("width",(numBtn+1)*100/numPreguntas+"%");
						$("#numTest"+cadenaBtn).html((numBtn+1)+".");
						$(".preguntas").hide();
						$("#pregunta"+cadenaBtn).show();
						$("#btnAtras").unbind("click").click(function(e){e.preventDefault();cambiarPregunta("AT");});
						$("#btnAdelante").unbind("click").click(function(e){e.preventDefault();cambiarPregunta("AD");});
						$("#btnAtras").addClass("disable");
						$("#btnAdelante").removeClass("disable").addClass("btn-primary");
					});
				}
			} 
		}
	}

//Activar elemento seleccionado de Radio

	function activarChequedR(e)
	{
		var id = e.target.getAttribute('id');
		var cadenaIdP = id.substring(4,7);
		var cadenaId = id.substring(4,11);
		$("#respuestas"+cadenaIdP+" .respuesta").removeClass("activa");
		$("#respuesta"+cadenaId).addClass("activa");
		comprobarRespuesta("unica");
	}

//Activar elemento seleccionado de Checkbox
	
	function activarChequedCB(e)
	{
		var id = e.target.getAttribute('id');
		var cadenaId = id.substring(4,11);
		if($("#respuesta"+cadenaId).hasClass("activa")) $("#respuesta"+cadenaId).removeClass("activa");
		else $("#respuesta"+cadenaId).addClass("activa");
		comprobarRespuesta("multiple");
	}
	
//Comprobamos si hay respuesta o no para activar o no el boton de avance

	function comprobarRespuesta(tipo)
	{
		if(tipo == "unica")
		{
			if(aPreguntas[numBtn]["obligatoria"] == "si")
			{
				$("#btnAdelante").html(txtSiguiente);
				$("#btnAdelante").unbind("click");
				$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
				$("#btnAdelante").removeClass("disable").addClass("btn-primary");
			}
		}
		
		if(tipo == "multiple")
		{
			if(aPreguntas[numBtn]["obligatoria"] == "si")
			{
				for(m=0;m<aRespuestas[numBtn].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					if($("#resp"+cadenaBtn+"_"+mx).is(':checked'))
					{
						$("#btnAdelante").html(txtSiguiente);
						$("#btnAdelante").unbind("click");
						$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
						$("#btnAdelante").removeClass("disable").addClass("btn-primary");
						break;
					}
					else
					{
						$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
						$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
					}
				}
			}
		}
		
		if(tipo == "escrita")
		{
			if(aPreguntas[numBtn]["obligatoria"] == "si")
			{		
				if($("#resp"+cadenaBtn+"_00").val().length != 0)
				{
					$("#btnAdelante").html(txtSiguiente);
					$("#btnAdelante").unbind("click");
					$("#btnAdelante").click(function(e){e.preventDefault();cambiarPregunta("AD");});
					$("#btnAdelante").removeClass("disable").addClass("btn-primary");
				}
				else
				{
					$("#btnAdelante").html("<div class='tooltip derecha'>"+txtObligatoria+"</div>"+$("#btnAdelante").html());
					$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
				}
			}
		}
	}	
	
//Cargamos los datos de progreso en la última pantalla

	function cargarProgreso()
	{		
		$("#btnAdelante").html(txtSiguiente);
		$("#btnAdelante").unbind("click").addClass("disable").removeClass("btn-primary").bind("click",function(e){e.preventDefault();});
			
		var numContestadas = 0;
		var numNoContestadas = 0;
		var numObligatorias = 0;
		
		for(l=0;l<respondido.length;l++)
		{
			if(respondido[l]==1) numContestadas++;  
		}
		numNoContestadas = numPreguntas - numContestadas;
		
		for(l=0;l<aPreguntas.length;l++)
		{
			if(aPreguntas[l]["obligatoria"] == "si") numObligatorias++;
		}
		
		if(numPreguntas<10) var numPreguntasx = "00"+numPreguntas;
        else if(numPreguntas<100) var numPreguntasx = "0"+numPreguntas;
		else var numPreguntasx = numPreguntas;
		
		$("#imPregunta"+numPreguntasx).hide();
		$("#pMultimedia"+numPreguntasx).hide();
		$("#tituloResponder"+numPreguntasx).addClass("titFinalizar");
		
		$("#respuestas"+numPreguntasx).html("");
		var porcentaje = (numContestadas * 100 / numPreguntas);
		
		var cadena = "";
		cadena += "<div class='contentFinalizar'>";
        cadena += "<div class='infoAprobar'>"+txtPorcentajeMinimo1+" "+porcentaje_superar_actividad+"% "+txtPorcentajeMinimo2+"</div>";        
		cadena += "<div id='numPreguntasF' class='numPreguntasF'>"+txtPreguntas+" <strong>["+numPreguntas+"]</strong></div>";
		cadena += "<div class='graFinalizar'>";
		cadena += "<div id='barraF' class='barFinalizar'>";
		cadena += "<div id='numContestadasF' class='numContestadasF' style='width:"+porcentaje+"%;'></div>";
		cadena += "</div>";
		cadena += "<div id='numContestadasTxtF' class='numContestadasTxtF numGrafica'>"+numContestadas + " " + txtContestadas+"</div>";
        cadena += "<div id='numNoContestadasTxtF' class='numNoContestadasTxtF numGrafica'>"+numNoContestadas + " " + txtNoContestadas+"</div>";
        cadena += "</div>";
        cadena += "<div class='clear'></div>";
        cadena += "</div></div>";
        cadena += "<div class='btnFinalar'>";
        cadena += "<a href='#' class='btn btn-primary' id='btnFinalizar'>"+txtFinalizar+"</a>";
        cadena += "</div>";	
        
        $("#respuestas"+numPreguntasx).html(cadena);
        $("#btnFinalizar").click(function(e){e.preventDefault();corregir();});	
	}
	
//Corregimos las respuestas dadas
var correccion = [];
var puntosReg = 100;

	function corregir()
	{
		for(k=0;k<numPreguntas;k++)
		{
			if(k<10) var kx = "00"+k;
            else if(k<100) var kx = "0"+k;
			else var kx = k;
			
			if(aPreguntas[k]["tipo"] == "unica")
			{
				for(m=0;m<aRespuestas[k].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
						
					if($("#resp"+kx+"_"+mx+":checked").val() == "on")
					{
						if(aRespuestas[k][m]["correcta"] == 1)
						{
							correccion[k] = "OK";
						}
						else
						{
							correccion[k] = "MAL";
						}
					}
				}
			}
				
			if(aPreguntas[k]["tipo"] == "multiple")
			{
				for(m=0;m<aRespuestas[k].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					if($("#resp"+kx+"_"+mx).is(':checked'))
					{
						if(aRespuestas[k][m]["correcta"] == 1)
						{
							correccion[k] = "OK";
						}
						else
						{
							correccion[k] = "MAL";
							break;
						}
					}
					else
					{
						if(aRespuestas[k][m]["correcta"] == 1)
						{
							correccion[k] = "MAL";
							break;
						}
					}
				}
			}
				
			if(aPreguntas[k]["tipo"].substring(0,7) == "escrita")
			{
				for(m=0;m<aRespuestas[k].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					var cont = $("#resp"+kx+"_00").val();
					var resp = aRespuestas[k][m]["respuesta"];
                    //Quito espacios delante y detrás
                    cont = cont.trim();
                    resp = resp.trim();
                    
					if(sensible_mayusculas == "no")
					{	 
						cont = cont.toUpperCase();
						resp = resp.toUpperCase();
					}
		
					if(sensible_acentos == "no")
					{ 
						cont = borraAcentos(cont);
						resp = borraAcentos(resp);
					}
					
					if(cont == resp)
					{
						correccion[k] = "OK";
						break;
					}
					else
					{
						correccion[k] = "MAL";
					}
				}
			}
		}
		
		correctas = 0;
		incorrectas = 0;
		for(j=0;j<correccion.length;j++)
		{
			if(correccion[j]=="OK") correctas++;
		}
		incorrectas = numPreguntas - correctas;
		
		porcentajeAcierto = correctas*100/numPreguntas;
		var finalizadaOk;
		if(porcentajeAcierto >= parseInt(porcentaje_superar_actividad))
		{
			var tipoFinal = "OK";
			finalizadaOk = 1;
		}
		else
		{
			var tipoFinal = "noSuperada";
			finalizadaOk = 0;
		}
		puntosReg = parseInt(porcentajeAcierto);
		$("#numPuntos").html(parseInt(porcentajeAcierto));
		$("#btnFinalizar").unbind("click");
		$("#btnAtras").unbind("click");
		$("#btnAdelante").unbind("click");
		cargarPantallaFinal(tipoFinal,getDatosRespuestas(finalizadaOk));
	}

//En caso de que la aplicacion no sea sensible a acentos, eliminamos los acentos antes de comparar las cadenas
	
	function borraAcentos(cadenaQuitar) 
	{  
     	var conAcentos= "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";  
        var sinAcentos = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";  
        var nueva = "";
        var encontrada = 0;
        for(i=0;i<cadenaQuitar.length;i++) 
        {	
        	encontrada = 0;  
        	for(j=0;j<conAcentos.length;j++)
        	{
             	if(cadenaQuitar[i] == conAcentos[j])
                {
                	nueva += sinAcentos[j];
                	encontrada = 1;
                	break;
                } 
       		}
       		if(encontrada == 0) nueva += cadenaQuitar[i]; 	  
    	}
     	return nueva;   
 	}
 	
//Completamos la pantalla final con la corrección de las palabras y su feedback si esque lo tiene

	function completarPantallaFinal()
	{
        if(mActivo == 'no')
        {
    		$("#correccion").addClass("resultadosTest");
    		
    		var cadena = "<div class='grafCorrecion'>";
            cadena += "<div class='titGrafica'>"+ txtTuPuntuacionEs +"</div>";
            cadena += "<div class='contentBarGrafCorreccion'>";
            cadena += "<div class='barGrafCorreccion'>";
            cadena += "<div class='numPuntuacion'>"+parseInt(porcentajeAcierto)+"%</div>";
            cadena += "<div class='barBienGrafCorreccion' style='width:"+parseInt(porcentajeAcierto)+"%'></div>";
            cadena += "</div>";
            cadena += "<div class='numBien numGrafica'>" + correctas + " " + txtBien + "</div>";
            cadena += "<div class='numMal numGrafica'>" + incorrectas + " " + txtMal + "</div>";
            cadena += "</div>";
            cadena += "<div class='clear'></div>";
            cadena += "</div>";
            cadena += "<div class='btnsExtraResumen'>";
			cadena += "<a href='#' class='btn btn-large btn-primary' id='btnVerCorreccion'>"+txtVerCorregir+"</a>";    
			if(ocultar_reiniciar != '1') {
				cadena += "<a href='#' class='btn' id='btnReiniciar'>"+txtVolverJugar+"</a>";    
			}
                
            $("#correccion").html(cadena);
            
			$("#btnVerCorreccion").click(function(e){e.preventDefault();verCorreccion();});
			if(ocultar_reiniciar != '1') {
				$("#btnReiniciar").click(function(e){
					e.preventDefault();
					try{
						parent.recargaActividad();
					}catch(error){
					}
					location.reload();
				});
			}
        }
        else
        {
            $("#resumen").addClass("valoracionActiva");
            var indicaFin = 0;
            var mensaje = "<ul class='respuestaRangos'>";
            for(i=0;i<aMargenes.length;i++)
            {
                if((correctas >= aMargenes[i]['ini'])&&(correctas <= aMargenes[i]['fin'])) { mensaje += "<li class='valoracionActiva'><span class='numMsgFinal numMsgFinalActiva'>"+aMargenes[i]['ini']+"</span><ul><li>"+aMargenes[i]['mensaje']+"</li></ul></li>"; indicaFin = 1; }
                else if(indicaFin == 1) { mensaje += "<li><span class='numMsgFinal numMsgFinalActiva'>"+aMargenes[i]['ini']+"</span><ul><li>"+aMargenes[i]['mensaje']+"</li></ul></li>"; indicaFin = 0; }
                else mensaje += "<li><span class='numMsgFinal'>"+aMargenes[i]['ini']+"</span><ul><li>"+aMargenes[i]['mensaje']+"</li></ul></li>";
                
                if(i == aMargenes.length - 1)
                {
                    if(indicaFin == 1) { mensaje += "<li><span class='numMsgFinal numMsgFinalActiva'>"+aMargenes[i]['fin']+"</span></li>"; indicaFin = 0; }
                    else mensaje += "<li><span class='numMsgFinal'>"+aMargenes[i]['fin']+"</span></li>";
                }
            }
            
            mensaje += "</ul>";
            
			var headTxt = "<div class='tituloMensaje'>";
            if($(document).data("idioma") == "en") headTxt += "Activity completed";
            else if($(document).data("idioma") == "fr") headTxt += "Activité terminée";
            else headTxt += "Has completado la actividad";
            headTxt += "</div>";
            headTxt += "<div class='tituloActividad'>";
            headTxt += enunciado;
            headTxt += "</div>";
			
            var cadena = "<div class='grafCorrecionAct'>";
			cadena += mensaje;
			if(ocultar_reiniciar != '1') {
				cadena += "<a href='#' class='btn btn-large' id='btnReiniciar'>"+txtVolverJugar+"</a>";
			}
            cadena +="</div>";
            $("#correccion").html(cadena).addClass('resultadosTest');
			$(headTxt).insertBefore($("#correccion"));
			if(ocultar_reiniciar != '1') {
				$("#btnReiniciar").click(function(e){
					e.preventDefault();
					try{
						parent.recargaActividad();
					}catch(error){
					}
					location.reload();
				});
			}
        }  
            	
	}

//Generamos la corrección para cada pregunta

	function verCorreccion()
	{
		correccionActivada = 1;
		
		$('#resumen').hide();
		$('#contentAct').show();
		
		$("input").attr("disabled","true");
		$("textarea").attr("disabled","true");
		
		$(".respuesta").removeClass("activa");
			
		for(i=0;i<numPreguntas;i++)
		{
			aPreguntas[i]["obligatoria"] = "no";
			
			if(i<10) var ix = "00"+i;
            else if(i<100) var ix = "0"+i;
			else var ix = i;
			
			if(aPreguntas[i]["tipo"] == "unica")
			{
				for(m=0;m<aRespuestas[i].length;m++)
				{	
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					if($("#resp"+ix+"_"+mx+":checked").val() == "on")
					{	
						if(aRespuestas[i][m]["correcta"] == 1)
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeOk'></span>");
							$("#respC"+ix+"_"+mx).addClass("optionOk");
						}
						else
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeError'></span>");
						}
					}
					else
					{
						if(aRespuestas[i][m]["correcta"] == 1)
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeRadioOk'></span>");
						}
						else
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeRadioClear'></span>");
						}
					}
					
					var contenidoLabel = $("#respL"+ix+"_"+mx).html();
					var divLabel = $("<div>",
					{
						id: "respL"+ix+"_"+mx,
						"class": "labelFull"
					});
					$(divLabel).html(contenidoLabel);
					$("#respL"+ix+"_"+mx).replaceWith(divLabel);
				}
				
				if(correccion[i] == "OK") $("#pregunta"+ix).prepend("<div class='alertTop correcta'>"+txtRespuestaCorrecta+"</div>");
				else $("#pregunta"+ix).prepend("<div class='alertTop incorrecta'>"+txtRespuestaIncorrecta+"</div>");
			}
			
			if(aPreguntas[i]["tipo"] == "multiple")
			{	
				for(m=0;m<aRespuestas[i].length;m++)
				{	
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
					
					if($("#resp"+ix+"_"+mx).is(':checked'))
					{
						if(aRespuestas[i][m]["correcta"] == 1)
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeOk'></span>");
							$("#respC"+ix+"_"+mx).addClass("optionOk");
						}
						else
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeError'></span>");
						}
					}
					else
					{
						if(aRespuestas[i][m]["correcta"] == 1)
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeCheckboxOk'></span>");
						}
						else
						{
							$("#resp"+ix+"_"+mx).replaceWith("<span class='elemenForm typeCheckboxClear'></span>");
						}
					}
					
					var contenidoLabel = $("#respL"+ix+"_"+mx).html();
					var divLabel = $("<div>",
					{
						id: "respL"+ix+"_"+mx,
						"class": "labelFull"
					});
					$(divLabel).html(contenidoLabel);
					$("#respL"+ix+"_"+mx).replaceWith(divLabel);
				}
				
				if(correccion[i] == "OK") $("#pregunta"+ix).prepend("<div class='alertTop correcta'>"+txtRespuestaCorrecta+"</div>");
				else $("#pregunta"+ix).prepend("<div class='alertTop incorrecta'>"+txtRespuestaIncorrecta+"</div>");
			}
			
			if(aPreguntas[i]["tipo"].substring(0,7) == "escrita")
			{
				var cadenaPosibles = "<div class='posiblesRespuestas'>";
				cadenaPosibles += "<div class='titPosiblesRespuestas'>"+txtPosiblesRespuestas+"</div>";
				cadenaPosibles += "<div class='contentRespuestas'>";
				cadenaPosibles += "<ol>";
							
				for(m=0;m<aRespuestas[i].length;m++)
				{
					if(m<10) var mx = "00"+m;
                    else if(m<100) var mx = "0"+m;
					else var mx = m;
				
					cadenaPosibles += "<li>"+aRespuestas[i][m]["respuesta"]+"</li>";
				}	
				
				cadenaPosibles += "</ol>";
				cadenaPosibles += "</div></div>";
				
				$("#pregunta"+ix).append(cadenaPosibles);
				
				if(correccion[i] == "OK")
				{
					$("#resp"+ix+"_00").addClass("inputOk");
				}
				else
				{
					$("#resp"+ix+"_00").addClass("inputError");
				}
				
				if(correccion[i] == "OK") $("#pregunta"+ix).prepend("<div class='alertTop correcta'>"+txtRespuestaCorrecta+"</div>");
				else $("#pregunta"+ix).prepend("<div class='alertTop incorrecta'>"+txtRespuestaIncorrecta+"</div>");
			}
			
			//Creamos los elementos para la información adicional
            if(globalFeedback == 1) 
            {
                if(aPreguntas[i]["feedback"] != "")
                {
    			     var cadenaAdicional = "<div id='divInfoAdicional_"+ix+"' class='contentInfoAdicional'>";
                     cadenaAdicional += "<div class='iconInfoAdicional'>";
    		         cadenaAdicional += "<div class='titInfoAdicional'>"+txtInfoAdicional+"</div>";
            	     cadenaAdicional += "<div class='txtInfoAdicional' id='textoAdicional_"+ix+"'>"+aPreguntas[i]["feedback"]+"</div>";
        		     cadenaAdicional += "</div>";
    			     cadenaAdicional += "</div>";
    			     cadenaAdicional += "</div>";
    			
                     $("#pregunta"+ix).append(cadenaAdicional); 			     
                 }
            }
		}
		
		numBtn = 0;
		cadenaBtn = "000";
		
		$("#indica").html((numBtn+1)+"/"+numPreguntas);
		$("#avance").css("width",(numBtn+1)*100/numPreguntas+"%");
		$("#numTest"+cadenaBtn).html((numBtn+1)+".");
		
		$(".preguntas").hide();
		$("#pregunta"+cadenaBtn).show();
		setTimeout(function(){if($("#pistaAudio"+cadenaBtn).length != 0) $('#btnAudio'+cadenaBtn).click();},500);
		
		$("#btnAtras").unbind("click").click(function(e){e.preventDefault();cambiarPregunta("AT");});
		$("#btnAdelante").unbind("click").click(function(e){e.preventDefault();cambiarPregunta("AD");});
		$("#btnAtras").addClass("disable");
		$("#btnAdelante").removeClass("disable").addClass("btn-primary");
	}

	function getDatosRespuestas(s) {
		var datos = {};
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = [];
		for(posicion=0;posicion<numPreguntas;posicion++) {
			datos['r'][posicion] = {};
			if (correccion[posicion] == 'OK') {
				datos['r'][posicion]['s'] = 1;
			} else {
				datos['r'][posicion]['s'] = 0;
			}
			datos['r'][posicion]['i'] = aPreguntas[posicion]['id'];
			
			if(posicion<10) var kx = "00"+posicion;
            else if(posicion<100) var kx = "0"+posicion;
			else var kx = posicion;
			switch (aPreguntas[posicion]['tipo']) {
			case 'unica':
			case 'multiple':
				datos['r'][posicion]['a'] = '';
				for(m=0;m<aRespuestas[posicion].length;m++) {
					if (m<10) var mx = "00"+m;
					else if(m<100) var mx = "0"+m;
					else var mx = m;
					if($("#resp"+kx+"_"+mx+":checked").val() == "on") {
						if (datos['r'][posicion]['a'] != '') {
							datos['r'][posicion]['a'] += ' - ';
						}
						datos['r'][posicion]['a'] += $("#respC"+kx+"_"+mx)[0].innerHTML;
					}
				}
				break;
			case 'escrita':
			case 'escrita amplia':
				datos['r'][posicion]['a'] = $("#resp"+kx+"_00").val();
				break;
			}
		}
		return datos;
	}

	function actualizaPuntosFinal(tipoAlerta) {

	}