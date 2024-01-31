// Desestruturando Objetos

const person = {
    name: "Luke",
    job: "Farmer",
    parents: ["Anakin", "Padme"]
}

const name = person.name
const {job, parents} = person

console.log(name, job, parents)

// Dedestruturando Arrays

const [pai, mae]= parents

console.log(pai, mae)

function createUser({name, job, parents}) {
    const id = Math.floor(Math.random()* 9999)
    return {
        id,
        name,
        job,
        parents
        }
    }
 
const luke = createUser(person)

console.log(luke)

