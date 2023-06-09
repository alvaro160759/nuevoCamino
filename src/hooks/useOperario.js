import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getOperarioServices,
         getById as getOperarioByIdServices } from "../services/offline/operario";

export default function useOperario() {
    const [ operarios, setOperarios ] = useState([]);
    const [ operador, setOperador ] = useState([]);
    const getOperarios = () => {
        getOperarioServices()
            .then((response)=>{
                setOperarios(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getOperarioById = (id) => {        
        getOperarioByIdServices(id)
            .then((response)=>{
                setOperador(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const cambiarOperario = (newValue) => {
        if(newValue!=null){
          console.log(newValue)
          setOperador(newValue)           
        }else{
          setOperador("");
        }
      }; 

    return {
        operarios,
        operador,
        getOperarios,
        getOperarioById,
        cambiarOperario
    }
}