export const stores = [
    
    { storeName: "Personal",                sincronizeAsk: true,    definition: "++id,dni,nombres_apellidos,rol,idplanilla,idempresa" },
    { storeName: "PuntoAcceso",             sincronizeAsk: true,    definition: "++id,id_idpuntoacceso,descripcion" },
    { storeName: "Usuario",                 sincronizeAsk: true,    definition: "++id,dni,nombres_apellidos,usuario,clave,idresponsable,idempresa" },
    { storeName: "Turno",                   sincronizeAsk: true,    definition: "++id,id_turno,descripcion",indexes : [ "[ID]"] },
    { storeName: "consumidoresMaquinaria",  sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION,idempresa", indexes : [ "[ID]"] },
    { storeName: "Maquinarias",             sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION,costoha_mof,costo_mof,idempresa" , indexes : [ "[idempresa+ID]"]},
    { storeName: "Jirones",                 sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION",indexes : [ "[ID]"] },
    { storeName: "Cuarteles",               sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION" ,indexes : [ "[ID]"]},
    { storeName: "Proveedores",             sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION", indexes : [ "[DESCRIPCION]"] },
    { storeName: "Actividades",             sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION",indexes : [ "[ID]"]  },
    { storeName: "Labores",                 sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION,IDACTIVIDAD" },
    { storeName: "Areas",                   sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION" },
    { storeName: "Operarios",               sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION,idempresa",indexes : [ "[ID]"] },
    { storeName: "Implementos",             sincronizeAsk: true,    definition: "++cod,id,descripcion,idempresa" },
    { storeName: "Combustibles",             sincronizeAsk: true,    definition: "++cod,id,descripcion,idmedida,idempresa" },

    { storeName: "AC_PARTEMAQUINARIA",      sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,NUMERO,PROVEEDOR,IDDOCUMENTO,MAQUINA,ACTIVIDAD,LABOR"+
                                                                                "OPERARIO,IDOPERARIO,HORAS_TRAB,HORAS_TRAB1,TURNO,IDTURNOTRABAJO,TOTAL_COSTO,FORMAPAGO,TOTALAREA_TRAB,"+
                                                                                "AREA,COSTO_HORA,IDUSUARIO,ESTADO,FECHA,HORAINICIO,HORAFINAL,HOROMETROINICIAL,HOROMETROFINAL,"+
                                                                                "GLOSA,TOTAL_MINUTOS,idempresa",
    indexes : [ "[FECHA+IDCONSUMIDORMAQUINARIA+ESTADO+idempresa]",
                    "[FECHA+ESTADO+idempresa]","[ESTADO+idempresa]",
              ] },

    { storeName: "AC_DPARTEMAQUINARIA",     sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,ITEM,CONSUMIDOR,AREA_TRAB,HORAINICIO,HORAFINAL,"+
                                                                                "HOROMETROINICIAL,HOROMETROFINAL,HORAS_TRAB,HORAS_TRAB1,COSTO_HORA,ACTIVIDAD,"+
                                                                                "LABOR,HOROMETRO_DIFERENCIA,COSTO_TOTAL,CUARTEL,JIRON",
    indexes : [ "[IDPARTEMAQ]"] },
    
    { storeName: "AC_COMBUSTIBLE",     sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,ITEM,IDCOMBUSTIBLE,DESCRIPCION,CANTIDAD,IDMEDIDA",
    indexes : [ "[IDPARTEMAQ]"] },
    
    
];