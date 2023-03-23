import { localDataBase as db } from "../../data/localDataBase";

export const get = async ({id_turno}) => {
    const data = await db.valvulas
                    .where("id_turno")
                    .equals(id_turno)
                    .toArray();
    return data;
};

export const getOne = async ({id_valvula}) => {
    const data = await db.valvulas
                    .where("id_valvula")
                    .equals(id_valvula)
                    .first();
    return data;
};
