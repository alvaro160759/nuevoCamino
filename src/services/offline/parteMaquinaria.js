import Dexie from "dexie";
import { localDataBase as db } from "../../data/localDataBase";

export const registerMaquinaria = async(cabecera, detalle,user,combustible) => {
    const empresa=localStorage.getItem("empresa");
    console.log(combustible)
    
    const cod_partemaq = await db.AC_PARTEMAQUINARIA
                .add({PROVEEDOR:cabecera.PROVEEDOR,IDCLIEPROV:cabecera.IDCLIEPROV,IDDOCUMENTO:cabecera.IDDOCUMENTO,IDCONSUMIDORMAQUINARIA:cabecera.IDCONSUMIDORMAQUINARIA,MAQUINA:cabecera.MAQUINA,
                    OPERARIO:cabecera.OPERARIO,IDOPERARIO:cabecera.IDOPERARIO,HORAS_TRAB:cabecera.HORAS_TRAB,HORAS_TRAB1:cabecera.HORAS_TRAB1,TURNO:cabecera.TURNO,IDTURNOTRABAJO:cabecera.IDTURNOTRABAJO,
                    TOTAL_COSTO:cabecera.TOTAL_COSTO,FORMAPAGO:cabecera.FORMAPAGO,AREA:cabecera.AREA,IDAREA:cabecera.IDAREA,COSTO_HORA:cabecera.COSTO_HORA,IDUSUARIO:user,ESTADO:'P',
                    FECHA:cabecera.FECHA, HORAINICIO:cabecera.HORAINICIO,HORAFINAL:cabecera.HORAFINAL,HOROMETROINICIAL:cabecera.HOROMETROINICIAL,HOROMETROFINAL:cabecera.HOROMETROFINAL,
                    TOTALAREA_TRAB:cabecera.TOTALAREA_TRAB,GLOSA:cabecera.GLOSA,IDCONSUMIDORIMPLEMENTO:cabecera.IDIMPLEMENTO,DESCIMPLEMENTO:cabecera.DESCIMPLEMENTO,DESCCONSUMIDOR:cabecera.DESCCONSUMIDOR,idempresa:empresa}
                );
    
    detalle.map((item,index)=>{

        db.AC_DPARTEMAQUINARIA
                .add({IDPARTEMAQ:cod_partemaq,ITEM:index,IDCONSUMIDOR:item.IDCONSUMIDOR,DESCRIPCION:item.DESCRIPCION,AREA_TRAB:item.AREA_TRAB,HORAINICIO:item.HORAINICIO,HORAFINAL:item.HORAFINAL,
                HOROMETROINICIAL:item.HOROMETROINICIAL,HOROMETROFINAL:item.HOROMETROFINAL,HORAS_TRAB:item.HORAS_TRAB,HORAS_TRAB1:item.HORAS_TRAB1,COSTO_HORA:item.COSTO_HORA,IDACTIVIDAD:item.IDACTIVIDAD,
                IDLABOR:item.IDLABOR,HOROMETRO_DIFERENCIA:item.HOROMETRO_DIFERENCIA,DSC_LABOR:item.DSC_LABOR,COSTO_TOTAL:item.COSTO_TOTAL,IDCUARTEL:item.IDCUARTEL,IDJIRON:item.IDJIRON,
                DESCJIRON:item.DESCJIRON,DESCCUARTEL:item.DESCCUARTEL
            }
                );

     });

     combustible.map((item,index)=>{
        
        db.AC_COMBUSTIBLE
                .add({IDPARTEMAQ:cod_partemaq,ITEM:index,IDCOMBUSTIBLE:item.IDCOMBUSTIBLE,DESCRIPCION:item.DESCRIPCION,CANTIDAD:item.CANTIDAD,IDMEDIDA:item.IDMEDIDA});

     })

    return cod_partemaq;
};

export const getParteMaquinariaAll = async(fecha,idmaquina) =>{
    const empresa=localStorage.getItem("empresa");
    if(idmaquina!=""){
        const res = await db.AC_PARTEMAQUINARIA
                        .where(["FECHA","IDCONSUMIDORMAQUINARIA","ESTADO","idempresa"])
                        .equals([fecha,idmaquina,'P',empresa])
                        .toArray();
            
        return res;
    }else{
        const res = await db.AC_PARTEMAQUINARIA
                        .where({FECHA:fecha,ESTADO:'P',idempresa:empresa}).toArray()
                        
                       
        return res;
    }
    
    
};

export const getPartesEnviados = async(fecha,idmaquina) =>{

    const empresa=localStorage.getItem("empresa");

    if(idmaquina!=""){
        const res = await db.AC_PARTEMAQUINARIA
                        .where(["FECHA","IDCONSUMIDORMAQUINARIA","ESTADO","idempresa"])
                        .equals([fecha,idmaquina,'A',empresa])
                        .toArray();
            
        return res;
    }else{
        const res = await db.AC_PARTEMAQUINARIA
                        .where({FECHA:fecha,ESTADO:'A',idempresa:empresa}).toArray()
                        
                       
        return res;
    }
    
    
};

export const getDetalle = async(id) =>{

            const res = await db.AC_DPARTEMAQUINARIA

                        .where('IDPARTEMAQ')
                        .equals(parseInt(id)) 
                        .toArray()                        
        return res;
};

export const getCombustible = async(id) =>{

    const res = await db.AC_COMBUSTIBLE

                .where('IDPARTEMAQ')
                .equals(parseInt(id)) 
                .toArray()                        
return res;
};

export const deleteById = async(id) =>{

    const res = await db.AC_PARTEMAQUINARIA

                .where('cod')
                .equals(parseInt(id)) 
                .delete() 
                
    const res2 = await db.AC_DPARTEMAQUINARIA

                .where('IDPARTEMAQ')
                .equals(parseInt(id)) 
                .delete() 

    const res3 = await db.AC_COMBUSTIBLE

                .where('IDPARTEMAQ')
                .equals(parseInt(id)) 
                .delete() 
                  
return "elemento eliminado: "+id;
};

export const updateParteMaq = async(id) =>{

    const res = await db.AC_PARTEMAQUINARIA.update(id,{ESTADO:'A'})
            
return "elemento actualizado: "+id;
};

