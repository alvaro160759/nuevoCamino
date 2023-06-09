import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const data = await db.Operarios
                    .toArray();                           
    return data;
};

export const getById = async (id) => {
    const data = await db.Operarios.get({ID:id});;
    var operador={ID:data.ID,DESCRIPCION:data.DESCRIPCION}         
    return operador;
};
