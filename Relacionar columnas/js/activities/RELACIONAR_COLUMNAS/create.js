//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio de Relacionar Columnas)
//==========================================================================================================================

//En esta variable almacenaremos el intervalo de tiempo
var idInterval = 0;

//Creamos los elementos necesarios para la aplicacion de Relacionar Columnas

	function crear()
	{	
		var divContentElementos = $("<div>",
		{
			id: "contentElementos"
		});
        
        var divContentElementosA = $("<div>",
		{
			id: "contentElementosA",
            "class": "col-left"
		});
        $(divContentElementos).append(divContentElementosA);
        
        var divContentElementosB = $("<div>",
		{
			id: "contentElementosB",
            "class": "col-right"
		});
        $(divContentElementos).append(divContentElementosB);
        
        var divContentElementosMedio = $("<div>",
		{
			id: "contentElementosMedio",
            "class": "container-canvas"
		});
        $(divContentElementos).append(divContentElementosMedio);
        
		$('#lienzo').append(divContentElementos);
			
		cargar();
	}
	

//Cargamos los elementos de manera aleatoria sobre las cajas creadas
	
	function cargar()
	{	
        var countAudio = 0;
        var mostrados = [];
        var repetido = 0;
		for(i=0;i<grupos.length;i++){    
            repetido = 1;
            aleatorio = 0;
            while(aleatorio >= grupos.length || repetido == 1){
                aleatorio = parseInt(100 * Math.random());
                repetido = 0;
                for(j=0;j<mostrados.length;j++){
                    if(mostrados[j]==aleatorio) repetido = 1;
                }
            }
            mostrados[i] = aleatorio;
            
			var btnElementoA = $("<div>",
			{
				id: "elementoA"+i,
				"class": "btn"
			});
			$('#contentElementosA').append(btnElementoA);
            
            var divElementoA = $("<div>",
			{
				id: "divElementoA"+i,
				"class": "container-btn"
			});
			$('#elementoA'+i).append(divElementoA);
            
            var divContElementoA = $("<div>",
			{
				id: "divContElementoA"+i
			});
			$('#divElementoA'+i).append(divContElementoA);
            
            var divBgElementoA = $("<div>",
			{
				id: "divBgElementoA"+i,
                "class": "bgActive"
			});
			$('#divElementoA'+i).append(divBgElementoA);
            
            var bullElementoA = $("<div>",
			{
				id: "bullElementoA"+i,
				"class": "bull-active"
			});
			$('#elementoA'+i).append(bullElementoA);
            
            if(grupos[aleatorio]["elementoA_Tipo"] == "TEXTO"){
                $("#divContElementoA"+i).addClass("btn-txt").html(grupos[aleatorio]["elementoA_Valor"]);
            }
            else if(grupos[aleatorio]["elementoA_Tipo"] == "IMAGEN"){
                var src = rutaRecursos+grupos[aleatorio]["elementoA_Valor"];
                $("#divContElementoA"+i).addClass("btn-image").html("<img src='"+src+"'>");
            }
            else if(grupos[aleatorio]["elementoA_Tipo"] == "AUDIO"){
                var cadenaAudio = "<div class='pistaAudio' id='pAudio_A"+countAudio+"' style='display:none'>";
    			cadenaAudio += "<div id='audioTag_A"+countAudio+"'></div>";
    			cadenaAudio += "<div class='soundPlayer' id='btnAudio_A"+countAudio+"' data-orden='"+countAudio+"'>";
    			cadenaAudio += "<div class='errorSound' id='errorAudio_A"+countAudio+"'></div>";
    			cadenaAudio += "<a href='#' class='btn' id='audioOK_A"+countAudio+"'><span id='iconoAudio_A"+countAudio+"' class='iPlayerReducido iPlay'></span></a>";
    			cadenaAudio += "</div>";
    			cadenaAudio += "</div>";
    			$("#divContElementoA"+i).addClass("btn-sound").attr('data-idaudio','A'+countAudio).html(cadenaAudio);
                
                var rutaAudio = rutaRecursos+grupos[aleatorio]["elementoA_Valor"];
                var rutaAudioOgg = rutaRecursosInicio+grupos[aleatorio]["elementoA_Valor"];
                
    			var audioCadena = "<audio id='pistaAudio_A"+countAudio+"'><source src='"+rutaAudio+"' type='audio/mpeg'></source><source src='"+rutaAudio.substring(0,rutaAudio.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaAudioOgg.substring(0,rutaAudioOgg.length-3)+"ogg' onError='errores("+countAudio+",0,1);' type='audio/ogg'></source></audio>";
    			$('#audioTag_A'+countAudio).html(audioCadena);
    			$('#btnAudio_A'+countAudio).show();
			    $('#btnAudio_A'+countAudio).click(function(e){
    			     e.preventDefault();
                     gestionReproducir("pistaAudio_A"+$(this).attr('data-orden'),"iconoAudio_A"+$(this).attr('data-orden'),1);
                });
                
                countAudio++;
            }
            numAudiosA = countAudio;
		}
        
        mostradosA = mostrados;
        
        countAudio = 0;
        mostrados = [];
        repetido = 0;
        for(i=0;i<grupos.length;i++){
            repetido = 1;
            aleatorio = 0;
            while(aleatorio >= grupos.length || repetido == 1){
                aleatorio = parseInt(100 * Math.random());
                repetido = 0;
                for(j=0;j<mostrados.length;j++){
                    if(mostrados[j]==aleatorio) repetido = 1;
                }
            }
            mostrados[i] = aleatorio;
            
			var btnElementoB = $("<div>",
			{
				id: "elementoB"+i,
				"class": "btn"
			});
			$('#contentElementosB').append(btnElementoB);
            
            var divElementoB = $("<div>",
			{
				id: "divElementoB"+i,
				"class": "container-btn"
			});
			$('#elementoB'+i).append(divElementoB);
            
            var divContElementoB = $("<div>",
			{
				id: "divContElementoB"+i
			});
			$('#divElementoB'+i).append(divContElementoB);
            
            var divBgElementoB = $("<div>",
			{
				id: "divBgElementoB"+i,
                "class": "bgActive"
			});
			$('#divElementoB'+i).append(divBgElementoB);
            
            var bullElementoB = $("<div>",
			{
				id: "bullElementoB"+i,
				"class": "bull-active"
			});
			$('#elementoB'+i).append(bullElementoB);
            
            if(grupos[aleatorio]["elementoB_Tipo"] == "TEXTO"){
                $("#divContElementoB"+i).addClass("btn-txt").html(grupos[aleatorio]["elementoB_Valor"]);
            }
            else if(grupos[aleatorio]["elementoB_Tipo"] == "IMAGEN"){
                var src = rutaRecursos+grupos[aleatorio]["elementoB_Valor"];
                $("#divContElementoB"+i).addClass("btn-image").html("<img src='"+src+"'>");
            }
            else if(grupos[aleatorio]["elementoB_Tipo"] == "AUDIO"){
                var cadenaAudio = "<div class='pistaAudio' id='pAudio_B"+countAudio+"' style='display:none'>";
    			cadenaAudio += "<div id='audioTag_B"+countAudio+"'></div>";
    			cadenaAudio += "<div class='soundPlayer' id='btnAudio_B"+countAudio+"' data-orden='"+countAudio+"'>";
    			cadenaAudio += "<div class='errorSound' id='errorAudio_B"+countAudio+"'></div>";
    			cadenaAudio += "<a href='#' class='btn' id='audioOK_B"+countAudio+"'><span id='iconoAudio_B"+countAudio+"' class='iPlayerReducido iPlay'></span></a>";
    			cadenaAudio += "</div>";
    			cadenaAudio += "</div>";
    			$("#divContElementoB"+i).addClass("btn-sound").attr('data-idaudio','B'+countAudio).html(cadenaAudio);
                
                var rutaAudio = rutaRecursos+grupos[aleatorio]["elementoB_Valor"];
                var rutaAudioOgg = rutaRecursosInicio+grupos[aleatorio]["elementoB_Valor"];
                
    			var audioCadena = "<audio id='pistaAudio_B"+countAudio+"'><source src='"+rutaAudio+"' type='audio/mpeg'></source><source src='"+rutaAudio.substring(0,rutaAudio.length-3)+"ogg' type='audio/ogg'></source><source src='"+rutaAudioOgg.substring(0,rutaAudioOgg.length-3)+"ogg' onError='errores("+countAudio+",0,2);' type='audio/ogg'></source></audio>";
    			$('#audioTag_B'+countAudio).html(audioCadena);
    			$('#btnAudio_B'+countAudio).show();
    			$('#btnAudio_B'+countAudio).click(function(e){
    			     e.preventDefault();
                     gestionReproducir("pistaAudio_B"+$(this).attr('data-orden'),"iconoAudio_B"+$(this).attr('data-orden'),1);
                });
                
                countAudio++;
            }
            numAudiosB = countAudio;
		}
        
        mostradosB = mostrados;
        
        $('#contentElementos .btn').bind("click",gestionEleccion);
        $('.btn-sound').bind("click",function(e){
            
            if($(this).hasClass('sound-active')){
                $('#contentElementos .btn').bind("click",gestionEleccion);
                $(".correctaEl").unbind('click');
            } 
            else $('#contentElementos .btn').unbind("click");
            
            e.stopPropagation();
            $(this).toggleClass('sound-active');
            var eleF = $(this).attr('data-idaudio');
            gestionReproducir("pistaAudio_"+eleF,"iconoAudio_"+eleF,1);
        });
        
        setTimeout(function(){
            $("#contentElementosMedio").append("<canvas id='canvas' width='"+$("#contentElementosMedio").width()+"' height='"+Math.max($(".col-left").height(),$(".col-right").height())+"'></canvas>");
            anchuraCanvas = $("#contentElementosMedio").width();
        },500);
	}