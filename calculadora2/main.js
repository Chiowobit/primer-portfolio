let numero = "";
let numero2 = "";
let operador = "";
let parentesisAbierto = false;

const OPERACION = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};

const pantalla = document.querySelector(".contenedor-pantalla");

function aplicarValor(valor) {
    switch (valor) {
        case 0:
            asignarValor(0);
            break;
        case 1:
            asignarValor(1);
            break;
        case 2:
            asignarValor(2);
            break;
        case 3:
            asignarValor(3);
            break;
        case 4:
            asignarValor(4);
            break;
        case 5:
            asignarValor(5);
            break;
        case 6:
            asignarValor(6);
            break;
        case 7:
            asignarValor(7);
            break;
        case 8:
            asignarValor(8);
            break;
        case 9:
            asignarValor(9);
            break;
        case ",":
            asignarDecimal();
            break;
        case "%":
            asignarPorcentaje();
            break;
        case "()":
            asignarParentesis();
            break;
        case "=":
            ejecutarResultado();
            break;
        case "ce":
            borradoCompleto();
            break;
        case "c":
            borradoNumero();
            break;
        default:
            asignarOperador(valor);
            break;
    }
}

function asignarValor(valor) {
    if (!operador) {
        numero = numero + valor;
    } else {
        numero2 = numero2 + valor;
    }

    modificarPantalla(valor);
}

function asignarOperador(valor) {
    if (numero === "") {
        return;
    }
    pantalla.dataset.display = `${numero} ${valor}`;
    operador = valor;
    borrarPantalla();
}

function asignarDecimal() {
    if (!operador) {
        if (numero.includes(".")) {
            return;
        }
        if (numero === "") {
            numero = "0.";
            modificarPantalla("0,");
        } else {
            numero += ".";
            modificarPantalla(",");
        }
        return;
    }

    if (numero2.includes(".")) {
        return;
    }
    if (numero2 === "") {
        numero2 = "0.";
        modificarPantalla("0,");
    } else {
        numero2 += ".";
        modificarPantalla(",");
    }
}

function asignarPorcentaje() {
    if (!operador && numero !== "") {
        numero = (Number(numero) / 100).toString();
        pantallaInput().value = numero.replace(".", ",");
        return;
    }
    if (operador && numero2 !== "") {
        numero2 = (Number(numero2) / 100).toString();
        pantallaInput().value = numero2.replace(".", ",");
    }
}

function asignarParentesis() {
    const pantallaInputElement = pantallaInput();
    if (!parentesisAbierto) {
        pantallaInputElement.value =
            pantallaInputElement.value === "0"
                ? "("
                : pantallaInputElement.value + "(";
        parentesisAbierto = true;
    } else {
        pantallaInputElement.value += ")";
        parentesisAbierto = false;
    }
}

function ejecutarResultado() {
    if (numero2 === "") {
        return;
    }
    if (operador === "/" && Number(numero2) === 0) {
        pantallaInput().value = "Error";
        return;
    }
    const resultado = OPERACION[operador](
        Number(numero),
        Number(numero2)
    );
    borrarPantalla();
    modificarPantalla(resultado);
    numero = resultado.toString();
    numero2 = "";
    operador = "";
    pantalla.dataset.display = "";
}

function borradoNumero() {
    const pantallaInputElement = pantallaInput();
    pantallaInputElement.value =
        pantallaInputElement.value.slice(0, -1);
    if (!operador) {
        numero = numero.slice(0, -1);
    } else {
        numero2 = numero2.slice(0, -1);
    }
    if (pantallaInputElement.value === "") {
        pantallaInputElement.value = "0";
    }
}

function modificarPantalla(valor) {
    const pantallaInputElement = pantallaInput();
    if (pantallaInputElement.value === "0") {
        pantallaInputElement.value = valor;
        return;
    }
    pantallaInputElement.value += valor;
}

function borrarPantalla() {
    const pantallaInputElement = pantallaInput();
    if (pantallaInputElement.value !== "0") {
        pantallaInputElement.value = "0";
    }
}

function borradoCompleto() {
    borrarPantalla();
    numero = "";
    numero2 = "";
    operador = "";
    parentesisAbierto = false;
    pantalla.dataset.display = "";
}

function pantallaInput() {
    return document.getElementById("pantalla");
}