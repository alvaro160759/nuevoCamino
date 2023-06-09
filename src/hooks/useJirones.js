import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getJironesService,
         getById as getJironByIdServices } from "../services/offline/jirones";

export default function useJirones() {
    const [ jirones, setJirones ] = useState([]);
    const [ jiron, setJiron ] = useState([]);


    const getJirones = () => {
        getJironesService()
            .then((response)=>{
                setJirones(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getJironById= (id) => {
        getJironByIdServices(id)
            .then((response)=>{
                setJiron(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    const cambiarJiron = (newValue) => {
        if(newValue!=null){
          console.log(newValue)
          setJiron(newValue)
        }else{
          setJiron("");
        }
      };

    return {
        jirones,
        jiron,
        setJiron,
        cambiarJiron,
        getJirones,
        getJironById
    }
}