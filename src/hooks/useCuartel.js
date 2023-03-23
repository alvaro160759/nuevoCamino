import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getCuartelService } from "../services/offline/cuartel";

export default function useCuartel() {
    const [ cuarteles, setCuarteles ] = useState([]);

    const getCuarteles = () => {
        getCuartelService()
            .then((response)=>{
                setCuarteles(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        cuarteles,
        getCuarteles
    }
}