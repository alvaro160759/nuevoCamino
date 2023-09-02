import React, { useEffect } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Home } from './pages/home/Home';
import MenuAppBar from './components/appBar/AppBar';
import { useAuth } from './hooks/useAuth';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import Login from './pages/login/Login';
import Conductores from './pages/conductores/conductores';

function App() {

  const { isLoggedIn } = useAuth();
  
  return (
      <>
          {isLoggedIn && <MenuAppBar/>}
        <Routes>
        <Route path="/Login" element={<Login/>}/>
            <Route element = {<RequireAuth/>}>
              <Route path="/" element={<Home />}/>
              <Route path="/conductores" element={<Conductores />}/>
            </Route>
        </Routes>
      </>
  )
}

export default App
