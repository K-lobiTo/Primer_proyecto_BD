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
import { useLocation, useNavigate } from 'react-router-dom';

function MenuObservacion() {

  const [fecha, setFecha] = useState('');
  const [texto, setTexto] = useState('');
  const [file, setFile] = useState(null);
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [pais, setPais] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [license, setLicense] = useState('')
  const [taxonValue, setTaxonValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const usrMail = location.state?.usrMail;
  const usrID = location.state?.usrID;

  const format = dateTime => {
    return (dateTime + ':00Z').slice(0, 20);
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (texto !== '' && fecha !== '' && file != null && latitud !== '' &&
      longitud !== '' && nombre !== '' && apellidos !== '' && pais !== '' &&
      direccion !== '' && correo !== '' && license !== '') {
      try {
        const date = format(fecha);
        const data = new FormData();
        data.append('Commentary', texto);
        data.append('Period', date);
        data.append('Image', file);
        data.append('Latitud', latitud);
        data.append('Longitud', longitud);
        data.append('name', nombre);
        data.append('last_name', apellidos);
        data.append('pais', pais);
        data.append('direction', direccion);
        data.append('Mail', correo);
        data.append('id_user', usrID);
        data.append('dato_animal', taxonValue);

        const response = await axios.post('http://localhost:9000/create/observation', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // window.location.href = '/inicio'; //ojo con esto
        navigate('/mispublicaciones', { state: { usrID: usrID, mail: usrMail } })

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
        <TextSpace placeHold={'Valor de taxonomía'} getInput={setTaxonValue} />
        <div className='latitud-longitud'>
          <TextSpace placeHold={'Latitud'} getInput={setLatitud} />
          <div></div>
          <TextSpace placeHold={'Longitud'} getInput={setLongitud} />
        </div>
        <ComponenteTexto change={setTexto} placHold={'  Notas:'} />
        <MenuFotografo
          getLicense={setLicense}
          getNombre={setNombre}
          getApellidos={setApellidos}
          getPais={setPais}
          getDireccion={setDireccion}
          getCorreo={setCorreo}
        />
        <BotonM texto={'Enviar'} handleClick={handleSubmit} />
      </form>
    </div>
  );
}

export default MenuObservacion;
