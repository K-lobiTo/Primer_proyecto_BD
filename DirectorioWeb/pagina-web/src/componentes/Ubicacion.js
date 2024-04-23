import React from 'react';
import '../hojas-de-estilo/Ubicacion.css'; //en caso de necesitarlo
import ComponenteTexto from './ComponenteTexto';

function Ubicacion({setLatitud, setLongitud}){

    // const handleLatitud = (event) => {
    //     setLatitud(event.target.value);
    // }

    // const handleLongitud = (event) => {
    //     setLongitud(event.target.value);
    // }
    
    return(
        <div className='contenedor-ubicacion'>
            {/* <h1>Ubicacion:</h1> */}
            <div className='contenedor-latlon'>
                <ComponenteTexto change={setLatitud} placHold={' Latitud'} ubic={true}/>
                <ComponenteTexto change={setLongitud} placHold={' Longitud'} ubic={true}/>
            </div>
        </div>
    );
}




export default Ubicacion;