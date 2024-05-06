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
    const [imagen, setImagen] = useState(null);
    const [path, setPath] = useState('');
    console.log(observacion);



    const volverAnterior = () => {
        // navigate(esUsuario ? '/mispublicaciones' : '/inicio', { state: { usrID: usrID, mail: usrMail } });
        navigate('/inicio', { state: { usrID: usrID, usrMail: usrMail } });
    }


    const cargarImagenTaxon = async () => {
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

        // Decodificar la imagen base64 recibida del servidor
        // const imageBuffer = Buffer.from(response.data.Image, 'base64');
        // const imageURL = URL.createObjectURL(new Blob([imageBuffer]));
        // setImagen(imageURL);
        // setPath(response.data.path);
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
            <div className="contenedor-datos-pub" >
                <TextoPerso
                    placeHold={'Path Taxon'}
                    texto={path}
                />
                <TextoPerso
                    placeHold={'Periodo'}
                    texto={observacion.Period}
                />
                <TextoPerso
                    placeHold={'Latitud'}
                    texto={observacion.Latitud}
                />
                <TextoPerso
                    placeHold={'Longitud'}
                    texto={observacion.Longitud}
                />
                <TextoPerso
                    placeHold={'Comentario'}
                    texto={observacion.Commentary}
                />
                {/* <TextoPerso
                placeHold={'nada'}
                texto={'ODIO GENSHIN IMPACT'}
            /> */}
            </div>
            {/* <div className="cont-img-pub">
                <img src={imagen} alt="irrelevante" />
            </div> */}
            <div >
                <Comentarios
                    observacionID={repID}
                    usrID={usrID}
                />
            </div>

        </div >
    );
}

export default Publicacion;