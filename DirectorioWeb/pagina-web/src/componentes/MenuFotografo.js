import React, { useState } from 'react';
import axios from 'axios';
import '../hojas-de-estilo/MenuFotografo.css';
// import Ubicacion from '../componentes/Ubicacion';  //en caso de querer importarlo
import TextSpace from '../componentes/TextSpace';

function MenuFotografo(props) {


    return (
        <div className='menu-fotografo'>
            < form
                className='form-menu-fotografo' >
                <TextSpace placeHold={'Nombre'} tipo={'text'} getInput={props.getNombre} />
                <TextSpace placeHold={'Apellidos'} tipo={'text'} getInput={props.getApellidos} />
                <TextSpace placeHold={'País'} tipo={'text'} getInput={props.getPais} />
                <TextSpace placeHold={'Dirección'} tipo={'text'} getInput={props.getDireccion} />
                <TextSpace placeHold={'Nombre de usuario'} tipo={'text'} getInput={props.getName} />
                <TextSpace placeHold={'Correo Electrónico'} tipo={'text'} getInput={props.getCorreo} />
            </form >
        </div >
    );
}

export default MenuFotografo;