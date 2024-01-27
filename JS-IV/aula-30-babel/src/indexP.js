let numbers;
const average = (...numbers) => {
    const sum = numbers.reduce((accum, num) => accum + num, 0)
    return sum/ numbers.length
}

console.log(`Média Aritmética Simples: ${average(3, 6, 10, 9)}`)


const weightedAverage = (...entries) => {
    const sum = entries.reduce(({ number, weight}) => accum + (number * (weight ?? 1)), 0)
    const weightSum = entries.reduce((accum, entry) => accum + (entry.weight ?? 1), 0)
    return sum / weightSum 
}

console.log(`Média Ponderada: ${weightedAverage(
    { number: 9, weight: 3},
    { number: 7},
    { number: 10, weight: 1},
)} `)

const median = (...numbers) => {
    const orderedNumbers = [...numbers].sort((a, b) => a - b)
    const middle = Math.floor(orderedNumbers.length / 2)
    if (orderedNumbers.length % 2 !== 0) {
        return orderedNumbers[middle]
    } 

    const firstMedian = orderedNumbers[middle - 1]
    const secondMedian = orderedNumbers[middle]
    return average(firstMedian, secondMedian)
}

const mode = (...numbers) => {
    const quantities = numbers.map(num => [
    num,
    numbers.filter(n => num === n).length
    ])
    quantities.sort((a, b)=> b[1] - a[1])
    return quantities
}
console.log(`Moda: ${mode (1, 1, 5, 4, 9, 7, 4, 3, 5, 2, 4,)}`)