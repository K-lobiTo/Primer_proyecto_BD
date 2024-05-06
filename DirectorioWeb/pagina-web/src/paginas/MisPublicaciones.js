import React from 'react';
import '../hojas-de-estilo/PaginaMisPublicaciones.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';
import { useLocation, useNavigate } from 'react-router-dom';
import TextoPerso from '../componentes/TextoPerso';
// import Select from 'react-select'

function MisPublicaciones() {
    const navigate = useNavigate();
    const location = useLocation();
    const usrMail = location.state?.usrMail;
    const usrID = location.state?.usrID;


    const volverInicio = () => {
        navigate('/inicio', { state: { usrMail: usrMail, usrID: usrID } })
        //logica de volver al inicio, conservando el usuario
    }

    const crearPublicacion = () => {
        navigate('/menuobservacion', { state: { usrID: usrID, usrMail: usrMail } })
        // la idea es que despues de esto se devuelva aqui mismo, en esta pagina
    }

    return (
        <div className='form-mis-publicaciones'>
            <div className='contenedor-info-usuario'>
                <div className='boton-volver-inicio'>
                    <BotonM
                        texto={'  Volver  '}
                        handleClick={volverInicio}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                    <TextoPerso
                        placeHold={'Correo de Usuario: '}
                        texto={usrMail}
                    />
                    <BotonM
                        texto={' Crear Nueva Publicación '}
                        handleClick={crearPublicacion}
                    />
                </div>
            </div>
            <div className='contenedor-mis-reportes'>
                <h1>Mis publicaciones</h1>
                <MatrizReportes
                    esUsuario={true}
                    usrID={usrID}
                    mail={usrMail}
                />
            </div>
        </div >
    );
}

export default MisPublicaciones;