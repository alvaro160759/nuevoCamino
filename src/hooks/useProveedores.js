import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getProveedoresServices } from "../services/offline/proveedores";

export default function useProveedores() {
    const [ proveedores, setProveedores ] = useState([]);
    const getProveedores = () => {
        getProveedoresServices()
            .then((response)=>{
                setProveedores(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        proveedores,
        getProveedores
    }
}