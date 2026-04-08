import { useState } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from '../pages/Home';
import Admin from '../pages/Admin';
import Login  from '../pages/Login';
import PlayerProfile from '../pages/PlayerProfile';
import ProtectedRoute from './ProtectedRoute';
import AllPlayers from '../pages/AllPlayers';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/players" element={<AllPlayers/>}/> 
        <Route path="/player/:id" element={<PlayerProfile />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
