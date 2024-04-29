import React, { useEffect, useState } from 'react';
import ReporteFormulario from './ReporteFormulario';
import Reporte from './Reporte';
import '../hojas-de-estilo/MatrizReportes.css';
import axios from 'axios';

function MatrizReportes({ esUsuario }) {
    // esUsuario
    const [reportes, setReportes] = useState([]);
    const [ind, setInd] = useState(0);

    // este va a morir
    const agregarReporte = reporte => {
        if (reporte.texto.trim()) {
            reporte.texto = reporte.texto.trim();

            const reportesActualizados = [reporte, ...reportes];
            setReportes(reportesActualizados);
            console.log(reportesActualizados);
        }
    }

    //aqui debe tomar todos los valores de las observaciones del Usuario
    const mostrarTodosUsuario = () => {
        const ejemplo = ['Facebook', 'Instagram', 'YouTube'];

        setReportes(prevReportes => {
            return ejemplo.map((texto, i) => ({
                id: prevReportes.length + i,
                texto: texto
            }));
        });

    }

    // for (let i = 0; i < ejemplo.length; i++) {
    //     const reporteNuevo = {
    //         id: i,
    //         texto: ejemplo[i]
    //     }
    //     agregarReporte(reporteNuevo);
    //     console.log(ejemplo[i], ' indice ', i);
    //     //En este caso agregarReporte deberia encargarse de no meter
    //     //reportes repetidos, mediante el id
    // }
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
    //     console.log(ind);
    // });

    const mostrarTodos = () => {
        console.log('mostrarTodos()');

    }

    const mostrarCoincidenciasUsuario = (textInput) => {
        console.log('mostrarCoincidenciasUsuario()');

    }

    const mostrarCoincidencias = (textInput) => {
        console.log('mostrarCoincidencias() ');

    }

    const eliminarReporte = async (id) => {

        const data = {
            id_observation: id
        }

        const response = await axios.post('http://localhost:9000/delete/observation', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('La mica sirvio');
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
                // agregarReporte={agregarReporte}
                // eliminarTodos={eliminarTodos}
                mostrarTodosUsuario={mostrarTodosUsuario}
                mostrarTodos={mostrarTodos}
                mostrarCoincidencias={mostrarCoincidencias}
                mostrarCoincidenciasUsuario={mostrarCoincidenciasUsuario}
                esUsr={esUsuario}
            />
            <div className='reportes-matriz-contenedor'>
                {
                    reportes.map((reporte) =>
                        <Reporte
                            key={reporte.id}
                            id={reporte.id}
                            texto={reporte.texto}
                            verReporte={verReporte}
                            esUsuario={esUsuario}
                            eliminarReporte={eliminarReporte} />
                    )
                }
            </div>
        </>
    );
}

export default MatrizReportes;