import PropTypes from "prop-types";

TextInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func
}

export default function TextInput({id, label, value, setValue}) {
  return (
  <div className="input">
          <label htmlFor={id}>{label}</label>
          <input 
            type="text"
            id={id}
            name={id} 
            placeholder="Digite o título do jogo"
            value={value}
            onChange={(e) => setValue(e.target.value)} />
        </div>
  );
}