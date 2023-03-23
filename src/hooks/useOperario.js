import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getOperarioServices } from "../services/offline/operario";

export default function useOperario() {
    const [ operarios, setOperarios ] = useState([]);
    const getOperarios = () => {
        getOperarioServices()
            .then((response)=>{
                setOperarios(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        operarios,
        getOperarios
    }
}