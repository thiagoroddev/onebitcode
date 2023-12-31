//referencia o botão que dá início ao jogo
let novoJogo = document.getElementById('newGame')

// referencia o nó pai do botão inicar jogo
let playGame = document.getElementById('playGame')




novoJogo.addEventListener('click', function(){
    //Adiciona o input para o jogador um
    let jogadorUm = document.createElement('input')
    jogadorUm.type = 'text'
    jogadorUm.id = 'jogadorUm'
    jogadorUm.name = 'JodagorUm'
    jogadorUm.className = 'jogadores'
    jogadorUm.placeholder = 'Nome do primeiro jogador'

    //adiciona label ao input
    let labelJogadorUm = document.createElement('label')
    labelJogadorUm.htmlFor = 'jogadorUm'
    labelJogadorUm.innerText = 'Jogador 1: '


    // cria a div pai do input jogador um
    let divJogadorUm = document.createElement('div')
    divJogadorUm.id = 'divJogadorUm'
    
    // adiciona o label e input à div
    divJogadorUm.appendChild(labelJogadorUm)
    divJogadorUm.appendChild(jogadorUm)
    
    // adiciona a div ao nó pai
    document.getElementById('playGame').appendChild(divJogadorUm)


    //Adiciona o input para o jogador dois
    let jogadorDois = document.createElement('input')
    jogadorDois.type = 'text'
    jogadorDois.id = 'jogadorDois'
    jogadorDois.name = 'JodagorDois'
    jogadorDois.className = 'jogadores'
    jogadorDois.placeholder = 'Nome do segundo jogador'

    // adicionar labael ao input
    let labelJogadorDois = document.createElement('label')
    labelJogadorDois.htmlFor = 'jogadorDois'
    labelJogadorDois.innerText = 'Jogador 2: '

    let divJogadorDois = document.createElement('div')
    divJogadorDois.id = 'divJogadorDois'


    // adiciona o label e input à div pai
    divJogadorDois.appendChild(labelJogadorDois)
    divJogadorDois.appendChild(jogadorDois)

    // adiciona a div ao nó pai
    playGame.appendChild(divJogadorDois)

    novoJogo.style.display = 'none'

    // adicionar o botão iniciar jogo
    let botaoIniciar = document.createElement('button')
    botaoIniciar.id = 'iniciar'
    botaoIniciar.innerText = 'Iniciar Jogo'
    
    playGame.appendChild(botaoIniciar)
})

// Marca X 
let inputQuadrado = document.querySelectorAll('.quadrado')

inputQuadrado.forEach(function(elemento) {
    elemento.addEventListener('click', function() {
        // Muda o valor do atributo 'value' quando o elemento é clicado
        elemento.value = "X";
    });
});








