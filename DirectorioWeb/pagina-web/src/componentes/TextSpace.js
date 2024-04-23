import React, { useState } from "react";
import '../hojas-de-estilo/TextSpace.css';

function TextSpace({ placeHold, tipo, getInput }) {

    const [input, setInput] = useState('');

    const cambioInput = (event) => {
        setInput(event.target.value);
        getInput(event.target.value);
    };

    return (
        <div className='input-textspace'>
            <input type={tipo} required onChange={cambioInput} autoComplete="off" />
            <label className={input ? 'lleno' : 'vacio'}>{placeHold}</label>
        </div>
    )
};

export default TextSpace;
