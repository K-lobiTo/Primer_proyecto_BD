
import React from 'react';
import '../hojas-de-estilo/PaginaPublicacion.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';
import TextoPerso from '../componentes/TextoPerso';

function Publicacion() {
    const volverAnterior = () => {

    }

    const nada = () => {

    }

    return (
        <div className='form-publicacion'>
            <div className='contenedor-info-usuario'>
                <div className='boton-ver-public'>
                    <BotonM
                        texto={'  Salir  '}
                        handleClick={volverAnterior}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                    <BotonM
                        texto={'    '}
                        handleClick={nada}
                    />
                </div>
            </div>
            <h1>Observación</h1>
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />

        </div >
    );
}

export default Publicacion;