import { useEffect, useState } from "react";
import { Dexie } from 'dexie';
import { stores } from "../data/stores";
import { sincronizeMaquinaria as sincronizeMaquinariaService} from "../services/online/sincronizeData";
import { registrarMasivo, clearMasivo } from "../services/offline/sincronizeData";

export default function useSincronize() {
    const [ isLoadingSincroAsk, setIsLoadingSincroAsk ] = useState(false);
    const [ registrosTotales, setRegistrosTotales ] = useState(0);
    const [ registrosActuales, setRegistrosActuales ] = useState(0);
    const [ isOpenDialog, setIsOpenDialog ] = useState(false);
    const TIEMPO_TRAS_COMPLETAR = 2; //segundos

    useEffect(() => {
        let timer;
        if (registrosTotales === registrosActuales){
            timer = setTimeout(()=>{
                setIsOpenDialog(false);
            }, TIEMPO_TRAS_COMPLETAR * 1000);
        }

        return ()=>{
            clearInterval(timer);
        };
    }, [registrosTotales, registrosActuales]);

    const sincronizeAsk = () => {
        setRegistrosTotales(0);
        setRegistrosActuales(0);
        setIsOpenDialog(true);
        setIsLoadingSincroAsk(true);
        sincronizeMaquinariaService()
            .then((respuesta) => {
                var response=respuesta.data
                setRegistrosTotales(response?.contador_registros);
                stores.forEach((o,i)=>{
                    if (o.sincronizeAsk === false){
                        return;
                    }
                    
                    const data = response[o.storeName];
                    console.log(data)
                    clearMasivo( { storeName: o.storeName })
                        .then(function(){
                            if (data && data.length){
                                const cantidadRegistros = data.length;
                                registrarMasivo({ data: data, storeName: o.storeName })
                                    .then(function(){
                                        setRegistrosActuales( (prev)=>{
                                            setIsOpenDialog(false);
                                            return prev + cantidadRegistros;
                                        })                                        
                                    })
                                    .catch(Dexie.BulkError, function(e){
                                        console.error(e.failures);
                                    });    
                            }
                        })
                        .catch(Dexie.DexieError, function(e){
                            console.error("Error al limpiar store. ", e);
                        })
                });

            })
            .catch(err => {
                alert("No se puede conectar con el servidor");
                setIsOpenDialog(false);
            })
            .finally(()=>{
                setIsLoadingSincroAsk(false);
            });
    };

    return {
        isLoadingSincroAsk,
        isOpenDialog,
        registrosTotales,
        registrosActuales,
        sincronizeAsk
    }
}