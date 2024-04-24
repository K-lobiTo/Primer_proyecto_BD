import React, { useState } from 'react';
import '../hojas-de-estilo/PaginaMisPublicaciones.css';

function MisPublicaciones() {

    const volverInicio = () => {
        //logica de volver al inicio, conservando el usuario
    }

    return (
        <div className='form-mis-publicaciones'>
            <div className='contenedor-info-usuario'>
                <div className='boton-ver-public'>
                    <BotonM
                        texto={'  Volver  '}
                        handleClick={volverInicio}
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
                    borrable={false}
                />
            </div>
        </div >
    );
}

export default MisPublicaciones;