//==========================================================================================================================
//Funciones que vamos a utilizar para crear nuestra aplicacion (Propio de Relacionar Secuencial)
//==========================================================================================================================

//En esta variable almacenaremos el intervalo de tiempo
var idInterval = 0;
var finalizado = 0;

//Creamos los elementos necesarios para la aplicacion de Relacionar Secuencial

	function crear()
	{	
        var divPrincipal = $("<div>", { id: "principal" });
        $("#lienzo").append(divPrincipal);

        var divwp = $("<div>", {
        id: "wrapperPasapalabraI",
        class: "wrapperPasapalabra"
    });
         $("#principal").append(divwp);
        
		var divcb = $("<div>",
		{
			id: "questionBoxI",
            "class": "questionBox"
		});
        $('#wrapperPasapalabraI').append(divcb);
        
		var divcb2 = $("<div>",
		{
			id: "questionBoxI2",
            "class": "questionBox2"
		});
        $('#questionBoxI').append(divcb2);
        
        var divqb = $("<div>",
		{
			id: "topQuestionBoxI",
            "class": "topQuestionBox"
		});
        $('#questionBoxI2').append(divqb);
        
        var divqba = $("<div>",
		{
			id: "letterBeginI",
            "class": "letterBegin"
		});
        $('#topQuestionBoxI').append(divqba);
        
        var divqbb = $("<div>",
		{
			id: "questionTxtI",
            "class": "questionTxt"
		});
        $('#topQuestionBoxI').append(divqbb);
        var reproductor = '<div class="pistaSonido" id="pistaSonidoPrincipal"><div id="imageSound"></div><div class="timeSound"><span id="tiempo_0" class="infoTime">00:00</span> | <span id="duracion_0" class="infoTime">00:00</span></div></div>';
        $('#topQuestionBoxI').append(reproductor);
        
        var divab = $("<div>",
		{
			id: "answerBoxI",
            "class": "answerBox"
		});
        $('#questionBoxI2').append(divab);
        
        var divaba = $("<div>",
		{
			id: "inputAnswerI",
            "class": "inputAnswer"
		});
        $('#answerBoxI').append(divaba);
        
        var divabaa = $("<input>",
		{
			id: "answer",
            name: "answer",
            type: "text",
            autofocus: "on",
            autocomplete: "off"
		});
        $('#inputAnswerI').append(divabaa);
        
        var divabb = $("<div>",
		{
			id: "submitAnswerI",
            "class": "submitAnswer"
		});
        $('#answerBoxI').append(divabb);
        
        var divabba = $("<button>",
		{
			id: "siguiente",
            "class": "btn"
		});
        $('#submitAnswerI').append(divabba);
        $("#siguiente").html(txtSiguiente);
        
        var divabbb = $("<button>",
		{
			id: "comprobar",
            "class": "btn btn-primary"
		});
        $('#submitAnswerI').append(divabbb);
        $("#comprobar").html(txtComprobar);
        
        var divcl = $("<div>",
		{
			id: "containerLettersI",
            "class": "containerLetters"
		});
        $('#wrapperPasapalabraI').append(divcl);
        
    var divcl = $("<div>", {
        id: "containerLettersI",
        class: "containerLetters"
    });
    $("#wrapperPasapalabraI").append(divcl);

    var divi = $("<div>", {
        id: "innerI",
        class: "inner"
    });
    $("#containerLettersI").append(divi);

    var arrayGrad = [
  '180.0', '167.6', '155.2', '142.8', '130.3',
  '117.9', '105.5', '93.1', '80.7', '68.3',
  '55.9', '43.4', '31.0', '18.6', '6.2',
  '-6.2', '-18.6', '-31.0', '-43.4', '-55.9',
  '-68.3', '-80.7', '-93.1', '-105.5', '-117.9',
  '-130.3', '-142.8', '-155.2', '-167.6'
];

    var letras = ['A','B','C','Ch','D','E','F','G','H','I','J','K','L','Ll','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    for (var i = 0; i < arrayGrad.length; i++) {
        var extra = "";
        if (elementos[i] && elementos[i]['Activa'] == '0') extra = "turnOff";

        var divElemento = $("<div>", {
            id: "circle" + i,
            class: "circle " + extra,
            "data-angle": arrayGrad[i]
        });

        $("#innerI").append(divElemento);
        $("#circle" + i).text(letras[i]);
    }

    var divElementoLet = $("<div>", {
        id: "letterSelectI",
        class: "letterSelect"
    }).text(letras[0]);

    $("#innerI").append(divElementoLet);
}
		
        
	
    
    $(window).load(function(e) {
        $("#comprobar").click(comprobarPalabra);
        $("#siguiente").click(function(){
			if(parseInt(elementoActivo)+1 == 29) activaElemento(0);
            else activaElemento(parseInt(elementoActivo)+1);
        });
    		colocarRuleta();
    		colocarTamanoCirculos();
    		colocarLetras();
    		$(".inner").fitText();
    });

    $(window).on("resize", function(event){
    	colocarRuleta();
    	colocarTamanoCirculos();
    	colocarLetras();
    });
    
    function colocarTamanoCirculos() {
    	var tamano = $(".inner").width();
    	tamano = parseInt(tamano * 0.0781);
    	$(".circle").width(tamano);
    	$(".circle").height(tamano);
    }
    
    function colocarRuleta() {
    	var tamano;
    	var margenX = 0;
    	var margenY = 0;
    	if (parseInt($(window).width()) >= 480) {
    		var distanciaX = parseInt($(window).width() * 0.55);
    		var distanciaY = $(window).height() - 100;
	    	if (distanciaX > distanciaY) {
	    		tamano = distanciaY;
	    		var diferencia = distanciaX - tamano;
	    		margenX = parseInt(diferencia / 2);
		    } else {
		    	tamano = distanciaX;
		    	var diferencia = distanciaY - tamano;
		    	margenY = parseInt(diferencia / 2);
		    }
		  } else {
		  	tamano = $(window).width();
		  }
	    $(".inner").width(tamano);
    	$(".inner").height(tamano);   	
    	$(".inner").css('margin-left',margenX);
    	$(".inner").css('margin-top',margenY);
    }

    var colocarLetras = function(){
      !jQuery.easing && (jQuery.easing = {});
      !jQuery.easing.easeOutQuad && (jQuery.easing.easeOutQuad = function( p ) { return 1 - Math.pow( 1 - p, 2 ); });
      
      
      var circleController = {
        create: function( circle ){
          var obj = {
            angle: circle.data('angle'),
            element: circle,
            measure: $('<div />').css('width', 360 * 8 + parseFloat(circle.data('angle'))),
            update: circleController.update,
            reposition: circleController.reposition,
          };
          obj.reposition();
          return obj;
        },
        update: function( angle ){
          this.angle = angle;
          this.reposition();
        },
        reposition: function(){
    	  var sizebox = $(".inner").width() * 0.8;
    	  var sizecircle = $(".circle").width() / 2;
    	  
          var radians = this.angle * Math.PI / 180, radius = sizebox / 2;
          this.element.css({
            marginLeft: (Math.sin( radians ) * radius - sizecircle) + 'px',
            marginTop: (Math.cos( radians ) * radius - sizecircle) + 'px'
          });
        }
      };
      
      var spin = {
        circles: [],
        prep: function( circles ){
          for ( var i=0, circle; i<circles.length; i++ ) {
            this.circles.push(circleController.create($(circles[i])));
          }
        }
      };
      
      
      spin.prep($('.circle'));
    };