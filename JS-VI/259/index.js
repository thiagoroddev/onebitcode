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

async function execute() {
    try {
        const sumResult = await funcaoTeste(40,42)
        console.log(sumResult)
        const subtractResult = await funcaoTeste2(40,42)
        console.log(subtractResult)
    } catch (err) {
    console.log(err)
}
}

execute()