import React from 'react';
import '../hojas-de-estilo/Reporte.css';
// import { AiOutlineCloseCircle } from "react-icons/ai";

function Reporte({ id, texto, verReporte, eliminarReporte }) {
    return (
        <div className='reporte-contenedor'>
            <div
                className='reporte-texto'
                onClick={() => verReporte(id)}>
                {texto}
                {/* pongo texto como ejemplo, pero aqui va lo que podriamos llegar a mostrar, considero que es mejor un componente aparte */}
            </div>
            <div
                className='reporte-contenedor-iconos'
                onClick={() => eliminarReporte(id)}>
                {/* <AiOutlineCloseCircle className='reporte-icono' /> */}
            </div>
        </div>
    );
}

export default Reporte;