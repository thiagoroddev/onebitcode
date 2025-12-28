function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age) {
            resolve(age > 18)
        } else {
            reject(new Error('Age is required'))
        }
    })
}

function getAge(birthday) {
    return new Promise((resolve, reject) => {
        if (birthday) {
            const birthYear = new Date(birthday).getFullYear()
            const currentYear = new Date().getFullYear( 
            )
            resolve(currentYear - birthYear)
        } else {
            reject(new Error('Birthday is required'))
        }
    })
}

getAge('1995-01-01')
    .then((age) => checkAge(age))
    .then((isAdult) => {
        if (isAdult) {
            console.log('Você é adulto') 
        } else {
            console.log('Você é menor de idade')
        }
    })
    .catch((err) => {
        console.log(err.message) 
    })

