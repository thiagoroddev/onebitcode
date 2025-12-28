// async function asyncSum(a, b) {
//     return a + b
// }


// async function asyncSubtract(a, b) {
//     return (a - b)
// }

// const sumResul = asyncSum(50, 33)
// const subtractResult = asyncSubtract(50, 33)

// Promise.all([sumResul, subtractResult]).then(results => {
//     console.log(results)
// }).catch(err=> {
//     console.log
// })

const numbers = [4, 9, 5, 13, 77]

async function asyncSquare(x) {
    return x * x
}

Promise.all(numbers.map(number => asyncSquaresyncSquare(number))).then(squares => {
    console.log(squares)
})