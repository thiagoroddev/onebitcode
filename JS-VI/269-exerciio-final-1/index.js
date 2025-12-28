let transactions = []

function createTransactionContainer(id) {
  const container = document.createElement('div')             // Cria uma <div>
  container.classList.add('transaction')                      // Adiciona a classe 'transaction'
  container.id = `transaction-${id}`                          // Define um ID único para a div
  return container                                            // Retorna a <div> criada
}

function createTransactionTitle(name) {
  const title = document.createElement('span')                // Cria um <span>
  title.classList.add('transaction-title')                    // Adiciona classe 'transaction-title'
  title.textContent = name                                    // Define o texto como o nome da transação
  return title                                                // Retorna o <span> criado
}

function createTransactionAmount(amount) {
  const span = document.createElement('span')                 // Cria um <span>
  span.classList.add('transaction-amount')                    // Adiciona classe 'transaction-amount'

  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency',
  })                                                          // Cria formatador de moeda brasileira

  const formatedAmount = formater.format(amount)              // Formata o valor numérico para BRL

  if (amount > 0) {
    span.textContent = `${formatedAmount} C`                  // Exibe valor + "C" (Crédito)
    span.classList.add('transaction-amount','credit')                              // Adiciona classe de crédito
  } else {
    span.textContent = `${formatedAmount} D`                  // Exibe valor + "D" (Débito)
    span.classList.add('transaction-amount','debit')                               // Adiciona classe de débito
  }

  return span                                                 // Retorna o <span> criado
}

function renderTransaction(transaction) {
  const container = createTransactionContainer(transaction.id)    // Cria container da transação
  const title = createTransactionTitle(transaction.name)          // Cria título da transação
  const amount = createTransactionAmount(transaction.amount)      // Cria valor formatado

  document.querySelector('#transactions').append(container)       // Adiciona o container no DOM
  container.append(title, amount)                                 // Adiciona título e valor dentro do container
}

async function fetchTransactions() {
  return await fetch('http://localhost:3000/transactions')    // Busca as transações da API
    .then(res => res.json())                                  // Converte resposta para JSON
}

function updateBalance() {
  const balanceSpan = document.querySelector('#balance')                // Seleciona o span do saldo
  const balance = transactions.reduce((sum, transaction) => sum + transaction.amount, 0) // Soma os valores

  const formater = Intl.NumberFormat('pt-BR', {
    compactDisplay: 'long',
    currency: 'BRL',
    style: 'currency'
  })                                                                    // Formatador de moeda

  balanceSpan.textContent = formater.format(balance)                   // Mostra o saldo total formatado
}

async function setup() {
  const results = await fetchTransactions()            // Busca as transações da API
  transactions.push(...results)                        // Adiciona todas ao array local
  transactions.forEach(renderTransaction)              // Renderiza uma por uma na tela
  updateBalance()                                      // Atualiza o saldo total
}

document.addEventListener('DOMContentLoaded', setup) // Inicia o setup quando o DOM estiver carregado

async function saveTransaction(ev) {
  ev.preventDefault()                                             // Impede o comportamento padrão do form

  const name = document.querySelector('#name').value             // Pega o nome da transação
  const amount = parseFloat(document.querySelector('#amount').value) // Pega o valor como número

  const response = await fetch('http://localhost:3000/transactions', {
    method: 'POST',                                               // Envia uma nova transação
    body: JSON.stringify({ name, amount }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const transaction = await response.json()                       // Recebe a nova transação criada
  transactions.push(transaction)                                  // Adiciona ao array local
  renderTransaction(transaction)                                  // Exibe na tela
  ev.target.reset()                                               // Limpa o formulário
  updateBalance()                                                 // Atualiza o saldo
}


document.querySelector('form').addEventListener('submit', saveTransaction) // Adiciona evento de submit ao formulário

/*Resumo do que o código faz:
Esse código é um gerenciador de transações financeiras simples:

Ao abrir a página, ele carrega todas as transações de um backend local (http://localhost:3000/transactions) e exibe no HTML.

Cada transação possui nome e valor (positivo = crédito, negativo = débito).

O saldo total é calculado somando todos os valores.

O usuário pode adicionar uma nova transação pelo formulário — ela será salva no backend, exibida na tela e o saldo será atualizado automaticamente.

*/

// ...

function createEditTransactionBtn(transaction) {
  const editBtn = document.createElement('button')
  editBtn.classList.add('edit-btn')
  editBtn.textContent = 'Editar'
  editBtn.addEventListener('click', () => {
    document.querySelector('#id').value = transaction.id
    document.querySelector('#name').value = transaction.name
    document.querySelector('#amount').value = transaction.amount
  })
  return editBtn
}

// ...

// ...

// Função assíncrona que salva (cria ou edita) uma transação
async function saveTransaction(ev) {
  // Impede o comportamento padrão do formulário (recarregar a página)
  ev.preventDefault()

  // Pega os valores dos campos do formulário
  const id = document.querySelector('#id').value // campo hidden usado para edição
  const name = document.querySelector('#name').value // nome da transação
  const amount = parseFloat(document.querySelector('#amount').value) // valor da transação convertido para número

  // Se existir um ID, significa que é uma edição de transação
  if (id) {
    // Faz uma requisição PUT para atualizar a transação existente no backend
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, amount }), // envia os dados no corpo da requisição
      headers: {
        'Content-Type': 'application/json' // informa que o conteúdo é JSON
      }
    })

    // Converte a resposta do servidor em JSON (transação atualizada)
    const transaction = await response.json()

    // Encontra o índice da transação atual na lista local
    const indexToRemove = transactions.findIndex((t) => t.id === id)

    // Substitui a transação antiga pela nova na lista local
    transactions.splice(indexToRemove, 1, transaction)

    // Remove a transação antiga da interface (DOM)
    document.querySelector(`#transaction-${id}`).remove()

    // Renderiza a nova transação na tela
    renderTransaction(transaction)

  } else {
    // Se não houver ID, é uma nova transação (criação)

    // Faz uma requisição POST para criar uma nova transação no backend
    const response = await fetch('http://localhost:3000/transactions', {
      method: 'POST',
      body: JSON.stringify({ name, amount }), // envia os dados no corpo da requisição
      headers: {
        'Content-Type': 'application/json' // informa que o conteúdo é JSON
      }
    })

    // Converte a resposta do servidor em JSON (nova transação criada)
    const transaction = await response.json()

    // Adiciona a nova transação à lista local
    transactions.push(transaction)

    // Renderiza a nova transação na tela
    renderTransaction(transaction)
  }

  // Limpa os campos do formulário
  ev.target.reset()

  // Atualiza o saldo total após salvar a transação
  updateBalance()
}


// ...

// ...

// Função que cria e retorna um botão de "Excluir" para uma transação específica
function createDeleteTransactionButton(id) {
  // Cria um elemento <button>
  const deleteBtn = document.createElement('button')

  // Adiciona a classe CSS 'delete-btn' ao botão (útil para estilização)
  deleteBtn.classList.add('delete-btn')

  // Define o texto visível do botão como "Excluir"
  deleteBtn.textContent = 'Excluir'

  // Adiciona um evento de clique ao botão
  deleteBtn.addEventListener('click', async () => {
    // Faz uma requisição DELETE para a API, excluindo a transação no backend
    await fetch(`http://localhost:3000/transactions/${id}`, { method: 'DELETE' })

    // Remove o elemento HTML (a transação) da interface
    deleteBtn.parentElement.remove()

    // Encontra o índice da transação com o ID correspondente no array `transactions`
    const indexToRemove = transactions.findIndex((t) => t.id === id)

    // Remove a transação do array local
    transactions.splice(indexToRemove, 1)

    // Atualiza o saldo total após a exclusão
    updateBalance()
  })

  // Retorna o botão criado para ser adicionado à interface
  return deleteBtn
}


// ...