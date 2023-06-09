import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const data = await db.Actividades
                    .toArray();
    return data;
};

export const getById = async (id) => {
    const data = await db.Actividades.get({ID:id});
    return data;
};
