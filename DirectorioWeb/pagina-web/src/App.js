import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';  /*Para ir de pagina en pagina*/
import Main from './paginas/Main';
import Login from './paginas/Login';
import Register from './paginas/Register';
// import DeleteBotton from './componentes/DeleteBotton';
import Inicio from './paginas/Inicio';


function App() {

  return (

    <div className="App">
      {/* <div style="width:100%;height:0;padding-bottom:56%;position:relative;"><iframe src="https://giphy.com/embed/3og0IIB0CrEPomHBYs" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cinemagraph-living-stills-3og0IIB0CrEPomHBYs">via GIPHY</a></p> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/inicio' element={<Inicio />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
