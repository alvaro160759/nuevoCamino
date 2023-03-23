import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getCombustiblesServices } from "../services/offline/combustibles";

export default function useCombustibles() {
    const [ combustibles, setCombustibles ] = useState([]);
    const getCombustibles = () => {
        getCombustiblesServices()
            .then((response)=>{
                setCombustibles(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        combustibles,
        getCombustibles
    }
}