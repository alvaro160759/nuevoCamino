import { createContext, useState } from "react";

const Context = createContext();

export function AuthContextProvider({children}){
    const SESSION_NAME =import.meta.env.VITE_SESSION_NAME;
    const [auth, setAuth] = useState(
        () => JSON.parse(window.sessionStorage.getItem(`${SESSION_NAME}`))
    );

    return  <Context.Provider value={{auth, setAuth}}>
                {children}
            </Context.Provider>
}

export default Context;