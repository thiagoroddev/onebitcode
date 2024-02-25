

let teste = document.createElement('p')

teste.innerHTML = `Parágrafo criado via javascript ${1 + 1}`

document.body.appendChild(teste)

const hello = () => console.log(`Its works! ${1 + 1}`)

hello()