import React, { useState } from 'react';
import axios from 'axios';
import '../hojas-de-estilo/MenuFotografo.css';
// import Ubicacion from '../componentes/Ubicacion';  //en caso de querer importarlo
import TextSpace from '../componentes/TextSpace';
import Select from 'react-select';

function MenuFotografo(props) {

    const licencias = ['CREATIVE COMMONS', 'ROYALTY-FREE EXTENDED LICENSE', 'ENTERPRISE LICENSE', 'PUBLIC DOMAIN', 'COMMERCIAL IMAGE LICENSE', 'RIGHTS MANAGED LICENSE'];
    const handleSelectChange = (e) => {
        props.getLicense(e.value);
    }


    return (
        <div className='menu-fotografo'>
            < form
                // para la imagen se necesita:
                // licencia
                className='form-menu-fotografo' >
                <TextSpace placeHold={'Nombre fotógrafo'} tipo={'text'} getInput={props.getNombre} />
                <TextSpace placeHold={'Apellidos fotógrafo'} tipo={'text'} getInput={props.getApellidos} />
                <TextSpace placeHold={'País fotógrafo'} tipo={'text'} getInput={props.getPais} />
                <TextSpace placeHold={'Dirección fotógrafo'} tipo={'text'} getInput={props.getDireccion} />
                <TextSpace placeHold={'Correo Electrónico fotógrafo'} tipo={'text'} getInput={props.getCorreo} />
                <Select
                    defaultValue={{ label: 'Tipo Licencia', value: '' }}
                    options={licencias.map(lic => ({ label: lic, value: lic }))}
                    onChange={handleSelectChange}
                />
            </form >
        </div >
    );
}

export default MenuFotografo;