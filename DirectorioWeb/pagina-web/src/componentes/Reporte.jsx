import React from 'react';
import '../hojas-de-estilo/Reporte.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import BotonM from './BotonM';
import TextoPerso from './TextoPerso';

function Reporte({ id, verReporte, eliminarReporte, esUsuario, Commentary, Period, Latitud, Longitud }) { //esUsuario

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
                placeHold={'Comentario: '}
                texto={Commentary} />
            <TextoPerso
                placeHold={'Periodo: '}
                texto={Period} />
            <TextoPerso
                placeHold={'Latitud: '}
                texto={Latitud} />
            <TextoPerso
                placeHold={'Longitud: '}
                texto={Longitud} />
            <BotonM
                texto={'Ver publicación'}
                handleClick={() => verReporte(id)}
            />
        </div>
    );
}

export default Reporte;