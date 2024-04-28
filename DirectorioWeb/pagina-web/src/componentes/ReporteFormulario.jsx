import React, { useEffect, useState } from 'react';
import '../hojas-de-estilo/ReporteFormulario.css';


function ReporteFormulario({ mostrarTodosUsuario, mostrarTodos, mostrarCoincidencias, mostrarCoincidenciasUsuario, esUsr }) {
    // const [indice, setIndice] = useState(0); //Esto es temporal para asignar ID unicos
    const [input, setInput] = useState('');

    const manejarCambio = (e) => {

        console.log(input);
        setInput(e.target.value);
    };

    useEffect(() => {
        console.log('este es el useEffect: ', input, esUsr);
        // props.eliminartodos();

        if (input === '') {
            esUsr ?
                mostrarTodosUsuario() : mostrarTodos();
        }
        else {
            esUsr ?
                mostrarCoincidenciasUsuario(input) : mostrarCoincidencias(input);
        }
        // Aqui se pondria que mande a la base de datos a buscar algo similar a los escrito actualmente
    }, [input]);

    // const agregarReportes = (reporteAgregado) => {
    //     // lo que dice el nombre, se crean como 
    //     const reporteNuevo = {
    //         //   Aqui se asignan los valores a enviar a cada Reporte
    //         id: indice,
    //         texto: input
    //         // fecha: reporteAgregado.fecha  // este es un ejemplo

    //         // id y texto como ejemplo, en teoria sacado de la base de datos
    //     };
    //     console.log(indice);
    //     setIndice(indice + 1);
    //     props.agregarReporte(reporteNuevo);
    // }


    const manejarEnvio = e => {
        //Aqui realmente se necesitaria buscar las observaciones 
        // de la bases de datos crearlas y mostrarlas
        // se debe añadir un condicional dependiendo de si se requieren las del usuario, o todas
        e.preventDefault();
        console.log('clickeado');
        console.log(input);

        // const reporteNuevo = props.esUsuario ? {
        //     //   Aqui se asignan los valores a enviar a cada Reporte
        //     id: indice,
        //     texto: input
        //     // id y texto como ejemplo, en teoria sacado de la base de datos
        // } :
        //     {
        //         id: indice,
        //         texto: input
        //     };

        // console.log(indice);
        // setIndice(indice + 1);
        // props.agregarReporte(reporteNuevo);
    }

    return (
        <form
            className='reporte-formulario'
            // onSubmit={manejarEnvio}>      Anterior

            //handleClick
            onSubmit={manejarEnvio}
        >
            {/* Este es el Submit de darle al boton, lo cual no va a existir */}
            <input
                className='reporte-input'
                type='text'
                placeholder='Escribe el nombre de la especie'
                name='texto'
                onChange={manejarCambio} // manejarCambio
            />
            <button className='reporte-boton'>
                Buscar reporte
            </button>
        </form >
    );
}

export default ReporteFormulario;