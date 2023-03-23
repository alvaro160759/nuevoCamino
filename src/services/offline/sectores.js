import { localDataBase as db } from "../../data/localDataBase";

export const get = async ({id_fundo}) => {
    const data = await db.sectores
                    .where("id_fundo")
                    .equals(id_fundo)
                    .toArray();
    return data;
};
