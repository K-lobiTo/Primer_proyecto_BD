import React from 'react';
import '../hojas-de-estilo/DeleteBotton.css';


function DeleteBotton(){

    const handleDelete = (event) => {
        //change(event.target.value);
        console.log('Hola mundo!');
    }

    return(

        <div className='DeleteC'>
            <button className='DeleteB' onClick={handleDelete}>
                <img src='../imagenes/Exit.png' alt=''/>
            </button>
            
        </div>
    );
} 

export default DeleteBotton;