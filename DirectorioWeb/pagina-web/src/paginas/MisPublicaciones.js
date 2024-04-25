import React, { useState } from 'react';
import '../hojas-de-estilo/PaginaMisPublicaciones.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';

function MisPublicaciones() {

    const volverInicio = () => {
        //logica de volver al inicio, conservando el usuario
    }

    return (
        <div className='form-mis-publicaciones'>
            <div className='contenedor-info-usuario'>
                <div className='boton-volver-inicio'>
                    <BotonM
                        texto={'  Volver  '}
                        handleClick={volverInicio}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                    <BotonM
                        texto={' Probando '}
                    />
                </div>
            </div>
            <div className='contenedor-mis-reportes'>
                <h1>Mis publicaciones</h1>
                <MatrizReportes
                    borrable={true}
                />
            </div>
        </div >
    );
}

export default MisPublicaciones;