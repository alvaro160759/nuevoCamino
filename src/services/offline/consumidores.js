import { localDataBase as db } from "../../data/localDataBase";



export const get = async () => {

    const empresa=localStorage.getItem("empresa");
    //console.log(empresa);
    const data = await db.consumidoresMaquinaria
                            .where("idempresa")
                            .equals(empresa)
                            .toArray();              
    return data;
};