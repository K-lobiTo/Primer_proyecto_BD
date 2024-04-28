import React from 'react';
import '../hojas-de-estilo/Reporte.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import BotonM from './BotonM';
import TextoPerso from './TextoPerso';

function Reporte({ id, texto, verReporte, eliminarReporte, esUsuario }) { //esUsuario
    return (
        <div className='reporte-contenedor'>
            {esUsuario ? //esUsuario
                <div
                    className='reporte-contenedor-iconos'
                    onClick={() => eliminarReporte(id)}>
                    <AiOutlineCloseCircle className='reporte-icono' />
                </div>
                :
                ''
            }
            <TextoPerso
                placeHold={'Nombre: '}
                texto={texto} />
            <TextoPerso
                placeHold={'Fecha: '}
                texto={texto} />
            <TextoPerso
                placeHold={'Taxonomía: '}
                texto={texto} />
            <TextoPerso
                placeHold={'Especie: '}
                texto={texto} />
            <BotonM
                texto={'Ver publicación'}
                handleClick={verReporte}
            />
        </div>
    );
}

export default Reporte;