//==========================================================================================================================
//Funciones que vamos a utilizar para la versión imprimible del crucigrama (Propio del Crucigrama)
//==========================================================================================================================

//Cuando se carga la página imprimible, lanzamos la generación de la version para imprimir

window.onload = function(){
	//Esta variable será la ruta para los recursos necesarios
	rutaRecursos="/actividades/"+$(document).data("idActividad")+"/";rutaRecursosDownl="";
	//rutaRecursos = "";
	
	cargarDatosPrint();
	}

//Carga los datos necesarios desde el fichero XML de la actividad
  
    function cargarDatosPrint()
	{
		xmlDoc = cargarXMLJS();
		if ((xmlDoc != null)&&(xmlDoc != undefined))
		{
			//Extraemos los datos del XML para la versión de impresión
			try{extraerDatosPrint();}
			catch(e){
				errorXML();
				}
			//Creamos la versión de impresión
			crearPrint();
		}		
		else
		{
			errorXML();
		}					
	}
	
//Resgistra el error cuando no se puede leer el XML

	function errorXML()
	{
		$.get("/avisoEstructuraXml.php");
		$("#lienzo").html("<div id='errorXML'>"+$(document).data("loadingXmlError")+"</div>");
	}
				
//Carga el fichero XML
	
	function cargarXMLJS() {
		return jQuery.parseXML(DatosActividad);
	}

//Extraemos los datos necesarios de XML para la versión imprimible
	
	function extraerDatosPrint()
	{
	   
		try{
			origen_recursos = xmlDoc.getElementsByTagName("origen_recursos")[0].childNodes[0].nodeValue;
		}catch(e)
		{
			origen_recursos="";
		}
		
		if(origen_recursos){
			rutaRecursos = origen_recursos;
		}
		
		try{autor = xmlDoc.getElementsByTagName("autor")[0].childNodes[0].nodeValue;}catch(e){autor = "";}
		titulo = xmlDoc.getElementsByTagName("enunciado")[0].childNodes[0].nodeValue;
				
		columnas = xmlDoc.getElementsByTagName("numero_columnas")[0].childNodes[0].nodeValue;
		filas = xmlDoc.getElementsByTagName("numero_filas")[0].childNodes[0].nodeValue;
		
		//Creamos una serie de arrays con la informacion de las palabras
		pa = [];
		ti = [];
		de = [];
		fi = [];
		co = [];
		di = [];
	
		var palab = xmlDoc.getElementsByTagName("palabra");
		for (var i = 0; i < palab.length; i++)
 		{
  			pa[i] = palab[i].getElementsByTagName("valor")[0].childNodes[0].nodeValue;
  			ti[i] = palab[i].getElementsByTagName("tipo")[0].childNodes[0].nodeValue;
  			de[i] = palab[i].getElementsByTagName("definicion")[0].childNodes[0].nodeValue;
  			fi[i] = parseInt(palab[i].getElementsByTagName("fila")[0].childNodes[0].nodeValue);
  			co[i] = parseInt(palab[i].getElementsByTagName("columna")[0].childNodes[0].nodeValue);
  			di[i] = palab[i].getElementsByTagName("direccion")[0].childNodes[0].nodeValue;
  		}
  		
  		try{
  			var idioma = xmlDoc.getElementsByTagName("idioma")[0];
  			try{txtAutor = idioma.getElementsByTagName("txtAutor")[0].childNodes[0].nodeValue;}catch(e){txtAutor = "Autor";}
  			try{txtHorizontales = idioma.getElementsByTagName("txtHorizontales")[0].childNodes[0].nodeValue;}catch(e){txtHorizontales = "Horizontales";}
  			try{txtVerticales = idioma.getElementsByTagName("txtVerticales")[0].childNodes[0].nodeValue;}catch(e){txtVerticales = "Verticales";}
  		}
		catch(e){
			txtAutor = "Autor";
			txtHorizontales = "Horizontales";
			txtVerticales = "Verticales";
		}
	}

//Creamos la versión imprimible
	
	function crearPrint()
	{
		$("#txtTitAct").html(titulo);
		if(autor == "")
		{
			$("#textoAutor").hide();
			$("#nombreAutor").hide();
		}
		else
		{
			$("#textoAutor").html(txtAutor+":");
			$("#nombreAutor").html(autor);
		}
		$("#textoHorizontales").html(txtHorizontales);
		$("#textoVerticales").html(txtVerticales);
		
		//Una vez conocemos la cantidad de celdas, establecemos el tamaño de las mismas en función de las dimensiones disponibles
		var tamMaximo = 680;		
		tamCasilla = parseInt(tamMaximo/columnas);
		
		if(tamCasilla > 35) tamCasilla = 35;
		
		//Le damos el tamaño de alto y ancho al lienzo imprimible
		$("#lienzo").width(tamCasilla*columnas);
		$("#lienzo").height(tamCasilla*filas);
		
		//El elemento miLienzo, es el elemento sobre el que creamos el crucigrama
		miLienzo = $('#lienzo');
		
		var px = 0;
		var py = 0;
	
		for(i=0;i<filas;i++)
		{
			if(i<10) var ix = "0"+i;
			else var ix = i;		
			for(j=0;j<columnas;j++)
			{
				pxt=px+"px";
				pyt=py+"px";
			
				if(j<10) var jy = "0"+j;
				else var jy = j;
						
				var div = $("<div>",
				{
					id: "c"+ix+"_"+jy,
					"class": "casilla",
					css:{"left":pxt,"top":pyt}
				});
				
				miLienzo.append(div);
				
				px = px + (tamCasilla);
				
				var tamLetra = tamCasilla-8;
				if(tamLetra < 7) tamLetra = 7;
				$("#c"+ix+"_"+jy).css({"width":tamCasilla+"px","height":tamCasilla+"px","font-size":tamLetra+"px", "line-height":tamCasilla+"px"});
			}
			px = 0;
			py = py + (tamCasilla);	
		}
		
		//Activamos para finalizar las casillas en las que podemos introducir contenido
		cargarPrint();
	}
				
//Activo las casillas que van a tener contenido con las características necesarias

	function cargarPrint()
	{
		if(tamCasilla < 12) tamNumerito = 2;
		else if(tamCasilla < 15) tamNumerito = 3;
		else if(tamCasilla < 18) tamNumerito = 4;
		else if(tamCasilla < 21) tamNumerito = 5;
		else if(tamCasilla < 24) tamNumerito = 6;
		else if(tamCasilla < 26) tamNumerito = 7;
		else if(tamCasilla < 30) tamNumerito = 8;
		else if(tamCasilla < 35) tamNumerito = 9;
		else if(tamCasilla < 40) tamNumerito = 10;
		else if(tamCasilla < 45) tamNumerito = 11;
		else tamNumerito = 12;
		
		for(k=0;k<pa.length;k++)
		{
			fila = fi[k];
			columna = co[k];
			direccion = di[k];
			palabra = pa[k];
	
			if(k<10) var kz = "0"+k;
			else var kz = k;
	
			if(columna<10) var columnax = "0"+columna;
			else columnax = columna;
	
			if(fila<10) var filay = "0"+fila;
			else filay = fila;
			
			if(k == 0) primera = "c"+filay+"_"+columnax;
			
			if(direccion == "V")
			{
				for(i=fila;i<=(palabra.length+fila-1);i++)
				{
					if(i<10) var ix = "0"+i;
					else var ix = i;
					
					if(i==fila) 
					{
						pxt=document.getElementById("c"+ix+"_"+columnax).style.left;
						pyt=document.getElementById("c"+ix+"_"+columnax).style.top;
						
						var span = $("<span>",
						{
							id: "sp"+ix+"_"+columnax,
							"class": "numerito",
							css:{"left":pxt,"top":pyt,"font-size":tamNumerito+"px"}
						});
						
						miLienzo.append(span);
						$("#sp"+ix+"_"+columnax).html($("#sp"+ix+"_"+columnax).html()+(k+1));
					}
					$("#c"+ix+"_"+columnax).addClass("e"+kz);
						
					if((i==fila)&&($("#c"+ix+"_"+columnax).hasClass("activa")))
					{
						var clase = document.getElementById("c"+ix+"_"+columnax).className;
						var p1 = clase.substring(9,11);
						var p2 = clase.substring(20,22);
						document.getElementById("c"+ix+"_"+columnax).className = "casilla e"+p2+" activa e"+p1;
					}
					else
					{
						$("#c"+ix+"_"+columnax).addClass("activa");
					}
				}
			}
		
			if(direccion == "H")
			{
				for(j=columna;j<=(palabra.length+columna-1);j++)
				{
					if(j<10) var jy = "0"+j;
					else var jy = j;
				
					if(j==columna)
					{
						pxt=document.getElementById("c"+filay+"_"+jy).style.left;
						pyt=document.getElementById("c"+filay+"_"+jy).style.top;
						
						var span = $("<span>",
						{
							id: "sp"+filay+"_"+jy,
							"class": "numerito",
							css:{"left":pxt,"top":pyt,"font-size":tamNumerito+"px"}
						});
						
						miLienzo.append(span);
						$("#sp"+filay+"_"+jy).html(k+1);
					}
					$("#c"+filay+"_"+jy).addClass("e"+kz);
								
					if((j==columna)&&($("#c"+filay+"_"+jy).hasClass("activa")))
					{
						var clase = document.getElementById("c"+filay+"_"+jy).className;
						var p1 = clase.substring(9,11);
						var p2 = clase.substring(20,22);
						document.getElementById("c"+filay+"_"+jy).className = "casilla e"+p2+" activa e"+p1;
					}
					else
					{
						$("#c"+filay+"_"+jy).addClass("activa");
					}
							
				}
			}
		}
		
		pistasPrint();
	}

//Colocamos en el lugar correspondiente las pistas para la versión imprimible
	
	function pistasPrint()
	{	
		for(k=0;k<pa.length;k++)
		{
			var direccion = di[k];
			var tipo = ti[k];
			var valorPista = de[k];
			var rutaPista = valorPista;
			
			var liPista = $("<li>");
				
			var spanNum = $("<span>",{"class": "numPista"});
			spanNum.html(k+1+".");
			liPista.append(spanNum);
				
			var spanPista = $("<span>",{"class": "pista"});		
				
			if(tipo == "texto")
			{	
				spanPista.html(valorPista);
			}
			else if(tipo == "imagen")
			{
				var rutaPista = rutaRecursos + valorPista;
				spanPista.html("<img src='"+rutaPista+"'>");
			}
			else if(tipo == "audio")
			{
				spanPista.html("<span class='audio'>(Pista en formato audio)</span>");
			}
			liPista.append(spanPista);
			
			if(direccion == "H")
			{
				$("#listaHorizontal").append(liPista);
			}
			
			if(direccion == "V")
			{
				$("#listaVertical").append(liPista);
			}
		}
	}
