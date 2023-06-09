import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getLaboresService,
         getById as getLaborByIdService } from "../services/offline/labores";

export default function useLabores() {
    const [ labores, setLabores ] = useState([]);
    const [ labor, setLabor ] = useState([]);

    const getLabores = (id_actividad) => {
        getLaboresService({id_actividad})
            .then((response)=>{
                setLabores(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    const getLaborById = (id_labor) => {
        getLaborByIdService({id_labor})
            .then((response)=>{
                
                setLabor(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    const cambiarLabor = (newValue) => {
        if(newValue!=null){
          setLabor(newValue) 
                  
        }else{
          setLabor("");
        }
      };
    return {
        labores,
        labor,
        setLabor,
        setLabores,
        getLabores,
        getLaborById,
        cambiarLabor
    }
}