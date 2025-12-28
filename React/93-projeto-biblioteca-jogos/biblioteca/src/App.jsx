
import './App.css'
import useGameCollections from './hooks/useGameCollections';
import Game from './Components/Game';
import NewGameForm from './Components/NewGameForm';

function App() {
 const {games, addGame, removeGame} = useGameCollections(); 
  

 

  return (
    <div className="App">
      <h1>Biblioteca de Jogos</h1>
      <NewGameForm addGame={addGame} />
      <div className="games">
        {games.length === 0 && <p>Nenhum jogo adicionado ainda.</p>}
        {games.map((game) => (
          <Game key={game.id}
            title={game.title}
            cover={game.cover}
            onRemove={() => removeGame(game.id)}
          />
        ))}

      </div>

    </div>
  )
}

export default App
