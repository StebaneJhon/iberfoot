import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../pages/Home';
import Admin from '../pages/Admin';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
