import Card from "./components/card"
import posterImg from './assets/poster.webp'
import posterImg2 from './assets/poster2.webp'
import posterImg3 from './assets/poster3.png'


function App() {
  

  return (
    <>
      <Card title='Jesus 1' posterImg={posterImg} />
      <Card title='Jesus 2'posterImg={posterImg2}/>
      <Card title='Jesus 3' posterImg={posterImg3}/>
    </>  
  )
}

export default App
