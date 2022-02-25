import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from './components/productos/Productos'

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="productos" element={<Productos />} />
        <Route path="categorias" element={<Productos />} />
        <Route path="*" element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);