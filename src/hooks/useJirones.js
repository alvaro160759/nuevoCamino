import { useState } from "react";
import { Dexie } from 'dexie';
import { get as getJironesService } from "../services/offline/jirones";

export default function useJirones() {
    const [ jirones, setJirones ] = useState([]);

    const getJirones = () => {
        getJironesService()
            .then((response)=>{
                setJirones(response);
            })
            .catch(Dexie.DexieError, (e)=>{
                console.error(e);
            });
    };

    return {
        jirones,
        getJirones
    }
}