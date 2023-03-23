import { useCallback, useContext, useState, useEffect } from "react";
import Context from "../context/AuthContext"
import md5 from 'js-md5';
import { logIn as logInService } from "../services/offline/auth";

export default function useAuth() {
    const SESSION_NAME = `${import.meta.env.VITE_SESSION_NAME}`;
    const CACHE_CULTIVO = `${import.meta.env.VITE_CACHE_CULTIVO}`;
    const CACHE_EMPRESA = `${import.meta.env.VITE_CACHE_EMPRESA}`;
    const CACHE_ETAPAFENOLOGICA = `${import.meta.env.VITE_CACHE_ETAPAFENOLOGICA}`;

    const { auth, setAuth, empresa, setEmpresa, cultivo, setCultivo, aplicativo, setAplicativo, etapaFenologica, setEtapaFenologica} = useContext(Context);
    const [ stateLoading, setStateLoading] = useState({
        isLoading: false,
        error : ""
    });

    useEffect(()=>{
        if (stateLoading.error !== ""){
            setTimeout(()=>{
                setStateLoading({
                    ...stateLoading,
                    error: ""
                })
            }, 4000)
        }
    }, [stateLoading.error]);

    const logIn = useCallback(({
            username, password
        }) => {

        setStateLoading({
            isLoading: true,
            error: ""
        });

        const usernameCase = username.toUpperCase();
        const passwordCoded = md5(password);

        logInService({ username : usernameCase })
            .then(response => {

                if (!response.length){
                    setStateLoading({
                        isLoading: false,
                        error: "No existe este usuario."
                    });
                    return;
                }

                console.log(response[0])
                console.log(passwordCoded)
                const usuarioFound  = response[0];
                if (usuarioFound.clave !== passwordCoded.toUpperCase()){
                    setStateLoading({
                        isLoading: false,
                        error: "Clave incorrecta."
                    });
                    return;
                }
                
                setStateLoading({
                    isLoading: false,
                    error: ""
                });

                const usuario = {
                    dni_usuario : usuarioFound.dni_usuario,
                    usuario: usuarioFound.usuario, 
                    nombres_apellidos : usuarioFound.nombres_apellidos
                };

                window.localStorage.setItem(SESSION_NAME, JSON.stringify(usuario));
                setAuth(usuario);
            })
            .catch(err => {
                if (err){
                    window.localStorage.removeItem(SESSION_NAME);
                    setStateLoading({
                        isLoading : false,
                        error: err.message
                    });
                    setAuth(null);
                }
            });
       
    }, [setAuth]);
    

    const logOut = useCallback(() => {
        window.localStorage.removeItem(SESSION_NAME);
        setAuth(null);
    }, [setAuth]);

    const asignarEmpresa = (localEmpresa)=>{
        window.localStorage.setItem(CACHE_EMPRESA, localEmpresa);
        setEmpresa(localEmpresa);
    };

    const asignarCultivo = (localCultivo)=>{
        window.localStorage.setItem(CACHE_CULTIVO, localCultivo);
        setCultivo(localCultivo);
    };

    const asignarEtapaFenologica = (localEtapaFenologica)=>{
        window.localStorage.setItem(CACHE_ETAPAFENOLOGICA, localEtapaFenologica);
        setEtapaFenologica(localEtapaFenologica);
    };

    return {
        empresa, asignarEmpresa,
        cultivo, asignarCultivo,        
        aplicativo, setAplicativo,
        isLoggedIn  : Boolean(auth),
        user : auth,
        isLoginLoading : stateLoading.isLoading,
        errorLogin: stateLoading.error,
        logIn,
        logOut,
        etapaFenologica, asignarEtapaFenologica
    }
}