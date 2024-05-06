import React from 'react';
import '../hojas-de-estilo/Comentarios.css';
import TextoPerso from './TextoPerso';
import { useState, useEffect } from 'react';
import BotonM from './BotonM';
import axios from 'axios';
import TextSpace from './TextSpace';
import { AiOutlineCloseCircle } from "react-icons/ai";

function Comentarios({ usrID, observacionID }) {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');


    /* Debo recibir:
        id_observation
        id_user
        Commentary
    */


    const agregarComentario = async () => {
        if (nuevoComentario.trim()) {
            const data = {
                id_user: usrID,
                id_observation: observacionID,
                Commentary: nuevoComentario
            };
            const response = await axios.post('http://localhost:9000/create/identification', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('impresion de el response de comentario agregado : ', response.data);
            await cargarComentarios();
        }

    }

    // const comentarios = [
    //     { id: 123, name: 'Facebook', adress: 'FB Address' },
    //     { id: 124, name: 'Instagram', adress: 'IG Address' },
    //     { id: 125, name: 'Youtube', adress: 'YT Address' },
    // ]
    const cargarComentarios = async () => {
        // observacionID.preventDeafault();
        const data = {
            id_observation: observacionID
        }

        const response = await axios.post('http://localhost:9000/get/identifications', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        console.log('comentarios   cargados:  ', response.data);

            // const sql = `SELECT Name,Last_name,Mail,JOSHUA.Identificacion.id_user,Commentary,Period,id_identification FROM JOSHUA.Identificacion JOIN JOSHUA.Usuario ON JOSHUA.Identificacion.id_user = JOSHUA.Usuario.id_user JOIN JOSHUA.Persona ON JOSHUA.Usuario.id_persona = JOSHUA.Persona.id_persona WHERE JOSHUA.Identificacion.id_observation = :1`;
        setComentarios(prevComentarios => {
            return response.data.map((comment) => ({

                Name: comment[0],
                Last_name: comment[1],
                id_user: comment[3],
                texto: comment[4],
                id_identification: comment[6]

            }));
        });
        // setReportes(prevReportes => {
        //     return response.data.map((observation) => ({
        //         id: observation[0],
        //         id_user: observation[1],
        //         id_taxon: observation[2],
        //         id_image: observation[3],
        //         Commentary: observation[4],
        //         Period: observation[5],
        //         Latitud: observation[6],
        //         Longitud: observation[7]
        //     }));
        // });
        console.log('arreglo comentarios ',comentarios);
    }

    useEffect(() => {
        const cargarDatos = async () => {
            console.log('cargaComentarios');
            await cargarComentarios();
        };

        cargarDatos();
    }, []);



    const eliminarComentario = async (id_identification) => {

        const data = {
            id_identification: id_identification
        };

        const response = await axios.post('http://localhost:9000/delete/identification', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        const commentsActualizados = comentarios.filter(comentario => comentario.id_identification !== id_identification);
        setComentarios(commentsActualizados);

    }

    return (
        <div className='form-comentarios'>
            <h1>Comentarios</h1>
            <div className='comentario-nuevo'>
                <div className='texto-comentario'>
                    <TextSpace
                        placeHold={''}
                        tipo={'text'}
                        getInput={setNuevoComentario}
                    />
                </div>
                <div className='boton-comentario'>
                    <BotonM
                        texto={'  añadir comentario  '}
                        handleClick={agregarComentario}
                    />
                </div>
            </div>
            <div className='comentarios' >
                {
                    // Name: comment[0],
                    // Last_name: comment[1],
                    // id_user: comment[3],
                    // texto: comment[4],
                    comentarios.map((comment) => 
                        <div className='comentario'
                            key={comment.id_identification}>
                            <div className='comentario-contenedor-iconos'
                                onClick={() => eliminarComentario(comment.id_identification)}>
                                <AiOutlineCloseCircle className='comentario-icono' />
                            </div>
                            <TextoPerso
                                placeHold={comment.Name + ' ' + comment.Last_name}
                                texto={comment.texto} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Comentarios;
