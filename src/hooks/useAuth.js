import { useCallback, useContext } from "react";
import Context from "../context/AuthContext"

export const useAuth = ()=> {
    const SESSION_NAME = `${import.meta.env.VITE_SESSION_NAME}`;
    const { auth, setAuth } = useContext(Context);

    const setUserSesion = useCallback((user) => {
        window.sessionStorage.setItem(SESSION_NAME, JSON.stringify(user));
        setAuth(user);
    }, [setAuth]);

    const deleteUserSesion = useCallback(() => {
        window.sessionStorage.removeItem(SESSION_NAME);
        setAuth(null);
    }, [setAuth]);

    const updateUserModulo = useCallback(({ IDMODULO, MODULO, ICONO})=>{
            //actualiza las variables de user relacionadas a IDMODULO,  MODULO e ICONO.
        setAuth({...auth, 
            IDMODULOWEB: IDMODULO,
            DESC_MODULO : MODULO,
            ICONO: ICONO
        });

        window.sessionStorage.setItem(SESSION_NAME, JSON.stringify(auth));
    }, [auth, setAuth]);

    return {
        isLoggedIn  : Boolean(auth),
        user : auth,
        key_session: Boolean(auth) ? { IDCODIGOGENERAL: auth.dni, IDUSUARIO : auth.usuario, USR_NOMBRE: auth.nombre, id: auth.id} : null,
        //modulos : Boolean(auth) ? Object.values(auth.MODULOS) : [],
        setUserSesion,
        deleteUserSesion,
        updateUserModulo
    }
}