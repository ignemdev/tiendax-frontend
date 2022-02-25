import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Container from '@mui/material/Container'

import Navbar from './components/common/Navbar';
import Productos from './components/productos/Productos';
import Categorias from './components/categorias/Categorias';

const Routing = () => {
  return (
    <BrowserRouter >
      <Navbar />
      <Container disableGutters='true' sx={{ p: 3, width: '100%' }}>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="productos" element={<Productos />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>} />
        </Routes>
      </Container>
    </BrowserRouter >
  )
}

ReactDOM.render(
  <React.StrictMode>

    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);