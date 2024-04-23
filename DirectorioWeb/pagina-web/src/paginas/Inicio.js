
import React, { useState } from 'react';
import '../hojas-de-estilo/PaginaInicio.css';
import BotonM from '../componentes/BotonM';
import ReporteFormulario from '../componentes/ReporteFormulario';

function Inicio() {  // usuarioID

    const abrirMisPublicaciones = () => {
        //          Abrir mis publicaciones, con la informacion de usuario
    }

    return (
        <div className='form-inicio'>
            <BotonM
                className='boton-vermis-publicaciones'
                texto={'Ver mis publicaciones'}
                handleClick={abrirMisPublicaciones}
            />
            <div className='contenedor-buscar-reportes'>
                <h1>Buscar publicaciones</h1>
                <MatrizReportes
                    className='inicio-matrizreportes'
                />
            </div>
        </div >
    );
}

export default Inicio;