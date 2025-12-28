

function execute() {
    return new Promise((resolve, reject) => {
        console.log('A promise está sendo executada teste 2.')
        setTimeout(() => {
            console.log('Resolvendo a promise.')
            resolve('Resultado resolvido.')
        }, 2000 )
    })
}

const dois = execute()


setTimeout(() => {
    console.log(dois)
}, 1000 )