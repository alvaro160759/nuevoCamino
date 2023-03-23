import React, {useEffect,useState} from 'react';
import { Appbar } from '../../components/appBar/AppBar';
import {Grid,Button, ListSubheader, List, ListItem, ListItemText} from '@mui/material';
import { Stack } from '@mui/system';
import {Config} from '../../../config.js'
import '../../../App.css';
import Loading from '../../components/loading/loading';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export const Home = () => {
    
  const navigate= useNavigate()
  const salir=()=>{    
    localStorage.clear()    
    window.location.reload()
    navigate(-1)  
  }

  useEffect( () => {          
    
  },[]);  
  
  return (  
    <div>    
      <div>     
      <Appbar nombre={'Modulo de maquinaria'} salir={salir}></Appbar>
      <Loading open={false} label={"Buscando datos"}></Loading>   
      
       
    </div>
  </div>
  )
}
