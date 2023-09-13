let dinheiro = parseFloat(prompt("Digite a quantidade inicial de dinheiro"));

do {
let avisoPergunta = prompt("Seu dinheiro atualmente: " + dinheiro + "R$ Escolha uma das opções: " + "\n1. Adicionar dinheiro " + "\n2. Remover dinheiro" + "\n3. Sair");

switch (avisoPergunta) {
    case "adicionar": 
        let adicao = parseFloat(prompt("Quanto gostaria de adicionar?")); 
        dinheiro = adicao + dinheiro;
        break

    case "remover":
        let subtrair = parseFloat(prompt("Quanto gostaria de remover?"));
        dinheiro = dinheiro - subtrair;
        break

    default:
        alert("Processo encerrado")    
}

avisoPergunta = prompt("Agora você tem " + soma + " de dinheiro. Escolha uma das opções" + "\n1. Adicionar" + "\n2. Remover" + "\n3. Sair");

} while(avisoPergunta === "adicionar" || avisoPergunta == "remover");

alert("Processo encerrado2")