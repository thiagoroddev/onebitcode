import PropTypes from "prop-types";
import { useState } from "react";
import TextInput from "./TextInput";

NewGameForm.proptypes = {
    addGame: PropTypes.func
}


export default function NewGameForm({ addGame }) {
    const [title, setTitle] = useState('');
    const [cover, setCover] = useState('');

    
    const handleSubmit = (event) => {
    event.preventDefault();
    addGame({title, cover});
    setTitle('');
    setCover('');
  }

    return (
        <form onSubmit={handleSubmit}>
        <TextInput
            id="title"
            label="Título do Jogo"
          value={title}
          setValue={setTitle}
        />
        <TextInput
            id="cover"
            label="Capa do Jogo"
          value={cover}
          setValue={setCover}
        />
        <button type="submit">Adicionar à Biblioteca</button>
      </form>

    )
}