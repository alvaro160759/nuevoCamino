export const stores = [
    
    { storeName: "Personal",                sincronizeAsk: true,    definition: "++id,dni,nombres_apellidos,rol,idplanilla,idempresa" },
    { storeName: "PuntoAcceso",             sincronizeAsk: true,    definition: "++id,id_idpuntoacceso,descripcion" },
    { storeName: "Usuario",                 sincronizeAsk: true,    definition: "++id,dni,nombres_apellidos,usuario,clave,idresponsable,idempresa" },
    { storeName: "Turno",                   sincronizeAsk: true,    definition: "++id,id_turno,descripcion" },
    { storeName: "consumidoresMaquinaria",  sincronizeAsk: true,    definition: "++cod,id,descripcion,idempresa", indexes : [ "[idempresa]"] },
    { storeName: "Maquinarias",             sincronizeAsk: true,    definition: "++cod,id,descripcion,costoha_mof,costo_mof,idempresa" },
    { storeName: "Jirones",                 sincronizeAsk: true,    definition: "++cod,id,descripcion" },
    { storeName: "Cuarteles",               sincronizeAsk: true,    definition: "++cod,id,descripcion" },
    { storeName: "Proveedores",             sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION", indexes : [ "[DESCRIPCION]"] },
    { storeName: "Actividades",             sincronizeAsk: true,    definition: "++cod,id,descripcion" },
    { storeName: "Labores",                 sincronizeAsk: true,    definition: "++cod,ID,DESCRIPCION,IDACTIVIDAD" },
    { storeName: "Areas",                   sincronizeAsk: true,    definition: "++cod,id,descripcion" },
    { storeName: "Operarios",               sincronizeAsk: true,    definition: "++cod,id,descripcion,idempresa" },
    { storeName: "Implementos",             sincronizeAsk: true,    definition: "++cod,id,descripcion,idempresa" },
    { storeName: "Combustibles",             sincronizeAsk: true,    definition: "++cod,id,descripcion,idmedida,idempresa" },

    { storeName: "AC_PARTEMAQUINARIA",      sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,IDCLIEPROV,PROVEEDOR,IDDOCUMENTO,IDCONSUMIDORMAQUINARIA,MAQUINA,"+
                                                                                "OPERARIO,IDOPERARIO,HORAS_TRAB,HORAS_TRAB1,TURNO,IDTURNOTRABAJO,TOTAL_COSTO,FORMAPAGO,TOTALAREA_TRAB,"+
                                                                                "AREA,IDAREA,COSTO_HORA,IDUSUARIO,ESTADO,FECHA,HORAINICIO,HORAFINAL,HOROMETROINICIAL,HOROMETROFINAL,"+
                                                                                "GLOSA,IDCONSUMIDORIMPLEMENTO,DESCIMPLEMENTO,DESCCONSUMIDOR,idempresa" ,
    indexes : [ "[FECHA+IDCONSUMIDORMAQUINARIA+ESTADO+idempresa]",
                    "[FECHA+ESTADO+idempresa]"
              ] },

    { storeName: "AC_DPARTEMAQUINARIA",     sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,ITEM,IDCONSUMIDOR,DESCRIPCION,AREA_TRAB,HORAINICIO,HORAFINAL,"+
                                                                                "HOROMETROINICIAL,HOROMETROFINAL,HORAS_TRAB,HORAS_TRAB1,COSTO_HORA,IDACTIVIDAD,"+
                                                                                "IDLABOR,HOROMETRO_DIFERENCIA,DSC_LABOR,COSTO_TOTAL,IDCUARTEL,IDJIRON,DESCJIRON,DESCCUARTEL",
    indexes : [ "[IDPARTEMAQ]"] },
    
    { storeName: "AC_COMBUSTIBLE",     sincronizeAsk: false,    definition: "++cod,IDPARTEMAQ,ITEM,IDCOMBUSTIBLE,DESCRIPCION,CANTIDAD,IDMEDIDA",
    indexes : [ "[IDPARTEMAQ]"] },
    
    
];