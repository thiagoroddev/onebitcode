const nome = prompt("Qual é o seu nome?")
var seVisitou = prompt("Você já visitou alguma cidade?")
var cidadesVisitadas = []
var quantidadeCidadesVisitadas = 0 



if (seVisitou === "Sim") {
    cidadesVisitadas = prompt('Qual cidade vôce visitou?')
    quantidadeCidadesVisitadas ++  
    var seVisitouMais = prompt ("Você visitou alguma outra cidade?")
    while (seVisitouMais === "Sim") {
        cidadesVisitadas += prompt('Qual cidade você visitou?')
        quantidadeCidadesVisitadas ++
        seVisitouMais = prompt("Você visitou mais cidades?")
    } 

alert(`${nome} visitou ${quantidadeCidadesVisitadas} cidades, sendo elas:`  + cidadesVisitadas)

} else {
    alert(`${nome} visitou ${quantidadeCidadesVisitadas} cidades, sendo elas:` + " " + cidadesVisitadas)
}