var primeiroDigito = Number(0);
var segundoDigito = Number(0);
var cnpj = "11.222.333/0001-"

function injetarDadosTabela(digitos, valorInicialContador, identificacao) {
    let corpoTabela = document.getElementById(identificacao);

    digitos.split("").forEach(digito => {
        let linha = "";

        linha += "<tr>";
        linha += '<td scope="col">' + Number(digito) + '</td>';
        linha += '<td scope="col">' + valorInicialContador + '</td>';
        linha += `<td scope="col">${Number(digito) * valorInicialContador}</td>`;
        linha += "</tr>";

        corpoTabela.innerHTML += linha;
        valorInicialContador--;

        if (valorInicialContador < 2)
            valorInicialContador = 9;
    });
}

function injetarSomaResultados(digitos, valorInicialContador, identificacao, complemento) {
    let html = document.getElementById(identificacao);
    let calculo = "";
    let soma = Number(0);
    let contador = 0;

    digitos.split("").forEach(digito => {
        calculo += Number(digito) * valorInicialContador;
        soma += Number(digito) * valorInicialContador;
        valorInicialContador--;

        if (contador < (digitos.length - 1))
            calculo += " + ";
        else
            calculo += " = " + soma;

        contador++;

        if (valorInicialContador < 2)
            valorInicialContador = 9;
    });

    html.innerText = complemento + calculo;
}

function injetarResultadoModuloOnze(digitos, valorInicialContador, identificacao, complemento) {
    let html = document.getElementById(identificacao);
    let soma = Number(0);
    let digito = "";

    digitos.split("").forEach(digito => {
        soma += Number(digito) * valorInicialContador;
        valorInicialContador--;

        if (valorInicialContador < 2)
            valorInicialContador = 9;
    });

    if (digitos.length === 12) {
        primeiroDigito = (soma % 11);

        if (primeiroDigito < 2)
            primeiroDigito = 0;
        else
            primeiroDigito = 11 - primeiroDigito;

        digito = primeiroDigito;
    } else {
        segundoDigito = (soma % 11);

        if (segundoDigito < 2)
            segundoDigito = 0;
        else
            segundoDigito = 11 - segundoDigito;

        digito = segundoDigito;
    }

    html.innerText += complemento.replace("{S}", soma).replace("{R}", digito);
}

function injetarDigito(injetarPrimeiroDigito, identificacao) {
    let html = document.getElementById(identificacao);

    if (injetarPrimeiroDigito)
        html.innerText += " " + primeiroDigito;
    else
        html.innerText += " " + segundoDigito;
}

function injetarCnpjCompleto() {
    let html = document.getElementById("cnpj");
    html.innerText += " " + cnpj + primeiroDigito + segundoDigito;
}

function obterPrimeiroDigito(cnpj) {
    return cnpj.split("")[12];
}

function obterSegundoDigito(cnpj) {
    return cnpj.split("")[13];
}

function obterDigitos(cnpj) {
    return cnpj.substr(0, 12);
}

function validarDigito(valorInicialContador, digitos, digitoValidador) {
    let resultado = 0;

    digitos.split("").forEach(digito => {
        resultado += Number(digito) * valorInicialContador;
        valorInicialContador--;

        if (valorInicialContador < 2)
            valorInicialContador = 9;
    });

    var resto = resultado % 11;

    if (resto < 2)
        resultado = 0;
    else
        resultado = 11 - resto;

    return resultado == digitoValidador;
}

function validarPrimeiroDigito(digitos, digitoValidador) {
    return validarDigito(5, digitos, digitoValidador);
}

function validarSegundoDigito(digitos, digitoValidador) {
    return validarDigito(6, digitos, digitoValidador);
}

function removerMascara(cnpj) {
    return cnpj.replace(".").replace("/").replace("-");
}

function validar(cnpj) {
    let formatoValido = (cnpj !== null || cnpj !== undefined);

    if (!formatoValido)
        return false;

    cnpj = removerMascara(cnpj);

    var digitosCalculadores = obterDigitos(cnpj);
    var primeiroDigito = obterPrimeiroDigito(cnpj);
    var segundoDigito = obterSegundoDigito(cnpj);

    return validarPrimeiroDigito(digitosCalculadores, primeiroDigito)
        && validarSegundoDigito(digitosCalculadores + primeiroDigito, segundoDigito);
}

function injetarResultadoValidacao() {
    let cnpj = obterCnpj();
    let labelResultado = document.getElementById("lbl-resultado");
    let resultado = "Inválido!";
    let cor = "red";

    if (validar(cnpj)) {
        resultado = "Válido!";
        cor = "green";
    }

    // labelCnpj.innerText = colcoarMascara(cnpj);
    labelResultado.innerText = resultado;
    labelResultado.style.color = cor;
    labelResultado.style.removeProperty("display");
}

function obterCnpj() {
    let cnpj = document.getElementById("txt-cnpj");
    return cnpj.value;
}

function colcoarMascara(cnpj) {
    let cnpjComMascara = "";

    for (let i = 0; i < cnpj.length; i++) {
        if (cnpj[i] !== "." || cnpj[i] !== "/" || cnpj[i] !=="-") {
            switch (i) {
                case 2:
                case 5:
                    cnpjComMascara += ".";
                    break;
                case 8:
                    cnpjComMascara += "/";
                    break;
                case 12:
                    cnpjComMascara += "-";
                    break;
            }
        }

        cnpjComMascara += cnpj[i];
    }

    return cnpjComMascara;
}

function injetarCnpjEm(id) {
    let componente = document.getElementById(id);
    let cnpj = obterCnpj();

    componente.innerText = cnpj;
}