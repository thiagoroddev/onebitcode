import StatusText from "./components/StatusText"
import Subtitle from "./components/Subtitle"
import Title from "./components/Title"
import style from "./components/styles/App.module.css"

export default function App() {
  return (
    <div className={style.app}>
      <Title />
      <Subtitle />
      <StatusText />
    </div>
  )
}