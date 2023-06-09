import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getMaquinariasServices,
         getById as getMaquinaByIdServices
        } from "../services/offline/maquinarias";

export default function useMaquinaria() {
    const [ maquinarias, setMaquinarias ] = useState([]);
    const [ maquina, setMaquina ] = useState([]);
    const [costoHora,setCostoHora]=useState('');

    const getMaquinarias = () => {
        getMaquinariasServices()
            .then((response)=>{
                setMaquinarias(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const getMaquinaById= (id) => {
        getMaquinaByIdServices(id)
            .then((response)=>{
                setMaquina(response);
                setCostoHora(parseFloat(response.COSTO_MOF).toFixed(2))

            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const cambiarMaquina = (newValue) => {
        if(newValue!=null){
          setMaquina(newValue)  
          setCostoHora(parseFloat(newValue.COSTO_MOF).toFixed(2))     
        }else{
          setMaquina("");
        }
      }; 

    return {
        maquinarias,
        maquina,
        costoHora,
        setCostoHora,
        setMaquina,
        getMaquinarias,
        getMaquinaById,
        cambiarMaquina
    }
}