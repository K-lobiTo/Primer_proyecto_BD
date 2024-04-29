import React from 'react';
import '../hojas-de-estilo/Comentarios.css';
import TextoPerso from './TextoPerso';
import { useState } from 'react';
import BotonM from './BotonM';
import axios from 'axios';
import TextSpace from './TextSpace';

function Comentarios({ observacionID }) {
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState('');

    const agregarComentario = comment => {
        if (comment.texto.trim()) {
            comment.name = comment.name;
            comment.texto = comment.texto;

            const comentariosActualizados = [comment, ...comentarios];
            setComentarios(comentariosActualizados);
            console.log(comentariosActualizados);
        }
    }

    // const comentarios = [
    //     { id: 123, name: 'Facebook', adress: 'FB Address' },
    //     { id: 124, name: 'Instagram', adress: 'IG Address' },
    //     { id: 125, name: 'Youtube', adress: 'YT Address' },
    // ]
    const cargarComentarios = async () => {
        const data = {
            id_observation: observacionID
        }

        const response = await axios.post('http://localhost:9000/get/identifications', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
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
                    comentarios.map((comment) =>
                        <TextoPerso
                            placeHold={comment.name}
                            texto={comment.adress} />
                    )
                }
            </div>
        </form>
    );
}

export default Comentarios;