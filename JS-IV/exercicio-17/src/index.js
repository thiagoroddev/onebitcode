const testando = () => console.log(`Testando 1 + 1 é : ${1 + 1}`)

const hello = () => console.log(`It works!`)

function component() {
    const element = document.createElement('div');
  
    element.innerHTML = "Hello"
  
    return element;
  }
  
  document.body.appendChild(component());




hello()

testando()

