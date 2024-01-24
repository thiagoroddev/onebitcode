const dayjs = require("dayjs")

function birthday(date) {
  const birthday = dayjs(date)
  const today = dayjs()
  const ageInYears = today.diff(birthday, 'year')
  const nextBirthday = birthday.add(ageInYears + 1, 'year')
  const daysToNextBirthday = nextBirthday.diff(today, 'day') + 1

  console.log(`Idade: ${ageInYears}`)
  console.log(`Próximo aniversário: ${nextBirthday.format('DD/MM/YYYY')}`)
  console.log(`Dias até completar ${ageInYears + 1} anos: ${daysToNextBirthday}`)
}

birthday("1995-09-02")

/* 

Vamos analisar o código linha a linha:

const dayjs = require("dayjs"): Importa a biblioteca dayjs para manipulação de datas. O const é utilizado para declarar uma constante chamada dayjs.

function birthday(date) {: Declaração de uma função chamada birthday que recebe um parâmetro date, representando a data de nascimento.

const birthday = dayjs(date): Cria uma constante chamada birthday que armazena um objeto dayjs representando a data de nascimento passada como argumento para a função.

const today = dayjs(): Cria uma constante chamada today que armazena um objeto dayjs representando a data atual.

const ageInYears = today.diff(birthday, 'year'): Calcula a diferença em anos entre a data de nascimento (birthday) e a data atual (today) e armazena o resultado na constante ageInYears.

const nextBirthday = birthday.add(ageInYears + 1, 'year'): Calcula a data do próximo aniversário somando a idade atual mais 1 ano à data de nascimento e armazena o resultado na constante nextBirthday.

const daysToNextBirthday = nextBirthday.diff(today, 'day') + 1: Calcula a diferença em dias entre a data atual (today) e o próximo aniversário (nextBirthday), e adiciona 1 para incluir o próprio dia do aniversário. O resultado é armazenado na constante daysToNextBirthday.

console.log(Idade: ${ageInYears}): Imprime no console a idade em anos.

console.log(Próximo aniversário: ${nextBirthday.format('DD/MM/YYYY')}): Imprime no console a data do próximo aniversário no formato "DD/MM/YYYY".

console.log(Dias até completar ${ageInYears + 1} anos: ${daysToNextBirthday}): Imprime no console o número de dias restantes até completar a próxima idade (idade atual + 1 ano).

birthday("1995-09-02"): Chama a função birthday passando a data de nascimento "1995-09-02" como argumento.

Resumidamente, este código calcula a idade em anos com base na data de nascimento fornecida, determina a data do próximo aniversário e imprime no console informações como a idade, a data do próximo aniversário e o número de dias restantes até o próximo aniversário.

*/ 