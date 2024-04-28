import React from 'react';
import '../hojas-de-estilo/PaginaMisPublicaciones.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';
// import Select from 'react-select'

function MisPublicaciones() {

    const volverInicio = () => {
        //logica de volver al inicio, conservando el usuario
    }

    const crearPublicacion = () => {
        // aqui lo manda al menu de observacion, y despues de realizar este proceso lo devuelve al inicio
        // idealmente devolveria a esta misma pagina, pero para eso seria necesario actualizar la matriz de
        // mis publicaciones, lo cual es complicado, o no
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
                        texto={' Crear Nueva Publicación '}
                        handleClick={crearPublicacion}
                    />
                </div>
            </div>
            <div className='contenedor-mis-reportes'>
                <h1>Mis publicaciones</h1>
                <MatrizReportes
                    esUsuario={true}
                />
            </div>
        </div >
    );
}

export default MisPublicaciones;