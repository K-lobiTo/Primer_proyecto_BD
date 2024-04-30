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
            usrID.preventDefault();
            // observacionID.preventDefault();
            nuevoComentario.preventDefault();
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
            console.log(response.data);
            // await cargarComentarios();
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
        console.log(response.data);

        // setComentarios(prevComentarios => {
        //     // const sql = `SELECT Name,Last_name,Mail,JOSHUA.Identificacion.id_user,Commentary,Period,id_identification FROM JOSHUA.Identificacion JOIN JOSHUA.Usuario ON JOSHUA.Identificacion.id_user = JOSHUA.Usuario.id_user JOIN JOSHUA.Persona ON JOSHUA.Usuario.id_persona = JOSHUA.Persona.id_persona WHERE JOSHUA.Identificacion.id_observation = :1`;
        //     return response.data.map((comment) => ({
        //         Name: comment[0],
        //         Last_name: comment[1],
        //         id_user: comment[3],
        //         texto: comment[4],
        //         id_identification: comment[6]

        //     }));
        // });
    }

    useEffect(() => {
        console.log('cargaComentarios');
        cargarComentarios();
    }, []);



    const eliminarComentario = async (id_identification) => {
        id_identification.preventDefault();

        const data = {
            id_identification: id_identification
        };

        const response = await axios.post('http://localhost:9000/delete/identification', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
    }

    return (
        <form className='form-comentarios'>
            <h1>Comentarios</h1>
            <div className='comentario-nuevo'>
                <div className='texto-comentario'>
                    <TextSpace
                        placeHold={'    Escribe aquí tu comentario'}
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
                    comentarios.map((comment) => {
                        <div className='Comentario'>
                            {usrID === comment.id_user ? //esUsuario
                                <div className='comentario-contenedor-iconos'
                                    onClick={() =>  eliminarComentario( comment.id_identification)}>
                                    <AiOutlineCloseCircle className='comentario-icono' />
                                </div>
                                :
                                ''
                            }
                            <TextoPerso
                                placeHold={comment.Name + ' ' + comment.Last_name}
                                texto={comment.texto} />
                        </div>
                    })
                }
            </div>
        </form>
    );
}

export default Comentarios;
