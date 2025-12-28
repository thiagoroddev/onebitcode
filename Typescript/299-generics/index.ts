function first(array) {
    return array[0];
}


function last<Type>(array: Type[]): Type | undefined {
    return array[array.length - 1];
}

const pilots = ['James T. Kirk', 'Jean-Luc Picard', 'Benjamin Sisko', 'Janeway', 'Jonathan Archer']

const firstPilot = first(pilots) // Não sabemos o tipo de firstPilot porque não temos o tipo de array, o typescript não consegue inferir o tipo
const lastPilot = last(pilots)