import React, { useState } from 'react';
import '../hojas-de-estilo/PaginaRegister.css';
import TextSpace from '../componentes/TextSpace';
import BotonM from '../componentes/BotonM';
import axios from 'axios';

function Register() {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [pais, setPais] = useState('');
    const [direccion, setDireccion] = useState('');
    const [userName, setName] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre !== '' && apellidos !== '' && pais !== '' && direccion !== '' && userName !== '' && correo !== '' && password !== '') {
            try {

                const response = await axios.post('http://localhost:9000/register', {
                    name: nombre,
                    last_name: apellidos,
                    country: pais,
                    direction: direccion,
                    user: userName,
                    mail: correo,
                    password: password
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                window.location.href = '/inicio';
                console.log('cae en el try');

                console.log('Datos enviados correctamente!\n', response.data);
            } catch (error) {
                console.log('cae en el catch');
                console.error('Error al enviar datos: ', error);
            }
        } else console.log('Algun dato se encuentra vacio\n');
    }

    return (
        <div className='form-register'>
            <h1>Registro</h1>
            <form /*onSubmit = {handleSubmit}*/>
                <TextSpace placeHold={'Nombre'} tipo={'text'} getInput={setNombre} />
                <TextSpace placeHold={'Apellidos'} tipo={'text'} getInput={setApellidos} />
                <TextSpace placeHold={'País'} tipo={'text'} getInput={setPais} />
                <TextSpace placeHold={'Dirección'} tipo={'text'} getInput={setDireccion} />
                <TextSpace placeHold={'Nombre de usuario'} tipo={'text'} getInput={setName} />
                <TextSpace placeHold={'Correo Electrónico'} tipo={'text'} getInput={setCorreo} />
                <TextSpace placeHold={'Cree una contraseña'} tipo={'password'} getInput={setPassword} />
                <BotonM texto={'Registrarse'} handleClick={handleSubmit} />
            </form>
        </div>
    );
}

export default Register;