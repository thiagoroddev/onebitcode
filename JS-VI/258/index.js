async function funcaoTeste (a, b) {
    if (typeof a!== 'number' || typeof b!=='number') {
        return Promise.reject('ERRRRRROOOOR')
    }
    return a - b
} 

async function funcaoTeste2 (a, b) {
    if (typeof a!== 'number' || typeof b!=='number') {
        return Promise.reject('ERRRRRROOOOR')
    }
    return a + b
} 

const soma = funcaoTeste(50, 33)
const soma2 = funcaoTeste2(50, 33)

Promise.all([funcaoTeste, funcaoTeste2]).then(resultado => {
    console.log(resultado)
}).catch(err => {
    console.log(err)
})




