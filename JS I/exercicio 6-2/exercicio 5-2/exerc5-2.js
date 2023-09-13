let dinheiroInicial = parseFloat( prompt("Quanto você deseja depositar?" ))
let adicionarOuremover = prompt("Você tem " + dinheiroInicial + " em dinheiro. Escolha uma das opçoes a seguir: \n1. Adicionar \n2. Remover \n3. Sair")
    
    while (adicionarOuremover !== "3") {
    switch (adicionarOuremover) {
        case "1":
            let adicionar = parseFloat(prompt ("Quanto deseja adicionar?"))
            dinheiroInicial += adicionar 
            break

        case "2":
            let subtrair = parseFloat(prompt ("Quanto deseja subtrair?"))
            dinheiroInicial -= subtrair
            alert("Agora você tem " + dinheiroInicial)
            break

        case "3":
            alert("Fim do programa. Seu valor final é " + dinheiroInicial)
            break

        default:
            alert("Error")
            
        }

        adicionarOuremover = prompt("Você tem " + dinheiroInicial + " em dinheiro. Escolha uma das opçoes a seguir: \n1. Adicionar \n2. Remover \n3. Sair")
    }

    alert("Seu dinheiro atual é: " + dinheiroInicial + ". Fim do programa")
    




