import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EMPRESAS } from "../../data/empresas";
import { Select, MenuItem, Container, Typography, Box, Avatar, TextField, Button,  Alert, InputAdornment, IconButton  } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import LogoCayalti from '/src/assets/img/LogoCayalti.jpg';
import LogoYarabamba from '/src/assets/img/Yarabamba_Logo.jpeg';

import DialogSincronize from "../../components/dialog/DialogSincronize";

import LoadingButton from '@mui/lab/LoadingButton';
import useAuth from "../../hooks/useAuth";
import useSincronize from "../../hooks/useSincronize";
import SyncIcon from '@mui/icons-material/Sync';
import { Visibility, VisibilityOff } from "@mui/icons-material";


const nameApp = import.meta.env.VITE_APP_NAME;

export default function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [presionar, setPresionar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";
    const { empresa, asignarEmpresa, isLoggedIn, isLoginLoading, errorLogin, logIn } = useAuth();
    const { isOpenDialog, isLoadingSincroAsk, registrosTotales, registrosActuales, sincronizeAsk } = useSincronize();

    useEffect(() => {
      if (isLoggedIn) {
         navigate(from,  {replace: true});
      }
    }, [isLoggedIn])

    const verContraseña = () => {
      setShowPassword(!showPassword);
      
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      logIn({
        username:username.trim(), 
        password:password.trim()
      });
      window.localStorage.setItem("empresa", empresa);
      console.log(empresa)
    };

    const handleMouseDown = (e) => {
      e.preventDefault();
      
    };

    const sincronizar = (e) => {
      e.preventDefault();
      sincronizeAsk();
    };

    useEffect(() => {
      
    }, [])

    return (  
       <Container maxWidth="xs">
          <Button variant="contained" size = "small" color="success" sx={{position: "absolute", top: '12px', right:'12px', fontWeight: "bold"}} onClick={sincronizar}>
            <SyncIcon/>
            SINCRONIZAR
          </Button>
          <Box
            sx={{
              marginTop: 3,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          > 
            <Typography component="h1" variant="h5">
              <strong> { nameApp }</strong>
            </Typography>
            
            <Avatar sx={{ m: 1, width: 192, height : 192}} src={ empresa === '1' ? LogoCayalti : LogoYarabamba } />

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <Select
                  id="select-empresa"
                  value={empresa}
                  label="Empresa"
                  name="select-empresa"
                  size = "small"
                  fullWidth
                  onChange={(e)=>{ asignarEmpresa(e.target.value); }}
                >
                  {
                    EMPRESAS.map((empresa)=>{
                      return <MenuItem key={empresa.id} value={empresa.id}>{empresa.name}</MenuItem>
                    })
                  }
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                value = {username}
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                size="small"
                color="success"
                onFocus={()=>setPresionar(false)}
                onChange = {(e)=>{                  
                  setUsername(e.currentTarget.value);
                }}
              />
              <TextField
                margin="normal"
                value = {password}
                required
                inputProps={
                  {pattern:"[0-9]*",
                  inputMode: "numeric",                               
                }
                }  
                focused={presionar}              
                error={password.length<8 && presionar==true?true:false}
                helperText={password.length < 8 && presionar==true?"Clave debe tener 6 dígitos":""}
                fullWidth               
                label="Clave"                
                type={showPassword ? 'number' : 'password'}
                id="password"                                
                size="small"
                color="success" 
                onFocus={()=>setPresionar(true)}
                onChange = {(e)=>{                                   
                  if (e.target.value.length >= 0 && e.target.value.length <= 8) {
                    setPassword(e.target.value)        
                  }
                }}               

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={verContraseña} onMouseDown={handleMouseDown}  >
                        {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {
                (errorLogin !== "")
                  ? <Alert variant="filled" severity="error">{errorLogin}</Alert>
                  : <LoadingButton
                    loading = {isLoginLoading}
                    text = "INICIANDO..."
                    fullWidth
                    type="submit"
                    loadingPosition="start"
                    startIcon={<LoginIcon />}
                    variant="contained"
                    
                    sx={{ mt: 3, mb: 2 , background:'#2e7d32'}}
                  >
                    INGRESAR
                  </LoadingButton>
              }
            </Box>
          </Box>
          <DialogSincronize isOpen={isOpenDialog} isLoadingServer={isLoadingSincroAsk} progress={(registrosActuales / registrosTotales) * 100 }/>
       </Container> 
    );
}