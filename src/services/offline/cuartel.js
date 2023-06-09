import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    
    const data = await db.Cuarteles.toArray();
    return data;
};

export const getById = async (id) => {
    const data = await db.Cuarteles.get({ID:id})
    console.log(data);
    return data;
};
