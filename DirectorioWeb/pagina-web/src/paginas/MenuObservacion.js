import React, { useState } from 'react';
import ComponenteFecha from '../componentes/ComponenteFecha';
import ComponenteTexto from '../componentes/ComponenteTexto';
import ImageInput from '../componentes/ImageInput';
import axios from 'axios';
import '../hojas-de-estilo/MenuObservacion.css';
// import Ubicacion from '../componentes/Ubicacion';  //en caso de querer importarlo
import BotonM from '../componentes/BotonM';
import TextSpace from '../componentes/TextSpace';
import MenuFotografo from '../componentes/MenuFotografo';

function MenuObservacion() {

  const [fecha, setFecha] = useState('');
  const [texto, setTexto] = useState('');
  const [file, setFile] = useState(null);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [menuFoto, setMenuFoto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [pais, setPais] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');

  const format = dateTime => {
    return (dateTime + ':00Z').slice(0, 20);
  };

  const abrirMenuFotografo = () => {
    setMenuFoto(true);
    if (texto !== '' && fecha !== '' && file != null && latitud !== '' && longitud !== '') {
      setMenuFoto(true);
    }
    else {
      console.log('Algun dato se encuentra vacio');
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (texto !== '' && fecha !== '' && file != null && latitud !== '' && longitud !== '') {
      try {
        const date = format(fecha);
        const data = new FormData();
        data.append('text', texto);
        data.append('date', date);
        data.append('image', file);

        data.append('latitud', latitud);
        data.append('longitud', longitud);

        const response = await axios.post('http://localhost:9000/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        window.location.href = '/inicio'; //ojo con esto

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
        <div className='latitud-longitud'>
          <TextSpace placeHold={'Latitud'} getInput={setLatitud} />
          <div></div>
          <TextSpace placeHold={'Longitud'} getInput={setLongitud} />
        </div>
        {/* <Ubicacion setLatitud={setLatitud} setLongitud={setLongitud} /> */}
        <ComponenteTexto change={setTexto} placHold={'  Notas:'} />
        <BotonM texto={menuFoto ? 'Enviar' : 'Continuar'} handleClick={menuFoto ? handleSubmit : abrirMenuFotografo} />
      </form>
      {menuFoto ?
        <div className='menu-foto'>
          <MenuFotografo
            getNombre={setNombre}
            getApellidos={setApellidos}
            getPais={setPais}
            getDireccion={setDireccion}
            getCorreo={setCorreo}
          />


        </div>
        :
        ''}
    </div>
  );
}

export default MenuObservacion;
