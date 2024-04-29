import React, { useEffect, useState } from 'react';
import ReporteFormulario from './ReporteFormulario';
import Reporte from './Reporte';
import '../hojas-de-estilo/MatrizReportes.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MatrizReportes({ esUsuario, usrID, mail }) {
    const navigate = useNavigate();
    // esUsuario
    const [reportes, setReportes] = useState([]);

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
    const mostrarTodosUsuario = async () => {
        const data = {
            id_user: usrID
        };

        const response = await axios.post('http://localhost:9000/get/observations', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        setReportes(prevReportes => {
            return response.data.map((observation) => ({
                id: observation.id_observation,
                id_user: observation.id_user,
                id_taxon: observation.id_taxon,
                id_image: observation.id_image,
                Commentary: observation.Commentary,
                Period: observation.Period,
                Latitud: observation.Latitud,
                Longitud: observation.Longitud
            }));
        });
        console.log('MostrarTodosUsuario()');


        // const ejemplo = ['Facebook', 'Instagram', 'YouTube'];
        // setReportes(prevReportes => {
        //     return ejemplo.map((texto, i) => ({
        //         id: prevReportes.length + i,
        //         texto: texto
        //     }));
        // });

    }

    const cargarReportes = () => {
        esUsuario ?
            mostrarTodosUsuario() : mostrarTodos();
    }


    useEffect(() => {
        // cargarReportes();
    }, []);


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

    const mostrarTodos = async () => {
        //AQUI VA LA QUE ES MOSTRAR TODAS

        const response = await axios.post('http://localhost:9000/get/all/observations', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setReportes(prevReportes => {
            return response.data.map((observation) => ({
                id: observation.id_observation,
                id_user: observation.id_user,
                id_taxon: observation.id_taxon,
                id_image: observation.id_image,
                Commentary: observation.Commentary,
                Period: observation.Period,
                Latitud: observation.Latitud,
                Longitud: observation.Longitud
            }));
        });

        console.log('mostrarTodos()');

    }

    // const mostrarCoincidenciasUsuario = (textInput) => {
    //     console.log('mostrarCoincidenciasUsuario()');

    // }

    // const mostrarCoincidencias = (textInput) => {
    //     console.log('mostrarCoincidencias() ');
    // }

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


    // const eliminarTodos = () => {
    //     setReportes([]);
    // }

    const verReporte = id => {
        const reportesActualizados = reportes.map(reporte => {
            if (reporte.id === id) {
                navigate('/publicacion', { state: { usrID: usrID, repID: id, usrMail: mail, fromWhere: esUsuario, observacion: reporte } })
                // Aqui toca mostrar el reporte en la ventana nueva que aun no existe
            }
            return reporte;
        });
        setReportes(reportesActualizados);
    }



    return (
        <>
            {/* <ReporteFormulario
            mostrarTodosUsuario={mostrarTodosUsuario}
            mostrarTodos={mostrarTodos}
            // mostrarCoincidencias={mostrarCoincidencias}
            // mostrarCoincidenciasUsuario={mostrarCoincidenciasUsuario}
            esUsr={esUsuario}
        /> */}
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