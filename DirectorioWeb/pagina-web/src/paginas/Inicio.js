
import React from 'react';
import '../hojas-de-estilo/PaginaInicio.css';
import BotonM from '../componentes/BotonM';
import MatrizReportes from '../componentes/MatrizReportes';
import TextoPerso from '../componentes/TextoPerso';
import { useLocation, useNavigate } from 'react-router-dom';

function Inicio() {  // usuarioID
    const navigate = useNavigate();
    const location = useLocation();
    const usrMail = location.state?.usrMail;
    const usrID = location.state?.usrID;

    const abrirMisPublicaciones = () => {
        console.log(usrMail);
        navigate('/mispublicaciones', { state: { usrID: usrID, usrMail: usrMail } })

        //          Abrir mis publicaciones, con la informacion de usuario
    }

    // const volverAqui = () => {
    //     navigate('/inicio', { state: { usrMail: usrMail, usrID: usrID } })
    // }

    return (
        <div className='form-inicio'>
            <div className='contenedor-info-usuario'>
                <div className='boton-ver-public'>
                    <BotonM
                        texto={'  Ver mis publicaciones  '}
                        handleClick={abrirMisPublicaciones}
                    />
                </div>
                <div className='informacion-usuario'>
                    {/* Aqui va el perfil de usuario */}
                    <TextoPerso
                        placeHold={'Correo de Usuario: '}
                        texto={usrMail}
                    />
                    {/* <BotonM
                        texto={' Probando '}
                        handleClick={console.log(usrMail)}
                    /> */}
                </div>
            </div>
            <div className='contenedor-buscar-reportes'>
                <h1>Buscar publicaciones</h1>
                <MatrizReportes

                    esUsuario={false}
                    usrID={usrID}
                    mail={usrMail}
                />
            </div>
        </div >
    );
}

export default Inicio;