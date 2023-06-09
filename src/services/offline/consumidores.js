import { localDataBase as db } from "../../data/localDataBase";



export const get = async () => {
    const empresa=localStorage.getItem("empresa");
    const data = await db.consumidoresMaquinaria
                            .where("idempresa")
                            .equals(empresa)
                            .toArray();              
    return data;
};

export const getById = async (id) => {

    const data = await db.consumidoresMaquinaria.get({ID:id})         
    return data;
};
