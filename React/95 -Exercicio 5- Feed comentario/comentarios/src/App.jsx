
import './App.css'
import { useState } from 'react'

function App() {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (name.trim() === '' || content.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Aqui você pode adicionar a lógica para enviar o comentário

    const newComent = {
      id: Math.floor(Math.random() * 1000), // Gerando um ID aleatório
      name: name,
      content: content,
      date: new Date().toLocaleDateString(),
    }

    console.log(`Nome: ${name}, Comentário: ${content}`)
    console.log(`Comentário adicionado: ${JSON.stringify(newComent)}`);
    setName('');
    setContent('');
    setComments((prevComments) => [newComent, ...prevComments]);
  }
 

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Seção de Comentários</h1>
        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" placeholder="Digite seu nome" required
          value={name} onChange={(ev)=> setName(ev.target.value)}/>
        <label htmlFor="comentario">Comentário:</label>
        <textarea id="comentario" name="comentario" placeholder="Digite seu comentário" cols={30} rows={5} required
          value={content} onChange={(ev) => setContent(ev.target.value)}></textarea>
        <button type="submit">Enviar</button>
      </form>
      <section>
        <h2>Comentários</h2>
        {
          comments.length > 0 ? (
            comments.map((commentario) => (
              <div key={commentario.id}>
                  <h3>{commentario.name}</h3>
                  <span>Em {commentario.date}</span>
                  <p>{commentario.content}</p>
                </div>
            ))
          ) : (
            <p>Nenhum comentário ainda.</p>
          )
        }
      </section>
    </div>
   
  )
}

export default App
