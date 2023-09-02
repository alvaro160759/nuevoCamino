import { Box, Button, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { PasswordField } from "../../components/passwordField/PasswordField";
import { Alert } from "../../components/Alert/Alert";
import useLogin from "../../hooks/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/container";

function Login() { 
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [usuario,setUsuario]=useState('');
  const [password,setPassword]=useState(''); 
  const { logIn, errorLogin, isLoggedIn, handleCloseError } = useLogin();

  useEffect(() => {
    if (isLoggedIn) {
       navigate(from,  {replace: true});
    }
  }, [isLoggedIn])

  return (
    <Container
      title="LOGIN"
      description="Ingrese credenciales para ingresar"
    >
      <Box component="form" role="form">
        <Box mb={2}>
          <TextField 
            type="email" 
            size="medium" 
            fullWidth 
            label='usuario' 
            color="info" 
            onChange={event => setUsuario(event.target.value.toUpperCase())} 
            />
        </Box>
        <Box mb={2}>
          <PasswordField fullWidth onChange={(event) => setPassword(event.target.value)}/>
        </Box>
        <Box mt={4} mb={1}>
          <Button sx={{background:"linear-gradient(310deg, #2dce89, #2dcecc)",fontWeight:'bold'}} size="medium" fullWidth variant="contained"  
          onClick={(e) => {e.preventDefault(); logIn({usuario, password})}}
          >
            Ingresar
          </Button>
        </Box>

        <Box >
          <Snackbar
          sx={{ paddingBottom: 5 }}
          anchorOrigin={{vertical: "bottom",horizontal: "center"}}
          open={errorLogin !== null && errorLogin !== ''} 
          autoHideDuration={6000} 
          onClose={handleCloseError}>
          <Alert onClose={handleCloseError} severity="error" >
            {errorLogin}
          </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
