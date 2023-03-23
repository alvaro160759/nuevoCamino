import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getActividadServices } from "../services/offline/actividad";

export default function useActividad() {
    const [ actividades, setActividades ] = useState([]);
    const getActividades= () => {
        getActividadServices()
            .then((response)=>{
                setActividades(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        actividades,
        getActividades
    }
}