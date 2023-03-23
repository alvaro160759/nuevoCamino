import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getAreasService } from "../services/offline/areas";

export default function useAreas() {
    const [ areas, setAreas ] = useState([]);
    const getAreas = ( ) => {
        getAreasService()
            .then((response)=>{
                setAreas(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        areas,
        getAreas
    }
}