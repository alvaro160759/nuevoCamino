import { useState } from "react";
import { Dexie } from 'dexie';
import { registerMaquinaria as ParteMaquinariaService,
        updateById as updateParteMaquinariaService,
        anularParteMaq as anularParteMaquinariaService,
        getParteMaquinariaAll as getParteMaquinariaAllService,
        getAllPM as getAllPMService,
        getDetalle as getDetalleService,
        deleteById as DeleteService,
        updateParteMaq as updateService,
        getPartesEnviados as getPartesEnviadosService,
        getCombustible as getCombustibleService
} from "../services/offline/parteMaquinaria";
import { useNavigate } from "react-router-dom";

export default function useParteMaquinaria( ) {

    
    const navigate=useNavigate();
    const [ parteMaquinaria, setPartesMaq ] = useState([]); 
    const [ detalle, setDetalle ] = useState([]); 
    const [ combustible, setCombustible ] = useState([]); 

    const registrarParte = ({cabecera,detalle,user,combustible,onSuccess}) =>{
        ParteMaquinariaService(cabecera,detalle,user,combustible)
        .then((response)=>{
            onSuccess(response)
            //navigate(-1)
        })
        .catch( (e)=>{
            console.error(e);
        });
    };

    const updateParte = ({id,cabecera,detalle,onSuccess}) =>{
        
        
        updateParteMaquinariaService(id,cabecera,detalle)
        .then((response)=>{
            onSuccess(response)
            //navigate(-1)
        })
        .catch( (e)=>{
            console.error(e);
        });
    };

    const anularParteMaquinaria = ({idparte}) =>{

        anularParteMaquinariaService(idparte)
        .then((response)=>{
            //onSuccess(response)
            //navigate(-1)
        })
        .catch( (e)=>{
            console.error(e);
        });
    };

    const getParteMaquinariaAll = (fecha,idmaquina) => {
        getParteMaquinariaAllService(fecha,idmaquina)
            .then((response)=>{
                //console.log(response)
                setPartesMaq(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const getAllPartes = () => {
        getAllPMService()
            .then((response)=>{
                //console.log(response)
                setPartesMaq(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const getDetalleMaq = (idpartemaq) => {
        
        getDetalleService(idpartemaq)
            .then((response)=>{
                setDetalle(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const getCombustible = (idpartemaq) => {
        
        getCombustibleService(idpartemaq)
            .then((response)=>{
                //console.log(response)
                setCombustible(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const deleteParteMaq = (idpartemaq) => {
        
        DeleteService(idpartemaq)
            .then((response)=>{
                console.log(response)
                //setDetalle(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const updateParteMaq = (id,data) => {
        
        updateService(id,data)
            .then((response)=>{
                console.log(response)
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    const getParteMaquinariaEnviados = (fecha,idmaquina) => {
        getPartesEnviadosService(fecha,idmaquina)
            .then((response)=>{
                setPartesMaq(response);
            })
            .catch((e)=>{
                console.error(e);
            });
    };

    

    return {
        parteMaquinaria,
        detalle,
        combustible,
        setDetalle,
        getCombustible,
        updateParte,
        updateParteMaq,
        deleteParteMaq,
        anularParteMaquinaria,
        getDetalleMaq,
        registrarParte,
        getParteMaquinariaAll,
        getAllPartes,
        getParteMaquinariaEnviados
    }
}