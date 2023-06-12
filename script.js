const caracteres = new Set(['+','-','x','÷','.','^','-','x','÷']);
const numbers = new Set(['0','00','1','2','3','4','5','6','7','8','9']);

let memoria = 0;
let resultadoFinal;

function escrever(char) {
    let valor = document.getElementById("tela").innerHTML;

    if (valor === '0' && char === '0') return;
    if (valor == resultadoFinal && resultadoFinal != 0 && (char === '.' || numbers.has(char))) {
        document.getElementById("tela").innerHTML = char;
        resultadoFinal = '';
        return;
    }

    if (valor.length > 28) {
        document.getElementById("tela").innerHTML = 'Número Grande';
    }
    else if (valor === NaN || valor === "Infinity" || valor === '0' && char > 0) {
        document.getElementById("tela").innerHTML = char;
        resultadoFinal = '';
    }
    else if (valor === 'Número Grande' && char) return;
    
    else if (verificarOperação(valor[valor.length-1], char)) {
        valor += char;
        document.getElementById("tela").innerHTML = valor;
        resultadoFinal = '';
    }
    else return;
}

function verificarOperação(valor, num) {
    if (numbers.has(num)) return true;
    if (valor === num) return false;
    if (caracteres.has(valor) && caracteres.has(num)) {
        if ((valor === 'x' || valor === '÷' || valor === "^") && num === '-') return true;
        return;
    }
    return true;
}

function limpar() {
    document.getElementById("tela").innerHTML = '0';
}

function apagar() {
    let numero = document.getElementById("tela").innerHTML;

    if (numero === 'Número Grande') limpar();
    else if (numero == resultadoFinal) limpar();
    else {
        numero = numero.substring(0, numero.length -1);
    
        if (numero) document.getElementById("tela").innerHTML = numero;
        else document.getElementById("tela").innerHTML = '0';
    }
}

function calcular() {
    let operacao = document.getElementById("tela").innerHTML;
    operacao = operacao.replace(/÷/g, '/').replace(/x/g, '*').replace(/\^/g, '**');

    let resultado = eval(operacao);

    if (resultado.toString().length > 28) {
        document.getElementById("tela").innerHTML = 'Número Grande';
    }
    else {
        resultadoFinal = resultado;
        document.getElementById("tela").innerHTML = resultado;
    }
}

function memoriaClear() { memoria = 0 }

function memoriaRegister() {
    resultadoFinal = ''+memoria;
    document.getElementById("tela").innerHTML = resultadoFinal;
}

function memoriaPlus() {
    calcular()
    memoria += Number(document.getElementById("tela").innerHTML)
}

function memoriaMinus() {
    calcular();
    memoria -= Number(document.getElementById("tela").innerHTML);
}