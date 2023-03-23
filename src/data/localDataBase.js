import Dexie from 'dexie';
import { stores }  from './stores';

//const versionDB = 9;
const localDataBaseName = import.meta.env.VITE_DB_NAME;
export const localDataBase = new Dexie(localDataBaseName);

let storesCreated = {};
stores.forEach((o,i)=>{
    let definition = o.definition;
    if (Boolean(o.indexes?.length > 0)){
        definition = `${definition},${o.indexes.toString()}`;
    }
    
    storesCreated[o.storeName] = definition;
});

localDataBase.version(1).stores(storesCreated);

localDataBase.version(2).stores({
    Implementos: "++cod,id,descripcion"
});

localDataBase.version(4).stores({
    AC_PARTEMAQUINARIA: "++cod,IDPARTEMAQ,IDCLIEPROV,PROVEEDOR,IDDOCUMENTO,IDCONSUMIDORMAQUINARIA,MAQUINA,"+
    "OPERARIO,IDOPERARIO,HORAS_TRAB,HORAS_TRAB1,TURNO,IDTURNOTRABAJO,TOTAL_COSTO,FORMAPAGO,TOTALAREA_TRAB"+
    "AREA,IDAREA,COSTO_HORA,IDUSUARIO,ESTADO,FECHA,HORAINICIO,HORAFINAL,HOROMETROINICIAL,HOROMETROFINAL,GLOSA,IDCONSUMIDORIMPLEMENTO,DESCIMPLEMENTO,DESCCONSUMIDOR,[FECHA+ESTADO],[FECHA+IDCONSUMIDORMAQUINARIA+ESTADO]"
});

localDataBase.version(11).stores({
    AC_PARTEMAQUINARIA: "++cod,IDPARTEMAQ,IDCLIEPROV,PROVEEDOR,IDDOCUMENTO,IDCONSUMIDORMAQUINARIA,MAQUINA,"+
    "OPERARIO,IDOPERARIO,HORAS_TRAB,HORAS_TRAB1,TURNO,IDTURNOTRABAJO,TOTAL_COSTO,FORMAPAGO,TOTALAREA_TRAB"+
    "AREA,IDAREA,COSTO_HORA,IDUSUARIO,ESTADO,FECHA,HORAINICIO,HORAFINAL,HOROMETROINICIAL,HOROMETROFINAL,GLOSA,IDCONSUMIDORIMPLEMENTO,DESCIMPLEMENTO,DESCCONSUMIDOR,idmepresa,[FECHA+ESTADO+idempresa],[FECHA+IDCONSUMIDORMAQUINARIA+ESTADO+idempresa]",
    Combustibles:"++cod,id,descripcion,idmedida,idempresa",

});

