import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  /*Para ir de pagina en pagina*/
import Main from './paginas/Main';
import Login from './paginas/Login';
import Register from './paginas/Register';
// import DeleteBotton from './componentes/DeleteBotton';
import Inicio from './paginas/Inicio';
import MisPublicaciones from './paginas/MisPublicaciones';


function App() {
  console.log('abre Appjs');

  return (

    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path='/inicio' element={<Inicio />} /> */}
          <Route path='/mispublicaciones' element={<MisPublicaciones />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
