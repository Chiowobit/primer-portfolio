//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio del Test)
//==========================================================================================================================

//En esta variable almacenaremos el intervalo de tiempo
var idInterval = 0;

//Creamos las preguntas de nuestra aplicacion

	function crear()
	{	
		for(i=0;i<numPreguntas+1;i++)
		{
			if(i<10) var ix = "00"+i;
            else if(i<100) var ix = "0"+i;
			else var ix = i;
			
			//Creamos el cuadro para cada una de las preguntas		
			var divPregunta = $("<div>",
			{
				id: "pregunta"+ix,
				"class": "preguntas"
			});
			$('#lienzo').append(divPregunta);
			
			var divEnunciado = $("<div>",
			{
				"class": "enunciado"
			});
			
			var divNumTest = $("<div>",
			{
				id: "numTest"+ix,
				"class": "numTest celda"
			});
			$(divEnunciado).append(divNumTest);
			
			var divImagenEnunciado = $("<div>",
			{
				id: "imPregunta"+ix,
				"class": "imPreguntas celda"
			});
			$(divEnunciado).append(divImagenEnunciado);
			
			var divContenidoPregunta = $("<div>",
			{
				"class": "contentPregunta celda"
			});
			
			var divEnTitulo = $("<div>",
			{
				id: "tituloResponder"+ix,
				"class": "enTitulo"
			});
			$(divEnTitulo).html(txtTituloResponder);
			$(divContenidoPregunta).append(divEnTitulo);
			
			var divPreguntaMultimedia = $("<div>",
			{
				id: "pMultimedia"+ix,
				"class": "preguntaMultimedia"
			});
			$(divContenidoPregunta).append(divPreguntaMultimedia);
			
			var divEnunciadoPregunta = $("<div>",
			{
				id: "enPregunta"+ix,
				"class": "enPreguntas"
			});
			$(divContenidoPregunta).append(divEnunciadoPregunta);
			
			$(divEnunciado).append(divContenidoPregunta);
			
			var divPadRight = $("<div>",
			{
				"class": "padRight celda"
			});
			$(divEnunciado).append(divPadRight);
			
			$("#pregunta"+ix).append(divEnunciado);
			
			var divRespuestas = $("<div>",
			{
				id: "respuestas"+ix,
				"class": "respuestas"
			});
			$("#pregunta"+ix).append(divRespuestas);
		}
		
		cargarElementos();
	}

//Cargamos los diferentes elementos de cada pregunta en función del tipo
//Array que contendrá las rutas de los videos que tenemos para las preguntas, para luego reconponerlos
var rutasVideos = [];
	
	function cargarElementos()
	{	
		for(k=0;k<numPreguntas+1;k++)
		{
			if(k<10) var kx = "00"+k;
            else if(k<100) var kx = "0"+k;
			else var kx = k;
			
			if(k != numPreguntas) 
			{
				if(aPreguntas[k]["imagen"] != "")
				{
					var rutaImagen = rutaRecursos + aPreguntas[k]["imagen"];
					var imgAmplia = "<a href='"+rutaImagen+"' class='fancybox'><div class='image-overlay'><div class='image-overlay-zoom'></div></div><img id='pistaImagen' src='"+rutaImagen+"'></a>";
					$("#imPregunta"+kx).html(imgAmplia);
					$('.fancybox').fancybox();
				}
				else
				{
					$("#imPregunta"+kx).hide();
				}
				
				if(aPreguntas[k]["tipoE"] == "texto")
				{
					$("#enPregunta"+kx).html(aPreguntas[k]["pregunta"]);
					$("#pMultimedia"+kx).hide();
				}
				if((aPreguntas[k]["tipoE"] == "video")||(aPreguntas[k]["tipoE"] == "textovideo"))
				{	
					$("#enPregunta"+kx).html(aPreguntas[k]["pregunta"]);
					
					var video = aPreguntas[k]["video"]+"?autoplay=0&controls=0&showinfo=0&rel=0&start="+aPreguntas[k]["videoT"];
					aVideo = video.split("/");
					video = aVideo[aVideo.length-1];
					if(video.substring(0,3) == "fsa") video = video.substring(3,video.length);
					var rutaVideo = "//www.youtube.com/embed/"+video;
					rutasVideos[k] = rutaVideo;
					var cadenaVideo = "<iframe id='iframe"+kx+"' class='iframes' type='text/html' src='"+rutaVideo+"' width='400' height='300'></iframe>";
					
					var divVideo = $("<div>",
					{
						id: "video"+kx,
						"class": "videos"
					});
					$(divVideo).html(cadenaVideo);
					$(divVideo).insertBefore("#respuestas"+kx);
					$("#video"+kx).hide();
					
					$("#pMultimedia"+kx).html("<a class='fancybox btn verVideo' id='enlaceVideo"+kx+"' href='#video"+kx+"'><span id='enSpanVideo"+kx+"' class='iMultimedia'></span></a>");
					$('.fancybox').fancybox();
					
					$("#enlaceVideo"+kx).click(function(e){
						var cadId = e.target.getAttribute('id').substring(11,14);
						setTimeout(function(){
							$('.fancybox-close').click(function(){
								
								var contenido = $("#video"+cadId).html();
								$("#video"+cadId).html("");
								$("#video"+cadId).html(contenido);
							});
							$('.fancybox-overlay').click(function(){
								
								var contenido = $("#video"+cadId).html();
								$("#video"+cadId).html("");
								$("#video"+cadId).html(contenido);
							});
						},2000);
					});
					
				}
				if((aPreguntas[k]["tipoE"] == "ambos")||(aPreguntas[k]["tipoE"] == "textoaudio")||(aPreguntas[k]["tipoE"]=="audio"))
				{
					$("#enPregunta"+kx).html(aPreguntas[k]["pregunta"]);
					
					var audio = aPreguntas[k]["audio"];
					var rutaAudio = rutaRecursos + audio;
                    var rutaAudioOgg = rutaRecursosInicio + audio;
					
					var cadenaAudio = "<div class='pistaAudio' id='pAudio"+kx+"'>";
					cadenaAudio += "<div id='audioTag"+kx+"'></div>";
					cadenaAudio += "<div class='soundPlayer' id='btnAudio"+kx+"'>";
					cadenaAudio += "<div class='errorSound' id='errorAudio"+kx+"'></div>";
					cadenaAudio += "<a href='#' class='btn' id='audioOK"+kx+"'><span id='iconoAudio"+kx+"' class='iPlayerReducido iPlay'></span></a>";
					cadenaAudio += "</div>";
					cadenaAudio += "</div>";
					$("#pMultimedia"+kx).html(cadenaAudio);
			
					var audioCadena = "<audio id='pistaAudio"+kx+"'><source src='"+rutaAudio+"' type='audio/mpeg'></source><source src='"+rutaAudio.substring(0,rutaAudio.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaAudioOgg.substring(0,rutaAudioOgg.length-3)+"ogg' onError='errores(-1);' type='audio/ogg'></source></audio>";
					$('#audioTag'+kx).html(audioCadena);
					$('#btnAudio'+kx).show();
					$('#btnAudio'+kx).click(function(e){e.preventDefault();var num = e.target.getAttribute('id').substring(e.target.getAttribute('id').length-3,e.target.getAttribute('id').length); gestionReproducir("pistaAudio"+num,"iconoAudio"+num);});
				}
				
				cargarRespuestas(k,aPreguntas[k]["tipo"]);				
			} 
		}
		$("input:checkbox").click(activarChequedCB);
	}
	
//Cargamos las respuestas de cada pregunta

	function cargarRespuestas(k,tipo)
	{
		if(k<10) var kx = "00"+k;
        else if(k<100) var kx = "0"+k;
		else var kx = k;
				
		if(tipo == "unica")
		{
			$("#respuestas"+kx).addClass("resOptions");
			for(m=0;m<aRespuestas[k].length;m++)
			{
				if(m<10) var mx = "00"+m;
                else if(m<100) var mx = "0"+m;
				else var mx = m;
				
				var divRespuesta = $("<div>",
				{
					id: "respuesta"+kx+"_"+mx,
					"class": "respuesta"
				});
				$("#respuestas"+kx).append(divRespuesta);
				
				var rutaImagen = rutaRecursos + aRespuestas[k][m]["imagen"];
				
				var cadena = "<label class='labelFull' for='resp"+kx+"_"+mx+"' id='respL"+kx+"_"+mx+"'>";
               	cadena += "<div class='celda check'>";
                cadena += "<input type='radio' id='resp"+kx+"_"+mx+"' name='respuesta"+kx+"'>";
                cadena += "</div>";
                if(aRespuestas[k][m]["imagen"] != "") cadena += "<div class='celda imagenRespuesta'><a href='"+rutaImagen+"' class='fancybox'><div class='image-overlay'><div class='image-overlay-zoom'></div></div><img src='"+rutaImagen+"' class='imgRespuesta'></a></div>";
                cadena += "<div class='celda txtOption' id='respC"+kx+"_"+mx+"'>"+aRespuestas[k][m]["respuesta"]+"</div>";
                cadena += "</label>";
				
				$("#respuesta"+kx+"_"+mx).html(cadena);
				$("input:radio[name='respuesta"+kx+"']").click(activarChequedR);
			}
			$('.fancybox').fancybox();
		}
		if(tipo == "multiple")
		{
			$("#respuestas"+kx).addClass("resOptions");
			var cadena = "";
			for(m=0;m<aRespuestas[k].length;m++)
			{
				if(m<10) var mx = "00"+m;
                else if(m<100) var mx = "0"+m;
				else var mx = m;
				
				var divRespuesta = $("<div>",
				{
					id: "respuesta"+kx+"_"+mx,
					"class": "respuesta"
				});
				$("#respuestas"+kx).append(divRespuesta);
				
				var rutaImagen = rutaRecursos + aRespuestas[k][m]["imagen"];
				
				var cadena = "<label class='labelFull' for='resp"+kx+"_"+mx+"' id='respL"+kx+"_"+mx+"'>";
               	cadena += "<div class='celda check'>";
                cadena += "<input type='checkbox' id='resp"+kx+"_"+mx+"' name='respuesta"+kx+"_"+mx+"'>";
                cadena += "</div>";
                if(aRespuestas[k][m]["imagen"] != "") cadena += "<div class='celda imagenRespuesta'><a href='"+rutaImagen+"' class='fancybox'><div class='image-overlay'><div class='image-overlay-zoom'></div></div><img src='"+rutaImagen+"' class='imgRespuesta'></a></div>";
                cadena += "<div class='celda txtOption' id='respC"+kx+"_"+mx+"'>"+aRespuestas[k][m]["respuesta"]+"</div>";
                cadena += "</label>";
				
				$("#respuesta"+kx+"_"+mx).html(cadena);
			}
			$('.fancybox').fancybox();
		}
		if(tipo == "escrita")
		{
			$("#respuestas"+kx).addClass("resEscrita");
			var divRespuesta = $("<div>",
			{
				id: "respuesta"+kx+"_00",
				"class": "respuesta"
			});
			$("#respuestas"+kx).append(divRespuesta);
			
			$("#respuesta"+kx+"_00").html("<input id='resp"+kx+"_00' type='text' class='inputs' placeholder='"+txtTuRespuesta+"'>");
			
			$("#resp"+kx+"_00").keyup(function(){comprobarRespuesta("escrita");});
		}
		if(tipo == "escrita amplia")
		{
			$("#respuestas"+kx).addClass("resEscrita");
			var divRespuesta = $("<div>",
			{
				id: "respuesta"+kx+"_00",
				"class": "respuesta"
			});
			$("#respuestas"+kx).append(divRespuesta);
			
			$("#respuesta"+kx+"_00").html("<textarea id='resp"+kx+"_00' class='inputs' rows='12' cols='40' placeholder='"+txtTuRespuesta+"'></textarea>");
			
			$("#resp"+kx+"_00").keyup(function(){comprobarRespuesta("escrita");});
		}
	}
