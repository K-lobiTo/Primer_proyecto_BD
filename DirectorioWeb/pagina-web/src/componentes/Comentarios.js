import React from 'react';
import '../hojas-de-estilo/Comentarios.css';
import TextoPerso from './TextoPerso';

function Comentarios() {

    const comentarios = [
        { id: 123, name: 'Facebook', adress: 'FB Address' },
        { id: 124, name: 'Instagram', adress: 'IG Address' },
        { id: 125, name: 'Youtube', adress: 'YT Address' },
    ]

    return (
        <div className='form-comentarios'>
            <h1>Comentarios</h1>
            <div className='comentarios' >
                {
                    comentarios.map((comment) =>
                        <TextoPerso
                            placeHold={''}
                            texto={''} />
                    )
                }
            </div>
        </div >
    );
}

export default Comentarios;