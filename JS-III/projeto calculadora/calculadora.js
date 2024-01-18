let body = document.querySelector('body')
let root = document.querySelector(':root')
let visor = document.getElementById('visor')
//let botaoTeclado = document.querySelectorAll('.btn')
let teclasPermetidas = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// torna a calculadora funcional através do teclado
visor.addEventListener("keydown", function (ev) {
   ev.preventDefault()
   if (teclasPermetidas.includes(ev.key)) {
      visor.value += ev.key
      return
   }
   if (ev.key === 'Backspace') {
      visor.value = visor.value.slice(0, -1)
   }
   
   if (ev.key === 'Enter') {
      equal()
   }
}) 

// tornar os botões da tela funcionais
document.querySelectorAll('.btn').forEach(function(botaoApertado){
   botaoApertado.addEventListener('click', function(){
      
      visor.value += botaoApertado.value
      
      // remove o sinal de '=' que aparece na tela desnecessariamente
      if (visor.value.includes('=')) {
         visor.value = visor.value.slice(0, -1) 
      }

      // coloca o foco no input
      visor.focus()

   })
})

// tornar o botão Backspace da tela funcional
document.querySelector('[data-tecla=DEL]').addEventListener('click', function (){
   visor.value = visor.value.slice(0, -1)
})

// torna o botão 'AC' da tela funcional
document.querySelector('[data-tecla=AC').addEventListener('click', function(){
   visor.value = ''
   visor.focus()
})

// torna o botão '=' da tela funcional
function equal() {

   try { // Avalia o código que pode gerar uma exceção

      let result = eval(visor.value)
      visor.value = result

   } catch (error){// Bloco executado se uma exceção for lançada, 'error' contém informações sobre a exceção
      
      visor.style.color = 'rgba(245, 8, 8, 0.516)'
      visor.value += '\nError'

      setTimeout (function() { // remove o alerta de erro
         visor.style.color = 'rgba(8, 0, 0, 0.656)'
         visor.value = visor.value.replace(/\nError/, "");
      },100)
   }
}

// alterna o tema entre claro, escuro e gradiente
function mudarTema() {
   if (body.dataset.tema === "principal") {
      root.style.setProperty('--cor-fundo', 'rgb(255, 255, 255)')
      body.dataset.tema = "claro"

   } else if(body.dataset.tema ==="claro") {
      root.style.setProperty('--cor-fundo', 'rgb(0, 0, 0)')
      body.dataset.tema = "escuro"
      
   } else {
      root.style.setProperty('--cor-fundo', 'linear-gradient( to right,rgb(24, 193, 223),#698281 )')
      body.dataset.tema = "principal"
   }
}

// muda a cor do botão do tema ao ser clicado
function clicado(ev) {
   let botaoTema = ev.currentTarget
   botaoTema.classList.add('clicado')
   setTimeout(function() {
     botaoTema.classList.remove('clicado');
   }, 100); // Remove a classe 'clicado' após 500 milissegundos (0.5 segundos)
  }

// copiar o resultado para a área de transferência
function copiar(ev) {
   var botaoCopiar = ev.currentTarget
   if (botaoCopiar.innerText === 'Copiar Resultado') {
      botaoCopiar.innerText = 'Copiado'
      botaoCopiar.style.color = 'white'
      botaoCopiar.style.fontWeight = 'bolder'
      botaoCopiar.style.border = '1px solid rgba(225, 231, 232, 0.934)'
      navigator.clipboard.writeText(visor.value)
   } 

   // reseta o innerText para o estado original após 3 segundos
   setTimeout(function() {
      botaoCopiar.innerText = 'Copiar Resultado';
      botaoCopiar.style.color = 'black'
      botaoCopiar.style.fontWeight = 'normal'
      botaoCopiar.style.border = 'none'
    }, 3000);
}
     

     
     