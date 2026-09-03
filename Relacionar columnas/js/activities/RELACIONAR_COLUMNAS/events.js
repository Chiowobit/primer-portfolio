//============================================================================================================================
//Funciones que vamos a utilizar cuando el usuario comienza a interactuar con esta aplicacion (Propio de Relacionar Columnas)
//============================================================================================================================

//Oculta la parte de presentación de instrucciones y accede a la aplicacion

var respuestasSecuencia = [];

    function comenzar()
    {	
     	$('#contentPreActividad').hide();
     	$('#contentAct').css('top',0);
		
		//Lanzamos el contador de tiempo
		idInterval = setInterval(contador,1000);
   	}
   	
//Redimensionamos la aplicacion al cambiar de tamaño la pantalla

	function redimensionar()
	{	
		//Reinicializamos la descripción Inicial de Usuario
		cargarDescripcionInicio();
        dibujaTodos();
	}

//Gestionamos los elementos seleccionados

    function gestionEleccion()
	{
	   var tipo = $(this).attr('id').substring(8,9);
	   if($(this).hasClass('btn-active')){
	       $("#contentElementos"+tipo+" .btn").removeClass('btn-active').removeClass('select'+tipo);
	   }else{
	       $("#contentElementos"+tipo+" .btn").removeClass('btn-active').removeClass('select'+tipo);
	       $(this).addClass('btn-active').addClass('select'+tipo);
	   }
	   
	   var numSel = $(".btn-active").length;
       if(numSel == 2) compruebaPareja(); 
	}

//Dibujamos la línea correspondiente y coloreamos el botón
var arrayDibujados = new Array();
    
    function dibuja()
    {
        var arrayDibuja = new Array($('.btn-active:first').attr('id'),$('.btn-active:last').attr('id'));
        arrayDibujados.push(arrayDibuja);
        
        var pInicio = $('.btn-active:first').position().top + $('.btn-active:first .bull-active').position().top + 2;
        var pFin = $('.btn-active:last').position().top + $('.btn-active:last .bull-active').position().top + 2;

        $('.btn-active').addClass('btn-solution').addClass('btn-active-color').removeClass('btn-active');
        
        linea(pInicio, pFin, '#6ba118');
    }
    
    function linea(inicio, fin, color)
    {
        var c=document.getElementById("canvas");
        var ctx=c.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(16,inicio);
        ctx.lineTo(anchuraCanvas-16,fin);
        ctx.strokeStyle = color;
        ctx.stroke();       
    }
    
    function dibujaTodos()
    {
        setTimeout(function(){
            $("#contentElementosMedio").html("").append("<canvas id='canvas' width='"+$("#contentElementosMedio").width()+"' height='"+Math.max($(".col-left").height(),$(".col-right").height())+"'></canvas>");
            anchuraCanvas = $("#contentElementosMedio").width();
            var c=document.getElementById("canvas");
            var ctx=c.getContext("2d");
            for(i=0;i<arrayDibujados.length;i++){
                var pInicio = $('#'+arrayDibujados[i][0]).position().top + $('#'+arrayDibujados[i][0]+" .bull-active").position().top + 2;
                var pFin = $('#'+arrayDibujados[i][1]).position().top + $('#'+arrayDibujados[i][1]+" .bull-active").position().top + 2;
                linea(pInicio, pFin, '#6ba118');
            }
        },100);
    }
    
//Comprobamos la pareja seleccionada
var parejasCorrectas = [];

    function compruebaPareja()
    {
        var idA = $(".selectA").attr("id");
        var idB = $(".selectB").attr("id");
        posA = idA.substring(9, idA.length);
        posB = idB.substring(9, idB.length);
        var respuestaDada = {};
		respuestaDada['a'] = grupos[mostradosA[posA]]['elementoA_Valor'] + ' - ' + grupos[mostradosB[posB]]['elementoB_Valor'];
		respuestaDada['i'] = mostradosA[posA];
        if (mostradosA[posA] == mostradosB[posB]) {
            respuestaDada['s'] = 1;
            respuestasSecuencia.push(respuestaDada);
            parejasCorrectas[parejasCorrectas.length]=mostradosA[posA];
            $(".selectA,.selectB").addClass('correctaEl');
            $(".selectA").unbind("click").removeClass('selectA');
            $(".selectB").unbind("click").removeClass('selectB');
            dibuja();
            compruebaFinal();
        }
        else{
            respuestaDada['s'] = 0;
            respuestasSecuencia.push(respuestaDada);
            actualizarIntentos();
            actualizaPuntos();
            $(".selectA,.selectB").addClass("btnError").removeClass('btn-active');
            $('#contentElementos .btn').unbind("click");
            setTimeout(function(){ 
                $(".selectA,.selectB").removeClass("btnError");
                $(".selectA").removeClass('selectA');
                $(".selectB").removeClass('selectB');
                $('#contentElementos .btn').bind("click",gestionEleccion);
                $(".correctaEl").unbind('click'); 
            },500);
        }
    }
    
//Comprobamos si hemos terminado el juego

    function compruebaFinal()
    {
        if(mostradosA.length == $(".correctaEl").length / 2){
            cargarPantallaFinal('OK',getDatosRespuestas(1));
        }
    }
	
//Actualizamos los intentos
	
	function actualizarIntentos()
	{
		var cadenaIntentos = $('#numIntentos').text();
		var pos = cadenaIntentos.indexOf("/");
		var numeroIntentos = parseInt(cadenaIntentos.substring(0,pos+1));
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
            puntosReg = 0;
            cargarPantallaFinal('intentos',getDatosRespuestas(0));
			$("#numPuntos").html("0");
		}
	}
	
//Actualizar puntos en funcion de los intentos
var puntosReg = 100;

	function actualizaPuntos()
	{
		var actuales = parseInt(puntosReg);
		var descuento = parseInt(puntosReg/numero_intentos);
		var cantidadActual =  actuales - descuento;
		if(cantidadActual < 0) cantidadActual = 0;
		puntosReg = parseInt(cantidadActual);
		$("#numPuntos").html(parseInt(cantidadActual));
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
	
	function gestionReproducir(media,icono,tipo)
	{
	    if(tipo==1) $(".elementos").unbind("click");
		if($("#"+icono).hasClass("iPlay"))
		{
            if(tipo==1) pararTodosAudios();
            else pararTodosAudiosFinal();
            $(".btn-sound[data-idaudio='"+media.substring(11,media.length)+"']").addClass('sound-active');
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
        if(tipo==1) setTimeout(function(){ $(".elementos").bind("click",gestionEleccion); },200); 
	}

//Paramos todos los audios activos
   
    function pararTodosAudios()
    {
        $('.btn-sound').removeClass('sound-active');
        for(m=0;m<numAudiosA;m++){
            if($("#iconoAudio_A"+m).hasClass("iPause")){
                $("#iconoAudio_A"+m).addClass("iPlay");
    			$("#iconoAudio_A"+m).removeClass("iPause");
    			document.getElementById("pistaAudio_A"+m).pause();
            }
         }
         for(m=0;m<numAudiosB;m++){
            if($("#iconoAudio_B"+m).hasClass("iPause")){
                $("#iconoAudio_B"+m).addClass("iPlay");
    			$("#iconoAudio_B"+m).removeClass("iPause");
    			document.getElementById("pistaAudio_B"+m).pause();
            }
         }
    }
    
    function pararTodosAudiosFinal()
    {
        $('.btn-sound').removeClass('sound-active');
        for(m=0;m<numAudiosA;m++){
            if($("#iconoAudio_AF"+m).hasClass("iPause")){
                $("#iconoAudio_AF"+m).addClass("iPlay");
    			$("#iconoAudio_AF"+m).removeClass("iPause");
    			document.getElementById("pistaAudio_AF"+m).pause();
            }
         }
         for(m=0;m<numAudiosB;m++){
            if($("#iconoAudio_BF"+m).hasClass("iPause")){
                $("#iconoAudio_BF"+m).addClass("iPlay");
    			$("#iconoAudio_BF"+m).removeClass("iPause");
    			document.getElementById("pistaAudio_BF"+m).pause();
            }
         }
    }

//Coontrolamos y gestionamos cuando termina de reproducirse la pista de audio
	
	function controlFinalAudio(media,icono)
	{
		if(document.getElementById(media).ended)
		{
			$("#"+icono).addClass("iPlay");
			$("#"+icono).removeClass("iPause");
            $(".sound-active").toggleClass('sound-active');
            $('#contentElementos .btn').bind("click",gestionEleccion);
			clearInterval(compruebaFin);
		}
	}
	
//Funcion que controla el tipo de error cuando no disponemos del audio			
	
	function errores(n,tipo,col)
	{
	    var colN = 'A';
	    if(col==2) colN = 'B';  
		if(tipo == 0) $(".btn-sound[data-idaudio='"+colN+n+"']").removeClass('sound-active').addClass('sound-error').unbind('click');
        if(tipo == 1) $(".btn-sound[data-idaudio='"+colN+"F"+n+"']").removeClass('sound-active').addClass('sound-error').unbind('click');
	}

//Completamos la pantalla final con la corrección de la palabra

	function completarPantallaFinal()
	{	
	    pararTodosAudios();
        var divContentElementosFinal = $("<div>",
		{
			id: "contentElementosFinal"
		});
        $("#correccion").append(divContentElementosFinal);
        $(".groupInfoRespuestas").prepend($("#correccion"));
        
        for(k=0;k<grupos.length;k++){
            var divCajaPareja = $("<div>",
			{
				id: "cajaPareja"+k,
				"class": "cajaPareja"
			});
			$('#contentElementosFinal').append(divCajaPareja);
            
            var divArrow = $("<div>",
			{
				id: "arrowCardF"+k,
				"class": "arrowCard"
			});
			$('#cajaPareja'+k).prepend(divArrow);
        }
        
        var countAudio = 0;
		for(i=0;i<grupos.length;i++){    
			var divElementoAFinal = $("<div>",
			{
				id: "elementoAFinal"+i,
				"class": "cardContainerCorreccion"
			});
            $("#contentElementosFinal").append(divElementoAFinal);
            
            if(grupos[i]["elementoA_Tipo"] == "TEXTO"){
                $("#elementoAFinal"+i).html("<div class='cardTxt'><div class='scrollbox'>"+grupos[i]["elementoA_Valor"]+"</div></div>");
            }
            else if(grupos[i]["elementoA_Tipo"] == "IMAGEN"){
                var src = rutaRecursos+grupos[i]["elementoA_Valor"];
                $("#elementoAFinal"+i).html("<div class='cardImage'><img src='"+src+"'></div>");
            }
            else if(grupos[i]["elementoA_Tipo"] == "AUDIO"){
                var cadenaAudio = "<div class='pistaAudio' id='pAudio_AF"+countAudio+"' style='display:none'>";
    			cadenaAudio += "<div id='audioTag_AF"+countAudio+"'></div>";
    			cadenaAudio += "<div class='soundPlayer' id='btnAudio_AF"+countAudio+"' data-orden='"+countAudio+"'>";
    			cadenaAudio += "<div class='errorSound' id='errorAudio_AF"+countAudio+"'></div>";
    			cadenaAudio += "<a href='#' class='btn' id='audioOK_AF"+countAudio+"'><span id='iconoAudio_AF"+countAudio+"' class='iPlayerReducido iPlay'></span></a>";
    			cadenaAudio += "</div>";
    			cadenaAudio += "</div>";
    			$("#elementoAFinal"+i).html("<div class='cardSound btn-sound' data-idaudio='AF"+countAudio+"'>"+cadenaAudio+"</div>");
                
                var rutaAudio = rutaRecursos+grupos[i]["elementoA_Valor"];
                var rutaAudioOgg = rutaRecursosInicio+grupos[i]["elementoA_Valor"];
                
    			var audioCadena = "<audio id='pistaAudio_AF"+countAudio+"'><source src='"+rutaAudio+"' type='audio/mpeg'></source><source src='"+rutaAudio.substring(0,rutaAudio.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaAudioOgg.substring(0,rutaAudioOgg.length-3)+"ogg' onError='errores("+countAudio+",1,1);' type='audio/ogg'></source></audio>";
    			$('#audioTag_AF'+countAudio).html(audioCadena);
    			$('#btnAudio_AF'+countAudio).show();
    			$('#btnAudio_AF'+countAudio).click(function(e){e.preventDefault();gestionReproducir("pistaAudio_AF"+$(this).attr('data-orden'),"iconoAudio_AF"+$(this).attr('data-orden'),2);});
                
                countAudio++;
            }
		}
        
        countAudio = 0;
        for(i=0;i<grupos.length;i++){
			var divElementoBFinal = $("<div>",
			{
				id: "elementoBFinal"+i,
				"class": "cardContainerCorreccion"
			});
            $("#contentElementosFinal").append(divElementoBFinal);
            
            if(grupos[i]["elementoB_Tipo"] == "TEXTO"){
                $("#elementoBFinal"+i).html("<div class='cardTxt'><div class='scrollbox'>"+grupos[i]["elementoB_Valor"]+"</div></div>");
            }
            else if(grupos[i]["elementoB_Tipo"] == "IMAGEN"){
                var src = rutaRecursos+grupos[i]["elementoB_Valor"];
                $("#elementoBFinal"+i).html("<div class='cardImage'><img src='"+src+"'></div>");
            }
            else if(grupos[i]["elementoB_Tipo"] == "AUDIO"){
                var cadenaAudio = "<div class='pistaAudio' id='pAudio_BF"+countAudio+"' style='display:none'>";
    			cadenaAudio += "<div id='audioTag_BF"+countAudio+"'></div>";
    			cadenaAudio += "<div class='soundPlayer' id='btnAudio_BF"+countAudio+"' data-orden='"+countAudio+"'>";
    			cadenaAudio += "<div class='errorSound' id='errorAudio_BF"+countAudio+"'></div>";
    			cadenaAudio += "<a href='#' class='btn' id='audioOK_BF"+countAudio+"'><span id='iconoAudio_BF"+countAudio+"' class='iPlayerReducido iPlay'></span></a>";
    			cadenaAudio += "</div>";
    			cadenaAudio += "</div>";
    			$("#elementoBFinal"+i).html("<div class='cardSound btn-sound' data-idaudio='BF"+countAudio+"'>"+cadenaAudio+"</div>");
                
                var rutaAudio = rutaRecursos+grupos[i]["elementoB_Valor"];
                var rutaAudioOgg = rutaRecursosInicio+grupos[i]["elementoB_Valor"];
                
    			var audioCadena = "<audio id='pistaAudio_BF"+countAudio+"'><source src='"+rutaAudio+"' type='audio/mpeg'></source><source src='"+rutaAudio.substring(0,rutaAudio.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaAudioOgg.substring(0,rutaAudioOgg.length-3)+"ogg' onError='errores("+countAudio+",1,2);' type='audio/ogg'></source></audio>";
    			$('#audioTag_BF'+countAudio).html(audioCadena);
    			$('#btnAudio_BF'+countAudio).show();
    			$('#btnAudio_BF'+countAudio).click(function(e){e.preventDefault();gestionReproducir("pistaAudio_BF"+$(this).attr('data-orden'),"iconoAudio_BF"+$(this).attr('data-orden'),2);});
                
                countAudio++;
            }
		}
        
        for(j=0;j<grupos.length;j++){
            $('#cajaPareja'+j).append($("#elementoAFinal"+j));
            $('#cajaPareja'+j).append($("#elementoBFinal"+j));
            for(m=0;m<parejasCorrectas.length;m++){
                if(parejasCorrectas[m]==j){
                    $('#cajaPareja'+j).addClass('parejaOk');
                }
            }
        }
        
        $('.btn-sound').bind("click",function(e){
            e.stopPropagation();
            $(this).toggleClass('sound-active');
            var eleF = $(this).attr('data-idaudio');
            gestionReproducir("pistaAudio_"+eleF,"iconoAudio_"+eleF,0);
        });
    }
    
    function getDatosRespuestas(s) {
		var datos = {};
		datos['m'] = {};
		datos['m']['s'] = s;
		datos['r'] = respuestasSecuencia;
		return datos;
    }
    
    function actualizaPuntosFinal(tipoAlerta) {
        if (tipoAlerta == "tiempo") {
            if (parejasCorrectas.length == 0) {
                puntosReg = 0;
            } else {
                var restantes = grupos.length - parejasCorrectas.length;
                var puntosRestar = parseInt(100 / grupos.length);
                puntosReg -= restantes * puntosRestar;
                if (puntosReg <= 0) {
                    puntosReg = 0;
                }
            }
        }
	}