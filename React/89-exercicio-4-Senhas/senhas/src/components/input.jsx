

export default function Input(props) {
  return (
    <input 
      type="number"
      id="passwordSize"
      min={4}
      max={64}
      value={props.passwordSize}
      onChange={(ev) => props.setPasswordSize(+ev.target.value)}
    />
  )
}
