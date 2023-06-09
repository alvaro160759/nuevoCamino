import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getProveedoresServices,
         getById as getProveedorByIdServices } from "../services/offline/proveedores";

export default function useProveedores() {
    const [ proveedores, setProveedores ] = useState([]);
    const [ proveedor, setProveedor ] = useState([]);
    const getProveedores = () => {
        getProveedoresServices()
            .then((response)=>{
                setProveedores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    const getProveedorById= (id) => {
        getProveedorByIdServices(id)
            .then((response)=>{
                setProveedor(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const cambiarProveedor = (newValue) => {
    
        if(newValue!=null){
          console.log(newValue)
          setProveedor(newValue)  
        }else{
          setProveedor("");
        }
      };

    return {
        proveedores,
        proveedor,
        getProveedores,
        getProveedorById,
        cambiarProveedor
    }
}