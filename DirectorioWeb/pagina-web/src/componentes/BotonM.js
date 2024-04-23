import React from "react";
import '../hojas-de-estilo/BotonM.css';


function BotonM({ texto, handleClick }) {
    return (
        <input
            type='submit'
            value={texto}
            onClick={handleClick}
        />
    )
}



export default BotonM;

