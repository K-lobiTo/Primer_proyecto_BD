
import React from "react";
import '../hojas-de-estilo/TextoPerso.css';

function TextoPerso({ placeHold, texto }) {

    return (
        <div className="contenedor-texto-mostrado">
            <div className="placehold-texto-mostrado">
                {placeHold}
            </div>
            <div className="texto-mostrado">
                {texto}
            </div>
        </div>
    )
};

export default TextoPerso;