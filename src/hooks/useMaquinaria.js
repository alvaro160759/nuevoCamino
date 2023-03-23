import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getMaquinariasServices } from "../services/offline/maquinarias";

export default function useMaquinaria() {
    const [ maquinarias, setMaquinarias ] = useState([]);
    const getMaquinarias = () => {
        getMaquinariasServices()
            .then((response)=>{
                setMaquinarias(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        maquinarias,
        getMaquinarias
    }
}