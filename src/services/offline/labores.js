import { localDataBase as db } from "../../data/localDataBase";

export const get = async ({id_actividad}) => {
    const data = await db.Labores
                    .where("IDACTIVIDAD")
                    .equals(id_actividad)
                    .toArray();
    return data;
};

export const getById = async ({id_labor}) => {
    
    const data = await db.Labores.get({ID:id_labor});
    return data;
};
