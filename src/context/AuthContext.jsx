import React, { useState } from "react";

const Context = React.createContext({});

const EMPRESA_DEFAULT = "002";
const CULTIVO_DEFAULT =  " ";
const ETAPAFENOLOGICA_DEFAUÑT =  "";

export function AuthContextProvider({children}){
    const SESSION_NAME =import.meta.env.VITE_SESSION_NAME;
    const CACHE_EMPRESA =import.meta.env.VITE_CACHE_EMPRESA;
    const CACHE_CULTIVO =import.meta.env.VITE_CACHE_CULTIVO;
    const CACHE_ETAPAFENOLOGICA =import.meta.env.VITE_CACHE_ETAPAFENOLOGICA;
    
    const [auth, setAuth] = useState(
        () => JSON.parse(window.localStorage.getItem(`${SESSION_NAME}`))
    );
    const [empresa, setEmpresa] = useState(
        () => {
            const localStorageEmpresa = window.localStorage.getItem(`${CACHE_EMPRESA}`);
            if (!localStorageEmpresa){
                return EMPRESA_DEFAULT;
            }
            return localStorageEmpresa;
        }
    );

    const [cultivo, setCultivo] = useState(
        () => {
            const localStorageCultivo = window.localStorage.getItem(`${CACHE_CULTIVO}`);
            if (!localStorageCultivo){
                return CULTIVO_DEFAULT;
            }
            return localStorageCultivo;
        }
    );

    const [etapaFenologica, setEtapaFenologica] = useState(
        () => {
            const localStorageEtapaFenolgica = window.localStorage.getItem(`${CACHE_ETAPAFENOLOGICA}`);
            if (!localStorageEtapaFenolgica){
                return ETAPAFENOLOGICA_DEFAUÑT;
            }
            return localStorageEtapaFenolgica;
        }
    );

    const [aplicativo, setAplicativo] = useState("");
    
    return  <Context.Provider value={{auth, setAuth, cultivo, setCultivo, empresa, setEmpresa, aplicativo, setAplicativo, etapaFenologica , setEtapaFenologica}}>
                {children}
            </Context.Provider>
}

export default Context;
