import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';  /*Para ir de pagina en pagina*/
import MenuObservacion from './paginas/MenuObservacion';
import Login from './paginas/Login';
import Register from './paginas/Register';
import Inicio from './paginas/Inicio';
import MisPublicaciones from './paginas/MisPublicaciones';
import Publicacion from './paginas/Publicacion';


function App() {
  console.log('abre Appjs');

  return (

    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/menuobservacion" element={<MenuObservacion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/mispublicaciones' element={<MisPublicaciones />} />
          <Route path='/publicacion' element={<Publicacion />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
