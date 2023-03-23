import { useEffect, useState } from "react";
import { Dexie } from 'dexie';
import { get as getValvulasService, 
         getOne as getValvulaService } from "../services/offline/valvulas";

export default function useValvulas({ idValvula, idTurno }) {
    const [ valvulas, setValvulas ] = useState([]);
    const [ valvula, setValvula] = useState(null);

    useEffect(() => {
        if (!idValvula){
            return;
        }
        getValvula({id_valvula: idValvula});
    }, [idValvula]);

    useEffect(() => {
        if (!idTurno){
            return;
        }

        getValvulas({id_turno: idTurno});
    }, [idTurno]);

    const getValvulas = ({id_turno}) => {
        getValvulasService({id_turno})
            .then((response)=>{
                setValvulas(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getValvula = ({id_valvula}) =>{
        getValvulaService({id_valvula})
            .then((response)=>{
                setValvula(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        valvulas,
        valvula
    }
}