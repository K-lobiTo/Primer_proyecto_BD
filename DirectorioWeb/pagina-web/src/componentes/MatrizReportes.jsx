import React, { useState } from 'react';
import ReporteFormulario from './ReporteFormulario';
import Reporte from './Reporte';
import '../hojas-de-estilo/MatrizReportes.css';

function MatrizReportes() {
    // esUsuario
    const [reportes, setReportes] = useState([]);
    const [ind, setInd] = useState(0);

    // este va a morir
    const agregarReporte = reporte => {
        if (reporte.texto.trim()) {
            reporte.texto = reporte.texto.trim();

            const reportesActualizados = [reporte, ...reportes];
            setReportes(reportesActualizados);
        }
    }

    const mostrarTodosUsuario = () => {
        //aqui debe tomar todos los valores de las observaciones del Usuario
        const ejemplo = ['Facebook', 'Instagram', 'YouTube'];

        // ejemplo.map(item => {
        //     console.log(item);
        // });
        // ejemplo.map(tex => {
        //     const reporteNuevo = {
        //         id: ind,
        //         texto: tex
        //     }
        //     agregarReporte(reporteNuevo);
        //     console.log(tex);
        //     //En este caso agregarReporte deberia encargarse de no meter
        //     //reportes repetidos, mediante el id
        //     setInd(ind + 1);
        // });
    }

    const mostrarTodos = () => {
        console.log('mostrarTodos()');

    }

    const mostrarCoincidenciasUsuario = (textInput) => {
        console.log('mostrarCoincidenciasUsuario()');

    }

    const mostrarCoincidencias = (textInput) => {
        console.log('mostrarCoincidencias() ');

    }

    const eliminarReporte = id => {
        const reportesActualizados = reportes.filter(reporte => reporte.id !== id);
        setReportes(reportesActualizados);
    }


    const eliminarTodos = () => {
        setReportes([]);
    }

    const verReporte = id => {
        const reportesActualizados = reportes.map(reporte => {
            if (reporte.id === id) {
                // Aqui toca mostrar el reporte en la ventana nueva que aun no existe
            }
            return reporte;
        });
        setReportes(reportesActualizados);
    }



    return (
        <>
            <ReporteFormulario
                agregarReporte={agregarReporte}
                eliminarTodos={eliminarTodos}
                mostrarTodosUsuario={mostrarTodosUsuario}
                mostrarTodos={mostrarTodos}
                mostrarCoincidencias={mostrarCoincidencias}
                mostrarCoincidenciasUsuario={mostrarCoincidenciasUsuario}
                mierda={false}
            />
            <div className='reportes-matriz-contenedor'>
                {
                    reportes.map((reporte) =>
                        <Reporte
                            key={reporte.id}
                            id={reporte.id}
                            texto={reporte.texto}
                            verReporte={verReporte}
                            // esUsuario={true}
                            eliminarReporte={eliminarReporte} />
                    )
                }
            </div>
        </>
    );
}

export default MatrizReportes;