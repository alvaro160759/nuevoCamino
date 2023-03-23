import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getTurnoServices } from "../services/offline/turnos";

export default function useTurnoTrabajo() {
    const [ turnostrabajo, setTurnostrabajo ] = useState([]);

    const getTurnosTrabajo = () => {
        getTurnoServices()
            .then((response)=>{
                setTurnostrabajo(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        turnostrabajo,
        getTurnosTrabajo
    }
}