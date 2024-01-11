var numeros = [1, 2, 3, 4, 5, 6];

function calcularMediana(numeros) {
    numeros.sort(function(a, b){return a-b});
    var metade = Math.floor(numeros.length / 2);

    if (numeros.length % 2)
        return numeros[metade];
    else
        return (numeros[metade - 1] + numeros[metade]) / 2.0;
}

console.log(calcularMediana(numeros))