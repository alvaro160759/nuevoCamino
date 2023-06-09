import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getActividadServices ,
         getById as getActividadByIdServices} from "../services/offline/actividad";
import useLabores from "./useLabores";

export default function useActividad() {
    const [ actividades, setActividades ] = useState([]);
    const [ actividad, setActividad ] = useState([]);
    const { getLabores} = useLabores();
    const getActividades= () => {
        getActividadServices()
            .then((response)=>{
                setActividades(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getActividadById= (id) => {
        getActividadByIdServices(id)
            .then((response)=>{
                setActividad(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    

    return {
        actividades,
        actividad,
        getActividades,
        getActividadById,
        setActividad
    }
}