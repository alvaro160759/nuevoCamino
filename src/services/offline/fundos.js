import { localDataBase as db } from "../../data/localDataBase";

export const get = async ( { id_tipo_cultivo }) => {
    const data = await db.fundos
                        .where("id_tipo_cultivo")
                        .equals(id_tipo_cultivo)
                        .toArray();
    return data;
};
