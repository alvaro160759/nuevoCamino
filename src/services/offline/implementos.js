import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const data = await db.Implementos
                    .toArray();              
    return data;
};
