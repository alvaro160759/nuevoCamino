import { localDataBase as db } from "../../data/localDataBase";

export const logIn = async ( { username }) => {
    //console.log(db.usuarios)
    const data = await db.Usuario
                        .where("usuario")
                        .equals(username)
                        .toArray();
    return data;
};
