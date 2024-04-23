import React, { useState } from 'react';
import BotonM from '../componentes/BotonM';
import TextSpace from '../componentes/TextSpace';
import '../hojas-de-estilo/PaginaLogin.css';
import axios from 'axios';


function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(userName!=='' && password!==''){
            try {
                const data = {
                    user: userName,
                    password:password
                };
                const response = await axios.post('http://localhost:9000/login', data,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                window.location.href='/inicio';

                console.log('Datos enviados correctamente!', response.data); 
            } catch {
                console.log('Error al enviar datos');
            }
        }
    }

    return (
        <div className='formulario-login'>
            <h1>Inicio de sesión</h1>
            <form /*method='post'*/>
                {/* <div className='username'>
                    <input type='text' required />
                    <label>Nombre de usuario</label>
                </div> */}
                <TextSpace placeHold={'Correo electronico'} tipo={'text'} getInput={setUserName} />
                {/* <div className='contrasena'>
                    <input type='password' required />
                    <label>Contraseña</label>
                </div> */}
                <TextSpace placeHold={'Escriba su contraseña'} tipo={'password'} getInput={setPassword} />
                <div className='recordar'>
                    Olvido su contraseña?
                </div>
                {/* <input
                    type='submit'
                    value={'iniciar'} /> */}
                <BotonM texto={'Ingresar'} handleClick={handleSubmit}/>
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

