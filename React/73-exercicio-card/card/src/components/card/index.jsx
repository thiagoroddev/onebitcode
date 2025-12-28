import styles from './styles.module.css'
import Button from '../Button'

export default function Card(props) {
    return (
    <div className={styles.container}>
        <img className={styles.poster} src={props.posterImg} alt="Jesus" />
        <div>
            <h2>{props.title}</h2>
            <p>Um pôster decorativo épico do filme Jeus, com moldura MDF e tamanho A3</p>
            <Button />
        </div>
    </div>
    )
}