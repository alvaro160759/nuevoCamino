import Dexie from "dexie";
import { localDataBase as db } from "../../data/localDataBase";

export const registerMaquinaria = async(cabecera, detalle,user,combustible) => {
    const empresa=localStorage.getItem("empresa");
    
    const cod_partemaq = await db.AC_PARTEMAQUINARIA
                .add({PROVEEDOR:cabecera.PROVEEDOR,IDDOCUMENTO:cabecera.IDDOCUMENTO,MAQUINA:cabecera.MAQUINA,
                    ACTIVIDAD:cabecera.ACTIVIDAD,LABOR:cabecera.LABOR,OPERARIO:cabecera.OPERARIO,HORAS_TRAB:cabecera.HORAS_TRAB,HORAS_TRAB1:cabecera.HORAS_TRAB1,TURNO:cabecera.TURNO,
                    TOTAL_COSTO:cabecera.TOTAL_COSTO,FORMAPAGO:cabecera.FORMAPAGO,AREA:cabecera.AREA,COSTO_HORA:cabecera.COSTO_HORA,IDUSUARIO:cabecera.IDUSUARIO,ESTADO:'P',
                    FECHA:cabecera.FECHA, HORAINICIO:cabecera.HORAINICIO,HORAFINAL:cabecera.HORAFINAL,HOROMETROINICIAL:cabecera.HOROMETROINICIAL,HOROMETROFINAL:cabecera.HOROMETROFINAL,
                    TOTALAREA_TRAB:cabecera.TOTALAREA_TRAB,GLOSA:cabecera.GLOSA,idempresa:empresa,TOTAL_MINUTOS:cabecera.TOTAL_MINUTOS}
                );
    
    detalle.map((item,index)=>{

        db.AC_DPARTEMAQUINARIA
                .add({IDPARTEMAQ:cod_partemaq,ITEM:index,CONSUMIDOR:item.CONSUMIDOR,AREA_TRAB:item.AREA_TRAB,HORAINICIO:item.HORAINICIO,HORAFINAL:item.HORAFINAL,
                HOROMETROINICIAL:item.HOROMETROINICIAL,HOROMETROFINAL:item.HOROMETROFINAL,HORAS_TRAB:item.HORAS_TRAB,HORAS_TRAB1:item.HORAS_TRAB1,COSTO_HORA:item.COSTO_HORA,
                ACTIVIDAD:item.ACTIVIDAD,LABOR:item.LABOR,HOROMETRO_DIFERENCIA:item.HOROMETRO_DIFERENCIA,COSTO_TOTAL:item.COSTO_TOTAL,CUARTEL:item.CUARTEL,JIRON:item.JIRON,
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

export const getAllPM = async() =>{

    const empresa=localStorage.getItem("empresa");

    let table = db.AC_PARTEMAQUINARIA
    let result= await table.orderBy('FECHA').toArray();   
    let datos=[]
    
    result.map(item=>{
         if(item.ESTADO==='P' && item.idempresa===empresa){
                datos.push(item) ;            
         }
    })
    return datos;
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
                        .where({FECHA:fecha,idempresa:empresa}).toArray()
        
        let datos=[]

        res.map(item=>{
                if(item.ESTADO!='P' && item.idempresa===empresa){
                    datos.push(item) ;            
                }
        })
                  
        return datos;
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
                .delete();

    const res3 = await db.AC_COMBUSTIBLE

                .where('IDPARTEMAQ')
                .equals(parseInt(id)) 
                .delete();
                  
return "elemento eliminado: "+id;
};

export const updateParteMaq = async(id,data) =>{

    const res = await db.AC_PARTEMAQUINARIA.update(id,{IDPARTEMAQ:data.IDPARTEMAQ,NUMERO:data.NUMERO,ESTADO:'E'})
            
return "elemento actualizado: "+id;
};

export const anularParteMaq = async(id,data) =>{

    console.log(id)
    const res = await db.AC_PARTEMAQUINARIA.get({IDPARTEMAQ:id});
    const respuesta = await db.AC_PARTEMAQUINARIA.update(res.cod,{ESTADO:'A'});            
return "elemento anulado: "+res.cod;
};

export const updateById = async(id,cabecera,detalle) =>{

    console.log(id)
    const res = await db.AC_PARTEMAQUINARIA.update(parseInt(id),{ACTIVIDAD:cabecera.ACTIVIDAD,AREA:cabecera.AREA,COSTO_HORA:cabecera.COSTO_HORA,FECHA:cabecera.FECHA,FORMAPAGO:cabecera.FORMAPAGO,GLOSA:cabecera.GLOSA,
    HORAINICIO:cabecera.HORAINICIO,HORAFINAL:cabecera.HORAFINAL,HORAS_TRAB:cabecera.HORAS_TRAB,HORAS_TRAB1:cabecera.HORAS_TRAB1,HOROMETROINICIAL:cabecera.HOROMETROINICIAL,HOROMETROFINAL:cabecera.HOROMETROFINAL,
    IDDOCUMENTO:cabecera.IDDOCUMENTO,IDUSUARIO:cabecera.IDUSUARIO,LABOR:cabecera.LABOR,MAQUINA:cabecera.MAQUINA,OPERARIO:cabecera.OPERARIO,PROVEEDOR:cabecera.PROVEEDOR,TOTAL_COSTO:cabecera.TOTAL_COSTO,
    TOTAL_MINUTOS:cabecera.TOTAL_MINUTOS,TURNO:cabecera.TURNO,TOTALAREA_TRAB:cabecera.TOTALAREA_TRAB
    })

    db.AC_DPARTEMAQUINARIA.where('IDPARTEMAQ').equals(parseInt(id)).delete();

    detalle.map((item,index)=>{

        db.AC_DPARTEMAQUINARIA
                .add({IDPARTEMAQ:parseInt(id),ITEM:index,CONSUMIDOR:item.CONSUMIDOR,AREA_TRAB:item.AREA_TRAB,HORAINICIO:item.HORAINICIO,HORAFINAL:item.HORAFINAL,
                HOROMETROINICIAL:item.HOROMETROINICIAL,HOROMETROFINAL:item.HOROMETROFINAL,HORAS_TRAB:item.HORAS_TRAB,HORAS_TRAB1:item.HORAS_TRAB1,COSTO_HORA:item.COSTO_HORA,
                ACTIVIDAD:item.ACTIVIDAD,LABOR:item.LABOR,HOROMETRO_DIFERENCIA:item.HOROMETRO_DIFERENCIA,COSTO_TOTAL:item.COSTO_TOTAL,CUARTEL:item.CUARTEL,JIRON:item.JIRON,
            }
                );
     });
            
return "parte modificado: "+id;
};

