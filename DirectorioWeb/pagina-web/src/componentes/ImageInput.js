import React from 'react';
//import { useState } from 'react';
import '../hojas-de-estilo/ImageInput.css';

function ImageInput({selected, change}){

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        change(file);
    };

    return(
        <div className='Contenedor-Imagen-Input'>
            <input className='Img-Input'
            type='file'
            onChange={handleImageChange} />
            {selected && (
                <img src={URL.createObjectURL(selected)} 
            alt="Selected"/>)}
        </div>
    );
}

export default ImageInput;
