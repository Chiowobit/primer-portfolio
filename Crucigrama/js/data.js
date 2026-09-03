// Se declara una variable llamada DatosActividad que contiene un XML completo en formato string.
var DatosActividad = `<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<actividad tipo="CRUCIGRAMA">
    <color_fuente_b>0x000000</color_fuente_b>                <!-- Color del texto en botones -->
    <color_fuente>0xFFFFFF</color_fuente>                    <!-- Color del texto principal -->
    <color_fondo>0x7f39b1</color_fondo>                      <!-- Color del fondo general -->
    <color_botones>0xff8a00</color_botones>                  <!-- Color de los botones -->
    <color_fondo_h>0x7f39b1</color_fondo_h>                  <!-- Color del fondo cuando hay hover -->
    <color_botones_h>0xFCA800</color_botones_h>              <!-- Color de botones en hover -->
    <logoPersonalizado>no</logoPersonalizado>                <!-- Indica si hay logo personalizado -->
    <franjaPersonalizada>no</franjaPersonalizada>            <!-- Indica si hay franja personalizada -->
    <autor>Hora de aventuras</autor>                       <!-- Autor de la actividad -->
    <descripcionUsuario>Hora de aventuras</descripcionUsuario>          <!-- Descripción visible -->
    <descripcionUsuarioLimpio>Hora de aventuras</descripcionUsuarioLimpio> <!-- Descripción sin formato -->
    <origen_recursos>cdn/</origen_recursos>                  <!-- Ruta base de recursos -->
    <ocultar_reiniciar>0</ocultar_reiniciar>                 <!-- Mostrar botón reiniciar -->
    <ocultar_respuestas>0</ocultar_respuestas>               <!-- Mostrar respuestas -->
    <ocultar_redes>0</ocultar_redes>                         <!-- Mostrar botones sociales -->

    <registro>                                               <!-- Configuración de registro SCORM -->
        <tipo>scorm</tipo>                                   <!-- Tipo de registro -->
        <url></url>                                          <!-- URL de envío -->
        <token></token>                                      <!-- Token de autenticación -->
        <parametros>                                         <!-- Parámetros enviados -->
            <parametro id="1">
                <nombre>score</nombre>                       <!-- Nombre del parámetro -->
                <valor>SCORE</valor>                         <!-- Valor dinámico -->
            </parametro>
            <parametro id="2">
                <nombre>time</nombre>                        <!-- Tiempo empleado -->
                <valor>TIME</valor>
            </parametro>
        </parametros>
    </registro>

    <titulo>Instrucciones</titulo>                           <!-- Título principal -->
    <enunciado>Crucigrama Hora de aventuras</enunciado>                        <!-- Nombre de la actividad -->
    <enunciado_edu>Crucigrama Hora de aventuras</enunciado_edu>                <!-- Nombre educativo -->
    <tiempo maximo="0">no</tiempo>                           <!-- Tiempo máximo -->
    <globalFeedback>1</globalFeedback>                       <!-- Activar feedback global -->

    <descripcion>                                            <!-- Texto explicativo -->
"Intenta adivinar la palabra en cuestión..."
    </descripcion>

    <numero_filas>12</numero_filas>                          <!-- Filas del crucigrama -->
    <numero_columnas>13</numero_columnas>                    <!-- Columnas del crucigrama -->
    <botonesOcultos>0</botonesOcultos>                       <!-- Mostrar botones -->

    <palabras>                                               <!-- Lista de palabras -->
        <palabra>
            <valor>SIMON</valor>                         <!-- Palabra -->
            <tipo>texto</tipo>                               <!-- Tipo -->
            <definicion>Nombre del rey hielo</definicion>            <!-- Definición -->
            <fila>0</fila>                                   <!-- Fila inicial -->
            <columna>2</columna>                             <!-- Columna inicial -->
            <direccion>V</direccion>                         <!-- Vertical -->
            <feedback></feedback>                            <!-- Feedback -->
        </palabra>

        <palabra>
            <valor>FINN</valor>
            <tipo>texto</tipo>
            <definicion>Héroe del reino de OOO</definicion>
            <fila>1</fila>
            <columna>1</columna>
            <direccion>H</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>GUNTER</valor>
            <tipo>texto</tipo>
            <definicion>Pingüino del rey hielo</definicion>
            <fila>4</fila>
            <columna>0</columna>
            <direccion>H</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>RICARDIO</valor>
            <tipo>texto</tipo>
            <definicion>Corazón del rey hielo</definicion>
            <fila>4</fila>
            <columna>5</columna>
            <direccion>V</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>MARCELINE</valor>
            <tipo>texto</tipo>
            <definicion>Vampiresa del reino de OOO</definicion>
            <fila>7</fila>
            <columna>4</columna>
            <direccion>H</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>PRISMO</valor>
            <tipo>texto</tipo>
            <definicion>Personaje con forma de sombra rosa</definicion>
            <fila>10</fila>
            <columna>3</columna>
            <direccion>H</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>BONNIE</valor>
            <tipo>texto</tipo>
            <definicion>Nombre de pila de la princesa chicle</definicion>
            <fila>2</fila>
            <columna>8</columna>
            <direccion>V</direccion>
            <feedback></feedback>

        </palabra>
                <palabra>
            <valor>BILLY</valor>
            <tipo>texto</tipo>
            <definicion>Héroe legendario del reino</definicion>
            <fila>2</fila>
            <columna>8</columna>
            <direccion>H</direccion>
            <feedback></feedback>
        </palabra>

        <palabra>
            <valor>JAKE</valor>
            <tipo>texto</tipo>
            <definicion>Perro del protagonista</definicion>
            <fila>4</fila>
            <columna>12</columna>
            <direccion>V</direccion>
            <feedback></feedback>
        </palabra>
    </palabras>

    <idioma>                                                  <!-- Textos de interfaz -->
        <instrucciones>Instrucciones</instrucciones>
        <txtPuntos>Puntos</txtPuntos>
        <txtTiempo>Tiempo</txtTiempo>
        <txtTiempoRestante>Tiempo Restante</txtTiempoRestante>
        <comprobar>Comprobar</comprobar>
        <txtRespuestaIncorrecta>Respuesta Incorrecta</txtRespuestaIncorrecta>
        <txtActNoSuperada>Actividad no superada</txtActNoSuperada>
        <txtTiempoSuperado>Has superado el tiempo máximo...</txtTiempoSuperado>
        <txtCerrar>Cerrar</txtCerrar>
        <txtTituloRespuestaCorrecta>Respuesta correcta</txtTituloRespuestaCorrecta>
        <txtBoxRespuestaCorrecta>Enhorabuena...</txtBoxRespuestaCorrecta>
        <txtRespuestaCorrecta>Enhorabuena...</txtRespuestaCorrecta>
        <nIntentos>Num. Intentos</nIntentos>
        <txtSuperadoNumeroIntentos>Has superado...</txtSuperadoNumeroIntentos>
        <txtActividadNoSuperada>No has superado...</txtActividadNoSuperada>
        <txtPedirPistaPalabra>Pista Palabra</txtPedirPistaPalabra>
        <txtPedirPistaLetra>Pista Letra</txtPedirPistaLetra>
        <txtDefinicionAudio>Escucha la definición</txtDefinicionAudio>
        <txtTituloDefinicion>Definición</txtTituloDefinicion>
        <txtTituloErrorImagen>Error en la Actividad</txtTituloErrorImagen>
        <txtErrorImagen>Imagen no encontrada...</txtErrorImagen>
        <txtTituloErrorAudio>Error en la Actividad</txtTituloErrorAudio>
        <txtErrorAudio>Audio no encontrado...</txtErrorAudio>
        <txtErrorAudioSoportado>Audio no soportado...</txtErrorAudioSoportado>
        <txtAceptar>Aceptar</txtAceptar>
        <txtTiempoMaximo>Tiempo máximo</txtTiempoMaximo>
        <txtSensible>Sensible</txtSensible>
        <txtMayusculasMinusculas>Mayúsculas/Minúsculas</txtMayusculasMinusculas>
        <txtAcentos>Acentos</txtAcentos>
        <txtComenzar>Comenzar</txtComenzar>
        <txtAutor>Nivel</txtAutor>
        <txtAyuda>Ayuda</txtAyuda>
        <txtMostrarMas>Mostrar más</txtMostrarMas>
        <txtMostrarMenos>Mostrar menos</txtMostrarMenos>
        <txtReiniciar>Reiniciar</txtReiniciar>
        <txtVolverJugar>Volver a jugar</txtVolverJugar>
        <txtResponder>Responder</txtResponder>
        <txtRegistrarse>Registrarse</txtRegistrarse>
        <txtAcceder>Acceder</txtAcceder>
        <txtCompartirResultado>Compartir resultado</txtCompartirResultado>
        <txtAumentar>Aumentar</txtAumentar>
        <txtReducir>Reducir</txtReducir>
        <txtPantallaCompleta>Pantalla completa</txtPantallaCompleta>
        <txtImprimir>Imprimir</txtImprimir>
        <txtInfoAdicional>Contiene información adicional</txtInfoAdicional>
        <txtHorizontales>Horizontales</txtHorizontales>
        <txtVerticales>Verticales</txtVerticales>
        <txtSocial>He obtenido [puntuacion]...</txtSocial>
    </idioma>
</actividad>`;
