var CAMPO_HORAS = document.getElementById("txt-horas");
var CAMPO_MINUTOS = document.getElementById("txt-minutos");
var CAMPO_SEGUNDOS = document.getElementById("txt-segundos");
var CAMPO_DECIMAL = document.getElementById("txt-decimal");

var CONVERSAO_HORAS = document.getElementById("lbl-hora-convertida");
var CONVERSAO_MINUTOS = document.getElementById("lbl-minuto-convertido");
var CONVERSAO_SEGUNDOS = document.getElementById("lbl-segundo-convertido");
var CONVERSAO_DECIMAL = document.getElementById("lbl-valor-decimal");

var horas = 0;
var minutos = 0;
var segundos = 0;
var decimal = 0;

function calcularTempo() {
    horas = Number(CAMPO_HORAS.value) + Number(CAMPO_MINUTOS.value / 60) + Number(CAMPO_SEGUNDOS.value / 3600);
    minutos = Number(CAMPO_HORAS.value * 60) + Number(CAMPO_MINUTOS.value) + Number(CAMPO_SEGUNDOS.value / 60);
    segundos = Number(CAMPO_HORAS.value * 3600) + Number(CAMPO_MINUTOS.value * 60) + Number(CAMPO_SEGUNDOS.value);

    converterTempoParaDecimal();
    injetarResultados();
}

function converterTempoParaDecimal() {
    let minutosDecimal = horas / 60;
    let segundosDecimal = horas / 3600;
    let horasDecimal = horas;

    decimal = horasDecimal + minutosDecimal + segundosDecimal;
}

function injetarResultados() {
    CONVERSAO_HORAS.innerText = horas;
    CONVERSAO_MINUTOS.innerText = minutos;
    CONVERSAO_SEGUNDOS.innerText = segundos;
    CONVERSAO_DECIMAL.innerText = decimal;
}

function obterCampos() {
    CAMPO_HORAS = document.getElementById("txt-horas");
    CAMPO_MINUTOS = document.getElementById("txt-minutos");
    CAMPO_SEGUNDOS = document.getElementById("txt-segundos");
    CAMPO_DECIMAL = document.getElementById("txt-decimal");
}

function aoSairCampo() {
    obterCampos();
    // horas = Number(CAMPO_HORAS.value ?? 0);
    calcularTempo();
}