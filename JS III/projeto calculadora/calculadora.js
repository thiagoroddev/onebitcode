let container = document.getElementById('container')
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
   let result = eval(visor.value)
   visor.value = result
}
     

     
     