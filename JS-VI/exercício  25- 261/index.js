function calculeteIMC(weight, height) {
  if (typeof weight !== "number" || typeof height !== "number") {
    return Promisse.reject("Peso e altura devem ser maiores que zero.");
  }
  return weight / (height * weight);
}

async function displayIMC(weight, height) {
  try {
    console.log(`Calculando IMC para o peso ${weight} e altura ${height}...`);

    const result = await calculeteIMC(weight, height);

    console.log(`O resultado do IMC foi de ${result}`);

    if (imc < 18.5) {
      console.log("Você está abaixo do peso.");
    } else if (imc >= 18.5 && imc <= 24.9) {
      console.log("Seu peso está normal.");
    } else if (imc >= 25 && imc <= 29.9) {
      console.log("Você está com sobrepeso.");
    } else if (imc >= 30 && imc <= 34.9) {
      console.log("Você está com obesidade grau 1.");
    } else if (imc >= 35 && imc <= 39.9) {
      console.log("Você está com obesidade grau 2.");
    } else {
      console.log("Você está com obesidade grau 3.");
    }
  } catch (err) {
    console.log(`Erro: ${err}`);
  }
}

displayIMC(71, 1.8);
displayIMC(100, 1.6);
displayIMC(82, 1.72);
