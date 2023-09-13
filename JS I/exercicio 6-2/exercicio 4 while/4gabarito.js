const nome = prompt("Qual é o seu nome?")
let cidadesVisitadas = ""
let contagemCidade = 0
let pergunta = prompt("Você visitou alguma cidade?")

while (pergunta === "Sim") {
    let cidade = prompt("Qual é o nome da cidade visitada?")
    cidadesVisitadas += " - " + cidade
    contagemCidade ++
    pergunta = prompt("Você visitou alguma outra cidade?")
}

alert (nome + " visitou " + contagemCidade + " cidades, sendo elas: " + cidadesVisitadas)