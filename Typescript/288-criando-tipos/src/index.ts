// Literals são tipos representados por conteúdos específicos
// Variáveis const são automaticamente literals,
// mas variáveis let também podem ser tipadas como literals
let literal: "Hello, World!"
let pi: 3.14159

// Não é possível atribuir nenhum valor a um literal
literal = "Hi, World!"  // produz erro
pi = 3                  // produz erro