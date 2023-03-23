import { localDataBase as db } from "../../data/localDataBase";

export const get = async () => {
    const empresa=localStorage.getItem("empresa");
    const data = await db.Maquinarias
                            .where("idempresa")
                            .equals(empresa)
                            .toArray();              
    return data;
};
