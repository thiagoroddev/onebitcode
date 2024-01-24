const dayjs = require("dayjs")

let aniversarioFornecido = '1994-01-16'

function calcularAniversario(data) {
    let niver = dayjs(data)
    let hoje = dayjs()
    let idade = hoje.diff(niver, 'year')
    let proximoNiver = niver.add(idade + 1, 'year')
    let diasProNiver = proximoNiver.diff(hoje, 'day')

    
    console.log(`Você completa aniversário em: ${niver.format('DD/MM/YYYY')}`)
    console.log(`Estamos atualmente em ${hoje.format('DD/MM/YYYY')}`)
    console.log(`Você tem ${idade} anos`)
    console.log(`Você completa mais um ano de vida em ${proximoNiver.format('DD-MM-YYYY')}`)
    console.log(`Faltam ${diasProNiver} dias para completar mais um ano`)
}

calcularAniversario(aniversarioFornecido)