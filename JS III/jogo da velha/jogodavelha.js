//referencia o botão que dá início ao jogo
let novoJogo = document.getElementById('newGame')

// referencia o nó pai do botão inicar jogo
let playGame = document.getElementById('playGame')

let container = document.getElementById('container')

// Adiciona um ouvinte do evento tipo click ao botão 'Iniciar Jogo'
let jogadorUm, jogadorDois, jogadorDaVez, jogadores, divJogadorUm, divJogadorDois, labelJogadorUm, labelJogadorDois, botaoIniciar, h3JogadorDaVez

novoJogo.addEventListener('click', function(eventoNovoJogo){
    
    //Adiciona o input para o jogador um
    jogadorUm = document.createElement('input')
    jogadorUm.type = 'text'
    jogadorUm.id = 'jogadorUm'
    jogadorUm.name = 'JodagorUm'
    jogadorUm.className = 'jogadores'
    jogadorUm.placeholder = 'Digite o nome 1º do jogador'
   
    
    
    //adiciona label ao input
    labelJogadorUm = document.createElement('label')
    labelJogadorUm.htmlFor = 'jogadorUm'
    labelJogadorUm.innerText = 'Jogador "X": '
    labelJogadorUm.id = 'labelJogadorUm'
    labelJogadorUm.style.color = 'blue'
    
    
    // cria a div pai do input jogador um
    divJogadorUm = document.createElement('div')
    divJogadorUm.id = 'divJogadorUm'
    
    // adiciona o label e input à div
    divJogadorUm.appendChild(labelJogadorUm)
    divJogadorUm.appendChild(jogadorUm)
    
    // adiciona a div ao nó pai
    document.getElementById('playGame').appendChild(divJogadorUm)
    
    
    //Adiciona o input para o jogador dois
    jogadorDois = document.createElement('input')
    jogadorDois.type = 'text'
    jogadorDois.id = 'jogadorDois'
    jogadorDois.name = 'JodagorDois'
    jogadorDois.className = 'jogadores'
    jogadorDois.placeholder = 'Digite o nome do 2º jogador '
    
    
    // adicionar label ao input
    labelJogadorDois = document.createElement('label')
    labelJogadorDois.htmlFor = 'jogadorDois'
    labelJogadorDois.innerText = 'Jogador "O": '
    labelJogadorDois.id = 'labalJogadorDois'
    labelJogadorDois.style.color = 'red'
    
    divJogadorDois = document.createElement('div')
    divJogadorDois.id = 'divJogadorDois'
    
    
    // adiciona o label e input à div pai
    divJogadorDois.appendChild(labelJogadorDois)
    divJogadorDois.appendChild(jogadorDois)
    
    // adiciona a div ao nó pai
    playGame.appendChild(divJogadorDois)
    
    novoJogo.style.display = 'none'
    
    // adicionar o botão iniciar jogo
    botaoIniciar = document.createElement('button')
    botaoIniciar.id = 'iniciar'
    botaoIniciar.innerText = 'Iniciar Jogo'
    
    playGame.appendChild(botaoIniciar)
    
    // Adiciona um ouvinte de evento ao botão "Inicar Jogo"
    
    botaoIniciar.addEventListener('click', function(iniciarJogo){
        if (jogadorUm.value === '' || jogadorDois.value === '') {
            alert('Preencha os nomes dos jogadores!')
        } else { 
            divJogadorUm.style.display = 'none'
            divJogadorDois.style.display = 'none'
            botaoIniciar.style.display = 'none'
            
            //Mostra na tela o jogador da vez
            h3JogadorDaVez = document.createElement('h3')
            h3JogadorDaVez.innerText = 'Agora é a vez do jogador: '
            h3JogadorDaVez.id = 'h3JogadorDaVez'
            
            jogadorDaVez = document.createElement('h2')
            jogadorDaVez.innerText = jogadorUm.value + ' : X'
            jogadorDaVez.id = 'jogadorDaVez'
            
            playGame.append(h3JogadorDaVez, jogadorDaVez)
            
            mudarJogador()
            
            console.log('Jogador 1: ' + jogadorUm.value, ' \n Jogador 2: ' + jogadorDois.value,'\n Jogador da vez: ' + jogadorDaVez.textContent)


            // Adiciona um botão para reiniciar a partida
            botaoReiniciar = document.createElement('button')
            botaoReiniciar.id = 'reiniciar'
            botaoReiniciar.innerText = 'Reiniciar Rodadas'
            botaoReiniciar.addEventListener('click', function(ev){   
                location.reload();
                
            })

            playGame.appendChild(botaoReiniciar)
            
        } 
    }) 
})

// referencia as áreas que serão marcadas com X ou O
let inputQuadrado = document.querySelectorAll('.quadrado')

// Faz as marcações de X ou O no jogo e alterna a vez dos jogadores
let vencedor = '' // O último a jogar
function mudarJogador() {
    console.log(jogadorUm.value, jogadorDois.value, jogadorDaVez.textContent)
    
    
    inputQuadrado.forEach(function(elemento) {
        elemento.addEventListener('click', function() {
            //  Muda o valor do atributo 'value' quando o elemento é clicado
         if (elemento.value === "" && jogadorDaVez.textContent == jogadorUm.value+ ' : X') {
            elemento.value = "X";
            elemento.style.color = 'blue'
            jogadorDaVez.innerText = jogadorDois.value + ' : O'
            jogadorDaVez.style.color = 'red'
            vencedor = jogadorUm.value
            console.log('Caixa ' + elemento.id + ' marcada pelo ' + vencedor)
            elemento.disabled = true
            
        } else if (elemento.value === "" && jogadorDaVez.textContent == jogadorDois.value+ ' : O') {
            elemento.value = "O";
            elemento.style.color = 'red'
            jogadorDaVez.innerText = jogadorUm.value + ' : X'
            jogadorDaVez.style.color = 'blue'
            vencedor = jogadorDois.value
            console.log('Caixa ' + elemento.id + ' marcada pelo ' + vencedor)
            elemento.disabled = true
        }     
            ganhador()
        });
    });
}

// Determina o ganhador
let vitoriasJogador1 = 0
let vitoriasJogador2 = 0
let placarJogador1 = document.getElementById('placar-j1')
let placarJogador2 = document.getElementById('placar-j2')

function ganhador() {
    let A1 = document.getElementById('A1').value
    let A2 = document.getElementById('A2').value
    let A3 = document.getElementById('A3').value
    let B1 = document.getElementById('B1').value
    let B2 = document.getElementById('B2').value
    let B3 = document.getElementById('B3').value
    let C1 = document.getElementById('C1').value
    let C2 = document.getElementById('C2').value
    let C3 = document.getElementById('C3').value
    
    
    if (A1 === 'X' && A2 === 'X' && A3 === 'X' || 
    B1 === 'X' && B2 === 'X' && B3 === 'X' ||
    C1 === 'X' && C2 === 'X' && C3 === 'X' ||
    A1 === 'X' && B1 === 'X' && C1 === 'X' ||
    A2 === 'X' && B2 === 'X' && C2 === 'X' ||
    A3 === 'X' && B3 === 'X' && C3 === 'X' ||
    A1 === 'X' && B2 === 'X' && C3 === 'X' ||
    A3 === 'X' && B2 === 'X' && C1 === 'X') { 
        vitoriasJogador1++
        placarJogador1.innerText = vitoriasJogador1
        inputQuadrado.forEach(function(elemento){
           if (elemento.value === 'X'){
               elemento.style.backgroundColor = 'blue'
               elemento.style.color = 'white'
           }
        })
        alert(`O jogador ${vencedor} ganhou!`);

        setTimeout(function() {
            limpar()
          }, 1000);
        
        
        
    } else if (
        A1 === 'O' && A2 === 'O' && A3 === 'O' || 
        B1 === 'O' && B2 === 'O' && B3 === 'O' ||
        C1 === 'O' && C2 === 'O' && C3 === 'O' ||
        A1 === 'O' && B1 === 'O' && C1 === 'O' ||
        A2 === 'O' && B2 === 'O' && C2 === 'O' ||
        A3 === 'O' && B3 === 'O' && C3 === 'O' ||
        A1 === 'O' && B2 === 'O' && C3 === 'O' ||
        A3 === 'O' && B2 === 'O' && C1 === 'O') { 
            vitoriasJogador2 ++
            placarJogador2.innerText = vitoriasJogador2

            alert(`O jogador ${vencedor} ganhou!`)
            limpar()
            
        } else if (A1 && A2 && A3 && B1 && B2 && B3 && C1 && C2 && C3) { 
            alert('EMPATOU!')
            
            limpar()
        }  
       
    }
    
    
    // Limpa o jogo 
    function limpar() {
        inputQuadrado.forEach(function(elemento) { 
            elemento.value = ''
            elemento.disabled = false
            elemento.style.backgroundColor = 'white'
        })
    }

   
   
    
    
    
    
    
    
    
    
    
    