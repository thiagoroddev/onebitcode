class User {
    constructor (fullname, email, password) {
        this.fullname = fullname
        this.email = email
        this.password = password
        this.login = function(email, password) {
            if (email === this.email && password === this.password)  {
                console.log('Login efetuado com sucesso!')
            } else {
                console.log('Email ou senmha inválidos')
            }
        }
    }

}

let newUser = new User('Thiago Silva Rodrigues', 'thiago@gmail.com', 'Thiago22')

console.log(newUser)

newUser.login('thiago@gmail.com', 'Thiago22')

console.log(newUser)