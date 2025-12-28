import styles from './styles.module.css';

export default function Title(props) {
  return (
    <h2 className={styles.name}>{props.children}</h2>
  )
}