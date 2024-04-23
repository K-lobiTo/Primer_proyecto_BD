import React from 'react';
import '../hojas-de-estilo/ComponenteFecha.css'


function ComponenteFecha({ change }) {

    const handleChange = (event) => {
        change(event.target.value);
    }

    return (
        <div className='ContenedorFecha'>
            <input 
                type='datetime-local' 
                className='fecha-input' 
                name='fecha' 
                onChange={handleChange}
            />
        </div>
    );
}

export default ComponenteFecha;