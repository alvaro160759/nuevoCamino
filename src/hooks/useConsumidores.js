import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getConsumidoresServices } from "../services/offline/consumidores";

export default function useConsumidores() {
    const [ consumidores, setConsumidores ] = useState([]);
    const getConsumidores = () => {
        getConsumidoresServices()
            .then((response)=>{
                setConsumidores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        consumidores,
        getConsumidores
    }
}