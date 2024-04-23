import React from 'react';
import '../hojas-de-estilo/ComponenteTexto.css'

function ComponenteTexto({change, placHold, ubic}){
    //const [texto, setTexto] = useState('');

    const handleChange = (event) => {
        // setTexto(event.target.value);
        change(event.target.value);

    }

    return(
        <input 
            className= {ubic?'contenedor-texto-ubicacion' : 'contenedor-texto'}
            id='input-texto'
            type="text"
            name='texto'
            placeholder={placHold}
            onChange={handleChange}
        />
    );
}

export default ComponenteTexto;