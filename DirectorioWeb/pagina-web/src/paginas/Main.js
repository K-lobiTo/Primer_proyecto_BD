import React, { useState } from 'react';
import ComponenteFecha from '../componentes/ComponenteFecha';
import ComponenteTexto from '../componentes/ComponenteTexto';
import ImageInput from '../componentes/ImageInput';
import axios from 'axios';
import '../hojas-de-estilo/PaginaMain.css';
import Ubicacion from '../componentes/Ubicacion';  //en caso de querer importarlo
import BotonM from '../componentes/BotonM';

function Main() {

  const [fecha, setFecha] = useState('');
  const [texto, setTexto] = useState('');
  const [file, setFile] = useState(null);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');

  const format = dateTime => {
    return (dateTime + ':00Z').slice(0, 20);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    if (texto !== '' && fecha !== '' && file != null && latitud!=='' && longitud!=='') {
      try {
        const date = format(fecha);
        const data = new FormData();
        data.append('text', texto);
        data.append('date', date);
        data.append('image', file);
        
        data.append('latitud',latitud);
        data.append('longitud',longitud);

        const response = await axios.post('http://localhost:9000/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        window.location.href='/inicio'; //ojo con esto

        console.log('Datos enviados correctamente!', response.data);
      } catch (error) {
        console.error('Error al enviar datos: ', error);
      }
    } else console.log('Algun dato se encuentra vacio');
  }

  return (
    <div className='main'>
      <form
        /*method='post'*/ className='form-main'>
        <ImageInput change={setFile} selected={file} />
        <ComponenteFecha change={setFecha} />
        <Ubicacion setLatitud={setLatitud} setLongitud={setLongitud} />
        <ComponenteTexto change={setTexto} placHold={'  Notas:'} ubic={false} />
        <BotonM texto={'Enviar'} handleClick={handleSubmit} />
      </form>
    </div>
  );
}

export default Main;
