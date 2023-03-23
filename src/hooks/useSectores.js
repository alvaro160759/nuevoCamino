import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getSectoresService } from "../services/offline/sectores";

export default function useSectores() {
    const [ sectores, setSectores ] = useState([]);

    const getSectores = ({id_fundo}) => {
        getSectoresService({id_fundo})
            .then((response)=>{
                setSectores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        sectores,
        getSectores
    }
}