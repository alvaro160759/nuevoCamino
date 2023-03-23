import { localDataBase as db } from "../../data/localDataBase";

export const get = async ({id_actividad}) => {
    console.log(id_actividad)
    const data = await db.Labores
                    .where("IDACTIVIDAD")
                    .equals(id_actividad)
                    .toArray();
    return data;
};
