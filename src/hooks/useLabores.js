import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getLaboresService } from "../services/offline/labores";

export default function useLabores() {
    const [ labores, setLabores ] = useState([]);

    const getLabores = (id_actividad) => {
        getLaboresService({id_actividad})
            .then((response)=>{
                setLabores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        labores,
        getLabores
    }
}