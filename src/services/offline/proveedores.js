import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const data = await db.Proveedores
                    .toArray();    
                            
    return data;
};

export const getById = async (id) => {    
    const data = await db.Proveedores.get({ID:id});   
    return data;
};
