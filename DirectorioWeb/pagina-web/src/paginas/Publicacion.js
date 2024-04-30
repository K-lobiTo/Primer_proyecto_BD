
import React, { useState, useEffect } from "react";
import '../hojas-de-estilo/PaginaPublicacion.css';
import BotonM from '../componentes/BotonM';
import TextoPerso from '../componentes/TextoPerso';
import { useLocation, useNavigate } from 'react-router-dom';
import Comentarios from '../componentes/Comentarios';
import axios from 'axios';


function Publicacion() {
    // navigate('/publicacion', { state: { usrID: usrID, repID: id } })
    const navigate = useNavigate();
    const location = useLocation();
    const repID = location.state?.repID;
    const usrID = location.state?.usrID;
    const usrMail = location.state?.usrMail;
    const esUsuario = location.state?.fromWhere
    const observacion = location.state?.observacion
    const [imagen, setImagen] = useState('');
    const [path, setPath] = useState('');



    const volverAnterior = () => {
        navigate(esUsuario ? '/mispublicaciones' : '/inicio', { state: { usrID: usrID, mail: usrMail } });
    }


    const cargarImagenTaxon = async (e) => {
        e.preventDefault();
        console.log('observacion   ', observacion);
        console.log('usuario  ', usrMail);
        const data = {
            id_taxon: observacion.id_taxon,
            id_image: observacion.id_image  //debe agregarlo caleb
        };
        const response = await axios.post('http://localhost:9000/get/image/taxon', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);


        setImagen(response.data.Image);
        setPath(response.data.path);
    }


    //API
    // const enviar = {
    //     path: path,
    //     Image: c3.rows[0][0].toString('base64'),
    //     Period: c3.rows[0][1],
    //     License: c3.rows[0][2]
    // }
    // res.json(enviar);
    //     console.log(response);
    //     console.log(response.data);

    useEffect(() => {
        cargarImagenTaxon();
    }, [])

    return (
        <div className='form-publicacion'>
            <div className='contenedor-info-usuario'>
                <div className='boton-ver-public'>
                    <BotonM
                        texto={'  Salir  '}
                        handleClick={volverAnterior}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                </div>
            </div>
            <h1>Observación</h1>
            <TextoPerso
                placeHold={'Path Taxon'}
                texto={path}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />

            <Comentarios
                observacionID={repID}
                usrID={usrID}
            />

        </div >
    );
}

export default Publicacion;