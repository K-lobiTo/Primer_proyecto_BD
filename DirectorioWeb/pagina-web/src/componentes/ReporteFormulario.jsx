import React, { useState } from 'react';
import '../hojas-de-estilo/ReporteFormulario.css';


function ReporteFormulario(props) {
    let idn = 0;

    const [input, setInput] = useState('');

    const manejarCambio = e => {
        setInput(e.target.value);
        // Aqui se pondria que mande a la base de datos a buscar algo similar a los escrito actualmente
    }

    const manejarEnvio = e => {
        e.preventDefault();

        const reporteNuevo = {
            //   Aqui se asignan los valores a enviar a cada Reporte
            id: idn,
            texto: input
            // id y texto como ejemplo, en teoria sacado de la base de datos
        }
        idn = idn + 1;

        props.onSubmit(reporteNuevo);
    }

    return (
        <form
            className='reporte-formulario'
            onSubmit={manejarEnvio}>
            <input
                className='reporte-input'
                type='text'
                placeholder='Escribe el nombre de la especie'
                name='texto'
                onChange={manejarCambio}
            />
            <button className='reporte-boton'>
                Buscar reporte
            </button>
        </form>
    );
}

export default ReporteFormulario;