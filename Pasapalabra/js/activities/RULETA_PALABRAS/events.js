//==============================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio de Ruleta de Palabras)
//==============================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion
var elementoActivo = 0;
var totalActivos=0;
var timeoutCanvas = 0;
var puntosReg = 0;
var numRespondidas = 0;
ACT_SUMARINTENTOSFINAL = 0;

    function comenzar()
    {	
    	puntosReg = puntos;
    	$("#numPuntos").html(puntosReg);
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
        elementosFinal=Array();
        for(i=0;i<elementos.length;i++){
            if(elementos[i]["Definicion"]!="" || elementos[i]["Definicion"]=="undefined"){
                elementosFinal[elementos[i]["Letra"]]=elementos[i]["Palabra"];
            }
        }
        activaElemento(elementoActivo);
        
        totalActivos=totalElementosActivos();
		//Lanzamos el contador de tiempo
		idInterval = setInterval(contador,1000);
		
		document.onkeypress=function(e){
			var esIE=(document.all);
			var esNS=(document.layers);
			tecla=(esIE) ? event.keyCode : e.which;
			if(tecla==13){
				comprobarPalabra();
				if (esIE) {
					event.keyCode = 0;
				}
			 }
		}
		inicializarPos();
   	}
    
//Contamos las letras activas que hay para saber cuanto restar por cada error
    function totalElementosActivos(){
        total=0;
        for(i=0;i<elementos.length;i++){
            if(elementos[i]["Activa"]==1){
                total++;
            }
        }
        return total;
    }


//Redimensionamos la aplicacion al cambiar de tamaño la pantalla

	function redimensionar()
	{	
		//Reinicializamos la descripción Inicial de Usuario
		cargarDescripcionInicio();
	}

//Gestionamos el elemento activo

    function activaElemento(elem)
    {		if(reproduciendo) {
    			reiniciarReproductor('audio_0');
    		}
    		if (!finalizado) {
	        $("#answer").focus().val("");
	        var contControl = 0;
	        while(($("#circle"+elem).hasClass('LetterOK') || $("#circle"+elem).hasClass('LetterError') || $("#circle"+elem).hasClass('turnOff')) && (contControl < 29)){
	            contControl++;
	            elem++;
	            if(elem == 29) elem = 0;
	        }
	        if(contControl!=29){
	            elementoActivo = elem;
	            $("#letterSelectI").html(elementos[elem]['Letra']);
	            $(".circle").removeClass('current');
	            $("#circle"+elem).addClass('current');
	            var opcion = txtContiene;
	            if(elementos[elem]['Opcion'] == 'emp') opcion = txtEmpieza;
	            $("#letterBeginI").html(opcion+elementos[elem]['Letra']);
	            switch(elementos[elem]['Deftipo']){
	            case 'IMAGEN':
								var errorImagen = 0;
					
									var rutaPista = rutaRecursos+elementos[elem]['Definicion'];
					
									$("#pistaSonidoPrincipal").hide();
									$("#questionTxtI").show();
									$('#questionTxtI').html("<img src='img/loader.gif'>");
									var img = new Image();
									img.src = rutaPista;
									img.id = 'imagenPista';
									img.onload = function() {errorImagen=1;$("#questionTxtI").html('');$("#questionTxtI").append(img);}
									setTimeout(function(){if(errorImagen == 0)errores(0,-1);},5000);
	                //$("#questionTxtI").html(rutaPista);
								break;
							case 'AUDIO':
								var rutaPista = rutaRecursos+elementos[elem]['Definicion'];
								var rutaPistaOgg = rutaRecursosInicio+elementos[elem]['Definicion'];
								clearTimeout(timeoutCanvas);
								$(".timeSound").show();
								$("#pistaSonidoPrincipal").show();
								$("#questionTxtI").text("");
								$("#questionTxtI").hide();
								var cadena = "<audio id='audio_0'><source src='"+rutaPista+"' type='audio/mpeg'></source><source src='"+rutaPista.substring(0,rutaPista.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaPistaOgg.substring(0,rutaPistaOgg.length-3)+"ogg' onError='errores(1,-1);' type='audio/ogg'></source></audio>";
								cadena += "<div class='groupPlayer' id='contenedorPlayer_0'>";
								cadena += "<div id='iconoAudio_0' class='iPlayer pPlay'></div>";
								cadena += "<div class='playerEduca'></div>";
								cadena += "<canvas id='reproductor_0' class='canvasPlayer' width='131' height='131'></canvas>";
								cadena += "<div class='bgPlayer'></div>";
								cadena += "</div>";
								$("#imageSound").html(cadena);
								$('#contenedorPlayer_0').click(function(){reproducirClick("audio_0");});
								controlDuracion("audio_0");
								break;
							default:
								$("#pistaSonidoPrincipal").hide();
								$("#questionTxtI").show();
	              $("#questionTxtI").html(elementos[elem]['Definicion']);
	            }
	            //restarIntento();
	        }else{
	            $("#letterBeginI").hide();
	            $("#questionTxtI").hide();
	            $("#answerBoxI").hide();
                for (var key in palabrasCorrectas) {
  					preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
                for (var key in palabrasErroneas) {
                    preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
              
				cargarPantallaFinal('OK',getDatosRespuestas(1));
                
	        }
	      }
	}
	
	function getDatosRespuestas(s) {
		var datos = {};
		var posicion = 0;
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = [];
		Object.keys(palabrasErroneas).forEach(function(key) {
			datos['r'][posicion] = {};
			datos['r'][posicion]['s'] = 0;
			datos['r'][posicion]['i'] = key;
			datos['r'][posicion]['a'] = palabrasErroneas[key];
			posicion++;
		})
		Object.keys(palabrasCorrectas).forEach(function(key) {
			datos['r'][posicion] = {};
			datos['r'][posicion]['s'] = 1;
			datos['r'][posicion]['i'] = key;
			datos['r'][posicion]['a'] = palabrasCorrectas[key];
			posicion++;
		})
		datos['r'].sort(getDatosRespuestasSort);
		return datos;
	}

	function getDatosRespuestasSort(a, b) {
		if (a['i'] < b['i']) {
		  return -1;
		}
		if (a['i'] > b['i']) {
		  return 1;
		}
		return 0;
	}
   
//Cargamos la duración de la pista en el indicador 
	function controlDuracion(media) {
		var numElemento = parseInt(media.substring(6,8),10);
		var audio = document.getElementById(media);
		if(!isNaN(audio.duration))
		{
			controlDuracion2(media);
			reproducir(media);
		}
		else
		{
			setTimeout(function(){controlDuracion(media);},50);
		}
	}
	
	var audiosControlados = [];
	
	function controlDuracion2(media) {
		audiosControlados[media] = true;
		var numElemento = parseInt(media.substring(6,8),10);
		duracion = document.getElementById(media).duration;
		var seg= duracion;
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
			pos[numElemento] = -Math.PI/2;
			posS[numElemento] = pos[numElemento] + salto;
			$('#iconoAudio_'+numElemento).removeClass('pPause');
			$('#iconoAudio_'+numElemento).addClass('pPlay');
			var miLienzo = document.getElementById('reproductor_'+numElemento);
			var lienzo = miLienzo.getContext('2d');
			lienzo.clearRect(0,0,240,240);
			clearTimeout(timeoutCanvas);
			document.getElementById('tiempo_'+numElemento).innerHTML = "00:00";
			try{audio.currentTime = 0;}catch(e){}
			audio.pause();
			reproduciendo = false;
			if(audio.currentTime != 0) document.getElementById(media).load();
		}
	}
	
	function reiniciarReproductor(media) {
		var numElemento = parseInt(media.substring(6,8),10);
		var audio = document.getElementById(media);
		pos[numElemento] = -Math.PI/2;
		posS[numElemento] = pos[numElemento] + salto;
		$('#iconoAudio_'+numElemento).removeClass('pPause');
		$('#iconoAudio_'+numElemento).addClass('pPlay');
		var miLienzo = document.getElementById('reproductor_'+numElemento);
		var lienzo = miLienzo.getContext('2d');
		lienzo.clearRect(0,0,240,240);
		clearTimeout(timeoutCanvas);
		document.getElementById('tiempo_'+numElemento).innerHTML = "00:00";
		try{audio.currentTime = 0;}catch(e){}
		audio.pause();
		reproduciendo = false;
	}
	
//Vamos dibujando mediante canvas el circulo que va marcando el tiempo transcurrido de la pista
//Estas variables controlan los angulos que necesitamos para ir dibujando el círculo mediante canvas
var salto = 2*Math.PI/100;
var pos = [];
var posS = [];

function inicializarPos() {
	pos[0] = -Math.PI/2;
	posS[0] = pos[0] + salto;
	for(i=0;i<elementos.length;i++){ 
		if (elementos[i]["Activa"]==1) {
			switch (elementos[i]["Deftipo"]) {
			case 'AUDIO':
				pos[i+1] = -Math.PI/2;
				posS[i+1] = pos[i+1] + salto;				
				break;
			}
		}
	}
}

function actualizarReproductor(numElemento)
{
	var audio = document.getElementById("audio_"+numElemento);
	duracion = audio.duration;
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
	lienzo.arc(65,65,60,pos[numElemento],posS[numElemento],false);
	lienzo.stroke();
	
	pos[numElemento] = posS[numElemento];
	posS[numElemento] = posS[numElemento] + salto;
	if(posS[numElemento] <= 3*Math.PI/2)
	{
		timeoutCanvas = setTimeout(function(){actualizarReproductor(numElemento)},tiempoSalto);
	}
	else
	{
		pos[numElemento] = -Math.PI/2;
		posS[numElemento] = pos[numElemento] + salto;
	}
}

//Controlamos el audio y sus parámetros de tiempo transcurrido y duración de la pista
//Reproducimos el elemento de audio que le indicamos
	
	var reproduciendo = false;
	
	function reproducir(media)
	{
		var numElemento = parseInt(media.substring(6,8),10);
		document.getElementById(media).play();
		reproduciendo = true;
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
			reproduciendo = true;
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
			reproduciendo = false;
			clearTimeout(timeoutCanvas);
		}
	}

//Comprobamos la palabra seleccionada
palabrasCorrectas = [];
palabrasErroneas = [];

    function comprobarPalabra()
    {	if (!finalizado) {
        if($("#answer").val().length){
					cont=$("#answer").val();
					contOriginal=cont;
					resp=elementos[elementoActivo]['Palabra'];
					//pasamos todo a mayusculas y quitamos los acentos
					if (sensible_mayusculas == "no") {
						cont = cont.toUpperCase();
						resp = resp.toUpperCase();
					}
					if (sensible_acentos == "no") {
						cont = borraAcentos(cont);
						resp = borraAcentos(resp);
					}
          arrayResp=resp.split(",");
          var correcta=0;
          for(i=0;i<arrayResp.length;i++){
               if(cont==arrayResp[i]){
                  correcta=1;
               }  
          }
          if(correcta){
							palabrasCorrectas[elementos[elementoActivo]["Letra"]]=contOriginal;
              $("#circle"+elementoActivo).addClass('LetterOK');
          }else{
							palabrasErroneas[elementos[elementoActivo]["Letra"]]=contOriginal;
							actualizaPuntos();
              actualizarIntentos();
              $("#circle"+elementoActivo).addClass('LetterError');
		  }
		  numRespondidas++;
          var sig = parseInt(elementoActivo)+1;
          if(sig == 29) sig = 0;
          activaElemento(sig);
        }
      }
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
	
//Comprobamos si hemos terminado el juego

    function compruebaFinal()
    {
        if(mostradosA.length == $(".correctaEl").length){
            for (var key in palabrasCorrectas) {
                    preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
            for (var key in palabrasErroneas) {
                    preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
			
            cargarPantallaFinal('OK',getDatosRespuestas(1));
            
        }
    }
	
//Actualizamos los intentos
	
	function actualizarIntentos()
	{
		var cadenaIntentos = $('#numIntentos').text();
		var mpos = cadenaIntentos.indexOf("/");
		var numeroIntentos = parseInt(cadenaIntentos.substring(0,mpos+1));
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
			$(".elementos").unbind("click");
            for (var key in palabrasCorrectas) {
                    preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
            for (var key in palabrasErroneas) {
                    preg=""
                	for (j=0;j<elementos.length;j++){
                		if(elementos[j]['Letra']==key){
                			preg=key+": "+elementos[j]['Definicion'];
                		}
					}
                }
			
			cargarPantallaFinal('intentos',getDatosRespuestas(0));
			puntosReg = 0;
			$("#numPuntos").html("0");
		}
	}
	
//Actualizar puntos en funcion de los intentos

	function actualizaPuntos()
	{
		puntosPregunta=puntos/numero_intentos;
        puntosReg=parseInt(puntosReg-puntosPregunta);
        if(puntosReg<=0){
            puntosReg=0;
        }
		$("#numPuntos").html(puntosReg);
	}

	function actualizaPuntosFinal(tipoAlerta) {
		if (tipoAlerta == "tiempo") {
			var restantes = totalActivos - numRespondidas;
			var puntosRestar = parseInt(100 / totalActivos);
			puntosReg -= restantes * puntosRestar;
			if (puntosReg <= 0) {
				puntosReg = 0;
			}
		}
	}

//Completamos la pantalla final con la corrección de la palabra

	function completarPantallaFinal() {	
		for(i=0;i<elementos.length;i++){ 
			if (elementos[i]["Activa"]==1) {
				var mcorrecto;
				var mpalabraerronea;
				var clase;
				if (palabrasCorrectas[elementos[i]["Letra"]] == undefined) {
					mcorrecto = false;
					clase = ' respuestaIncorrecta';
					if (palabrasErroneas[elementos[i]["Letra"]] == undefined) {
						mpalabraerronea = '';
					} else {
						mpalabraerronea = palabrasErroneas[elementos[i]["Letra"]];
					}
				} else {
					mcorrecto = true;
					clase = '';
				}
				var cadenaHTML = "";
				cadenaHTML += "<li>";
				cadenaHTML += "<div class='accordionButton' id='accordion_"+i+"'>";
				cadenaHTML += "<div class='contentRespuesta"+clase+"' id='contentRespuesta_"+i+"'>";
				cadenaHTML += "<span class='numRespuesta' id='numRespuesta_"+i+"'>"+elementos[i]["Letra"]+"</span>";
				cadenaHTML += "<span class='txtRespuesta'>";
				if ((!mcorrecto) && (mpalabraerronea != '')) {
					cadenaHTML += "<span class='tachado' id='pEscrita_"+i+"'>"+mpalabraerronea+"</span>";
				}
				cadenaHTML += "<span id='pCorrecta_"+i+"'>"+elementos[i]["Palabra"]+"</span></span>";
				cadenaHTML += "</div>";
				cadenaHTML += "</div>";
				cadenaHTML += "<div class='accordionContent'>";
				cadenaHTML += "<div class='contentInfoRespuesta'>";
				cadenaHTML += "<div class='contentPista'>";
				switch (elementos[i]["Deftipo"]) {
				case 'TEXTO':
					cadenaHTML += "<div class='pistaTexto'><span id='pista_"+i+"'>"+elementos[i]["Definicion"]+"</span></div>";
					break;
				case 'IMAGEN':
					cadenaHTML += "<div class='pistaImagen' id='pistaImagenFinal_"+i+"'>";
					cadenaHTML += "<img src='"+rutaRecursos+elementos[i]['Definicion']+"'>";
        	cadenaHTML += "</div>";
					break;
				case 'AUDIO':
					var num = i+1;
					var rutaPista = rutaRecursos+elementos[i]['Definicion'];
					var rutaPistaOgg = rutaRecursosInicio+elementos[i]['Definicion'];
					cadenaHTML += "<div class='pistaSonido'>";
					cadenaHTML += "<div class='imageSound' id='imageSound_"+num+"'>";
					cadenaHTML += "<audio id='audio_"+num+"'><source src='"+rutaPista+"' type='audio/mpeg'></source><source src='"+rutaPista.substring(0,rutaPista.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaPistaOgg.substring(0,rutaPistaOgg.length-3)+"ogg' onError='errores(1,-1);' type='audio/ogg'></source></audio>";
					cadenaHTML += "<div class='groupPlayer' id='contenedorPlayer_"+num+"'>";
					cadenaHTML += "<div id='iconoAudio_"+num+"' class='iPlayer pPlay'></div>";
					cadenaHTML += "<div class='playerEduca'></div>";
					cadenaHTML += "<canvas id='reproductor_"+num+"' class='canvasPlayer' width='131' height='131'></canvas>";
					cadenaHTML += "<div class='bgPlayer'></div>";
					cadenaHTML += "</div>";
					cadenaHTML += "</div>";
					cadenaHTML += "<div class='timeSound'><span id='tiempo_"+num+"' class='infoTime'>00:00</span> | <span id='duracion_"+num+"' class='infoTime'>00:00</span></div>";
					cadenaHTML += "</div>";
					break;
				}
				cadenaHTML += "</div>";
				cadenaHTML += "</div>";				  
		    cadenaHTML += "</div>";  				
		    cadenaHTML += "</li>";
		    $("#listaFinal").html($("#listaFinal").html()+cadenaHTML);
			}
		}
		for(i=0;i<elementos.length;i++){ 
			if (elementos[i]["Activa"]==1) {
				switch (elementos[i]["Deftipo"]) {
				case 'AUDIO':
					var num = i+1;
					$('#contenedorPlayer_'+num).click(function(parametro){
						var ID = this.id;
						var parcial = ID.split('_');
						reproducirClick("audio_"+parcial[1]);
					});
					break;
				}
			}
		}
		$('.accordionButton').click(function() {
			$('.accordionButton').removeClass('on');
	 		$('.accordionContent').slideUp('slow');
			if($(this).next().is(':hidden') == true) {
				$(this).addClass('on');
				$(this).next().slideDown('slow');
				var ID = this.id;
				var parcial = ID.split('_');
				var mID = parseInt(parcial[1]);
				mID++;
				switch (elementos[mID-1]["Deftipo"]) {
				case 'AUDIO':
					if (typeof(audiosControlados["audio_"+mID]) == 'undefined') {
						controlDuracion2("audio_"+mID);
					}
					break;
				}
				pararAudio();
		 	}
		 	else
		 	{
		 		pararAudio();
		 	}
	 	});
		$('.accordionContent').hide();
	}
	
	function pararAudio() {
		for(i=0;i<elementos.length;i++){ 
			if (elementos[i]["Activa"]==1) {
				switch (elementos[i]["Deftipo"]) {
				case 'AUDIO':
					reiniciarReproductor("audio_"+(i+1));
					break;
				}
			}
		}
		inicializarPos();
	}