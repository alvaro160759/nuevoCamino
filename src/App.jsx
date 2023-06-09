import React, { useEffect } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import { HomeMaquinariaPropia } from './pages/home/HomeMaquinariaPropia'
import { NuevoParteMaquinaria } from './pages/parteMaquinaria/NuevoParteMaquinaria'
import { EnviarParteMaquinaria } from './pages/parteMaquinaria/EnviarParteMaquinaria'
import { EditarParteMaquinaria } from './pages/parteMaquinaria/EditarParteMaquinaria'
import { ListarPartesEnviados } from './pages/listarPartesEnviados/ListarPartesEnviados'
import useAppUtility from './hooks/useAppUtility'

function App() {

  const navigate = useNavigate();
  const { checkUpdate } = useAppUtility();
  useEffect(()=>{
    
    checkUpdate();
    
    const fnBackButton = (e) => {
      const hash = window.location.hash;
      console.log(hash)
      if (hash === "#/" || hash === "#"||hash === "" ){
        window.navigator.app.exitApp();
        return false;
      }else if(hash === "#/home" ){
        window.plugins.appMinimize.minimize();
      }

      navigate(-1);
    };
    
    document.addEventListener('backbutton', fnBackButton, false);
    return ()=>{
      document.removeEventListener("backbutton", fnBackButton, false);
    }
  }, []);

  return (
      <div>

      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<HomeMaquinariaPropia/>}/>
        <Route path="/nuevoParte" element={<NuevoParteMaquinaria/>}/>
        <Route path="/enviarParte/:id" element={<EnviarParteMaquinaria/>}/>
        <Route path="/editarParte/:id" element={<EditarParteMaquinaria/>}/>
        <Route path="/listarEnviados" element={<ListarPartesEnviados/>}/>
      </Routes>

      </div>
  )
}

export default App
