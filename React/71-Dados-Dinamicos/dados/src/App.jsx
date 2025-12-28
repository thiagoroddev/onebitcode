
import './App.css'

function App() {
  const tech = "Teste"
  const status = true

  return (
    <div>
      <h1>{tech}: Oi</h1>
      <h2>Testendo 1 + 1 é {1 +1}</h2>
      <h2>Chamando a função de soma com 1 + 1 : {sum(1,1)}</h2>
      <h2>Status: {status ? "On" : "off"}</h2>
      <h2>{true && "Texte"}</h2>
    </div>
)}

export default App

function sum (a, b) {
  return a + b;
}