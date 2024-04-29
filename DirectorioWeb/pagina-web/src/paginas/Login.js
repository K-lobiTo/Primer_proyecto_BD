import React, { useState } from 'react';
import BotonM from '../componentes/BotonM';
import TextSpace from '../componentes/TextSpace';
import '../hojas-de-estilo/PaginaLogin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mail !== '' && password !== '') {
            try {
                //console.log(mail);
                //console.log(password);
                //navigate('/inicio', { state: { usrMail: mail.trim() } }) //creo que esto debe ir al final
                const data = {
                    mail: mail,
                    password: password
                };
                const response = await axios.post('http://localhost:9000/login', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // window.location.href = '/inicio';
                if (response.data == 'Error1') {
                    alert('El usuario ingresado no existe');
                }
                else if (response.data == 'Error2') {
                    alert('XD gg');
                }
                else {
                    navigate('/inicio', { state: { usrMail: mail.trim() } })
                    console.log('Datos enviados correctamente!', response.data);
                }

            } catch {
                console.log('Error al enviar datos');
            }
        }
    }

    return (
        <div className='formulario-login'>
            <h1>Inicio de sesión</h1>
            <form /*method='post'*/>
                <TextSpace placeHold={'Correo electronico'} tipo={'text'} getInput={setMail} />
                <TextSpace placeHold={'Escriba su contraseña'} tipo={'password'} getInput={setPassword} />
                <div className='recordar'>
                    Olvido su contraseña?
                </div>
                <BotonM texto={'Ingresar'} handleClick={handleSubmit} />
                <div className='registarse'>
                    <div className='texto-registarse'>
                        Quiero hacer
                        <a href='/register'> registro</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;

