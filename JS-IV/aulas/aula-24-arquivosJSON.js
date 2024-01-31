
let jsonString = '{"nome": "John Doe", "idade": 30, "cidade": "Exemploville"}';

// Convertendo a string JSON para um objeto JavaScript
let objeto = JSON.parse(jsonString);

// Agora você pode acessar os valores como propriedades do objeto
console.log(objeto.nome);    // Saída: John Doe
console.log(objeto.idade);   // Saída: 30
console.log(objeto.cidade);  // Saída: Exemploville
console.log(objeto)



let objeto2 = {
    nome: "John Doe",
    idade: 30,
    cidade: "Exemploville"
  };
  
  // Convertendo o objeto JavaScript para uma string JSON
  let jsonString2 = JSON.stringify(objeto2);
  
  console.log(jsonString2);
  // Saída: '{"nome":"John Doe","idade":30,"cidade":"Exemploville"}'
  
  
  