import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getCuartelService,
         getById as getCuartelByIdServices } from "../services/offline/cuartel";

export default function useCuartel() {
    const [ cuarteles, setCuarteles ] = useState([]);
    const [ cuartel, setCuartel ] = useState([]);

    const getCuarteles = () => {
        getCuartelService()
            .then((response)=>{
                setCuarteles(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getCuartelById= (id) => {
        getCuartelByIdServices(id)
            .then((response)=>{
                setCuartel(response);
            })
            .catch( (e)=>{
                console.error(e);
            });
    };

    const cambiarCuartel = (newValue) => {
        if(newValue!=null){
          console.log(newValue)
          setCuartel(newValue)
        }else{
          setCuartel("");
        }
      };

    return {
        cuarteles,
        cuartel,
        setCuartel,
        cambiarCuartel,
        getCuarteles,
        getCuartelById
    }
}