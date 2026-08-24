import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Profundidad from './designs/profundidad/Profundidad.jsx'
import Instrumento from './designs/instrumento/Instrumento.jsx'
import Bandera from './designs/bandera/Bandera.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profundidad />} />
        <Route path="/propuestas" element={<Home />} />
        <Route path="/profundidad" element={<Profundidad />} />
        <Route path="/instrumento" element={<Instrumento />} />
        <Route path="/bandera" element={<Bandera />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
