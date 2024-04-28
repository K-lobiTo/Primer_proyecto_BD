
import React from 'react';
import '../hojas-de-estilo/PaginaInicio.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';

function Inicio() {  // usuarioID

    const abrirMisPublicaciones = () => {
        //          Abrir mis publicaciones, con la informacion de usuario
    }

    return (
        <div className='form-inicio'>
            <div className='contenedor-info-usuario'>
                <div className='boton-ver-public'>
                    <BotonM
                        texto={'  Ver mis publicaciones  '}
                        handleClick={abrirMisPublicaciones}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                    <BotonM
                        texto={' Probando '}
                        handleClick={abrirMisPublicaciones}
                    />
                </div>
            </div>
            <div className='contenedor-buscar-reportes'>
                <h1>Buscar publicaciones</h1>
                <MatrizReportes
                    esUsuario={false}
                />
            </div>
        </div >
    );
}

export default Inicio;