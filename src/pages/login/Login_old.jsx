import React, {useEffect, useState} from 'react';
import { MenuItem,Button,Select,TextField,Avatar,Snackbar, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import MuiAlert from '@mui/material/Alert';
import LogoCayalti from '/src/assets/img/LogoCayalti.jpg';
import LogoYarabamba from '/src/assets/img/Yarabamba_Logo.jpeg';
import {Config} from '../../../config'
import './Login.css'
import { PasswordField } from '../../components/passwordField/PasswordField';
import Loading from '../../components/loading/loading';
import { HomeMaquinariaPropia } from '../home/HomeMaquinariaPropia';
export const Login_old = (props) => {

  const user=JSON.parse(localStorage.getItem("usuario"))
  const [empresa,setEmpresa]=useState('001');
  const [usuario,setUsuario]=useState('');
  const [password,setPassword]=useState('');  
  const [sesion,setSesion]=useState(user);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [openLoading, setOpenLoading] = useState(false);

  const  navigate=useNavigate();
  const nameApp = import.meta.env.VITE_APP_NAME;

  function selectEmpresa(event) {    
    setEmpresa(event.target.value);
  }
  const Alert = React.forwardRef(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function IniciarSesion(){

        if(usuario==""){    
          setAlert("Ingrese usuario")
          setOpen(true)
          return;
        }

        if(password==""){
          setAlert("Ingrese contraseña")
          setOpen(true)
          return;
        }

        setOpenLoading(true)
        
        
        const formData = new FormData();
        formData.append('empresa', empresa);
        formData.append('modelo', 'Usuario');
        formData.append('metodo', 'IniciarSesion');
        formData.append('data_out[0]', usuario);
        formData.append('data_out[1]', password);  
        
        fetch(Config.URL, {
          body: formData,
          method: "POST"})
          .then(res =>res.json())
          .then(res=>{
            if(res!=false){
              console.log(res)
              localStorage.setItem("empresa",empresa)
              localStorage.setItem("usuario",JSON.stringify(res))
              setOpenLoading(false)
              navigate("/home");
            }else{
              setOpenLoading(false)
              setAlert("usuario o contraseña incorrectos")
            }
          }
          )
          .catch(() => {            
            setOpen(true), 
            setOpenLoading(false),
            setAlert("Fallo con el servidor")
          })   
  };


  return ( 
    
    <div>
      {user? <HomeMaquinariaPropia/>: 
      <div className='body'>           
      <div className='cabecera'>
      <Button variant="outlined" size = "small" color="success" sx={{position: "absolute", top: '12px', right:'12px', fontWeight: "bold"}} onClick={()=>console.log("sincronizar")}>SINCRONIZAR</Button>
            <Typography component="h1" variant="h5">
              <strong> { nameApp }</strong>
            </Typography>
        
        <div className='imagen'>
        {empresa=="001" &&<Avatar src={LogoCayalti} sx={{ width: 200, height: 200}}/>}
        {empresa=="002" &&<Avatar src={LogoYarabamba} sx={{ width: 200, height: 200}}/>}
        <Loading open={openLoading} label={"Iniciando Sesion"}></Loading>
        </div>
        <br />
        <Select labelId="label" value={empresa} onChange={selectEmpresa} sx={{ width: 250}} color="success">
          <MenuItem value="001">Cayaltí</MenuItem>
          <MenuItem value="002">Yarabamba</MenuItem>
        </Select>
        <br />
        <br />
        <Box>
        <TextField  
        sx={{ width: 250}} 
        autoFocus
        onChange={event => setUsuario(event.target.value.toUpperCase())} 
        label="Usuario" 
        variant="outlined" 
        color="success" />
        <br />
        <br />
        <PasswordField onChange={(event) => setPassword(event.target.value)}/>
         <br />
        </Box>
        
        <br />
        <Button variant="contained"  sx={{ width: 250}} color="success" onClick={() => {IniciarSesion()}}>Ingresar</Button>    
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {alert}
        </Alert>
      </Snackbar>
    </div>
      }
    </div>
    

  )
}













