function teste(valor) {
    let soma = 0;
    let vezes3 = 0;
    let multiplicador = valor.toString().length;
    let digitos = [];

    valor.toString().split('').forEach((element) => {
      vezes3 = element ** Number(multiplicador);
      digitos.push(vezes3);
      vezes3 = 0;
    });

    digitos.forEach((element) => {
       soma += element; 
    })
    console.log(soma);
    console.log(digitos);

    if (soma == valor) {
       return true; 
    } else {
       return false;
    }
}

teste(153);