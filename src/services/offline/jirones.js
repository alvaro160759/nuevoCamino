import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const data = await db.Jirones
                    .toArray();
    return data;
};

export const getById = async (id) => {
    const data = await db.Jirones.get({ID:id})
    console.log(data);
    return data;
};
