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
        console.log(response.data);
        console.log(response.data.Commentary);

        setReportes(prevReportes => {
            return response.data.map((observation) => ({
                id: observation[0],
                id_user: observation[1],
                id_taxon: observation[2],
                id_image: observation[3],
                Commentary: observation[4],
                Period: observation[5],
                Latitud: observation[6],
                Longitud: observation[7]
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
        console.log('Me cago en chatGPT');
        cargarReportes();
    }, []);

    const mostrarTodos = async () => {
        //AQUI VA LA QUE ES MOSTRAR TODAS

        const response = await axios.post('http://localhost:9000/get/all/observations', {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setReportes(prevReportes => {
            return response.data.map((observation) => ({
                id: observation[0],
                id_user: observation[1],
                id_taxon: observation[2],
                id_image: observation[3],
                Commentary: observation[4],
                Period: observation[5],
                Latitud: observation[6],
                Longitud: observation[7]
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

        console.log(response.value);
        console.log('La mica sirvio');
        const reportesActualizados = reportes.filter(reporte => reporte.id !== id);
        setReportes(reportesActualizados);
    }


    // const eliminarTodos = () => {
    //     setReportes([]);
    // }

    const verReporte = id => {
        console.log(id);
        console.log(usrID);
        const reporteEncontrado = reportes.find(reporte => reporte.id === id);
        if (reporteEncontrado) {
            navigate('/publicacion', {
                state: {
                    usrID: usrID,
                    repID: id,
                    usrMail: mail,
                    fromWhere: esUsuario,
                    observacion: reporteEncontrado
                }
            });
        }
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
                            Commentary={reporte.Commentary}
                            Period={reporte.Period}
                            Latitud={reporte.Latitud}
                            Longitud={reporte.Longitud}
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