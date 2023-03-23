import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getImplementosServices } from "../services/offline/implementos";

export default function useImplemento() {
    const [ implementos, setImplementos ] = useState([]);
    const getImplementos = () => {
        getImplementosServices()
            .then((response)=>{
                setImplementos(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        implementos,
        getImplementos
    }
}