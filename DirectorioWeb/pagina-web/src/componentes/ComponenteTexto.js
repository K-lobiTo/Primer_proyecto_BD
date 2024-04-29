import React from 'react';
import '../hojas-de-estilo/ComponenteTexto.css'

function ComponenteTexto({ change, placHold }) {
    //const [texto, setTexto] = useState('');

    const handleChange = (event) => {
        // setTexto(event.target.value);
        change(event.target.value);

    }

    return (
        <textarea
            className='contenedor-texto'
            id='input-texto'
            name='texto'
            placeholder={placHold}
            onChange={handleChange}
        />
    );
}

export default ComponenteTexto;