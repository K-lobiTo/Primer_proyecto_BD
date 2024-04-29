
import React from 'react';
import '../hojas-de-estilo/PaginaPublicacion.css';
import BotonM from '../componentes/BotonM';
import TextoPerso from '../componentes/TextoPerso';
import { useLocation, useNavigate } from 'react-router-dom';
import Comentarios from '../componentes/Comentarios';


function Publicacion() {
    // navigate('/publicacion', { state: { usrID: usrID, repID: id } })
    const navigate = useNavigate();
    const location = useLocation();
    const repID = location.state?.repID;
    const usrID = location.state?.usrID;
    const usrMail = location.state?.mail;
    const esUsuario = location.state?.fromWhere

    const volverAnterior = () => {
        navigate(esUsuario ? '/mispublicaciones' : '/inicio', { state: { usrID: usrID, mail: usrMail } });
    }


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
            <TextoPerso
                placeHold={'Ave maria'}
                texto={'ODIO GENSHIN IMPACT'}
            />

            <Comentarios
                observacionID={repID}
            />

        </div >
    );
}

export default Publicacion;