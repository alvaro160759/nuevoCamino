import { useCallback, useContext, useState, useEffect } from "react";
import Context from "../context/AuthContext"
import md5 from 'js-md5';
import { logIn as logInService } from "../services/Auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function useLogin() {
    const SESSION_NAME = `${import.meta.env.VITE_SESSION_NAME}`;
    const [error, setError ] = useState(null);
    const { isLoggedIn,setUserSesion } = useAuth();
    const navigate = useNavigate();

    const logIn = ({usuario, password}) => {

        setError('');
        const usernameCase = usuario;
        const passwordCoded = md5(password);
        
        const data={
            "usuario":usernameCase,
            "password":passwordCoded
        }
        logInService({ data })
            .then(response => {
                if (response.status==false){
                    setError(response.msg);
                    return;
                }

                const usuario = {
                    dni_usuario : response.dni,
                    usuario: response.usuario, 
                    nombre : response.nombre
                };

                setError(null)
                setUserSesion(usuario);
                navigate("/",{replace:true})
                
            })
            .catch(err => {
                if (err){
                    setError(err.message);
                }
            });
       
    }
    
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(null);
    };

    return {
        logIn,
        isLoggedIn,
        cargandoLogin : error === '',
        errorLogin: error,
        handleCloseError
    }
}