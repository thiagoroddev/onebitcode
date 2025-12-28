function calculeteIMC(weight, height) {
    return new Promise((resolve, reject) => {
        if (weight <= 0 || height <= 0) {
            reject('Peso e altura devem ser maiores que zero.')
        } else {
            const imc = weight / (height * height)
            resolve(imc)
        }
    })

}

function displayIMC(weight, height) {
    calculeteIMC(weight, height)
        .then((imc) => {
            console.log(`Seu IMC é: ${imc.toFixed(2)}`)
            if (imc < 18.5) {
                console.log('Você está abaixo do peso.')
            } else if (imc >= 18.5 && imc <= 24.9) {
                console.log('Seu peso está normal.')}
            else if (imc >= 25 && imc <= 29.9) {
                console.log('Você está com sobrepeso.') 
            }          
            else if (imc >= 30 && imc <= 34.9) {
                console.log('Você está com obesidade grau 1.')
            }           
            else if (imc >= 35 && imc <= 39.9) {
                console.log('Você está com obesidade grau 2.')
            } else {
                console.log('Você está com obesidade grau 3.')
            }
        }).catch((err) => {
            console.log(`Erro: ${err}`)
        })
        console.log(`Calculando o IMC para o peso ${weight} e altura ${height}`) // Será exibido antes do resultado do IMC ou da mensagem de err
}

displayIMC(71, 1.80)
displayIMC(100, 1.60)
displayIMC(82, 1.72)