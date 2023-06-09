import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getConsumidoresServices,
         getById as getConsumidorByIdServices } from "../services/offline/consumidores";

export default function useConsumidores() {
    const [ consumidores, setConsumidores ] = useState([]);
    const [consumidor,setConsumidor]= useState([]);
    const getConsumidores = () => {
        getConsumidoresServices()
            .then((response)=>{
                setConsumidores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getConsumidorById= (id) => {
        getConsumidorByIdServices(id)
            .then((response)=>{
                console.log(response)
                setConsumidor(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    const cambiarConsumidor = (newValue) => {
        if(newValue!=null){
          console.log(newValue)
          setConsumidor(newValue)
          
        }else{
          setConsumidor("");
        }
      };

    return {
        consumidores,
        consumidor,
        setConsumidor,
        getConsumidores,
        getConsumidorById,
        cambiarConsumidor
    }
}