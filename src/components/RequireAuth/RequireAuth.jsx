import { useLocation, Navigate, Outlet } from "react-router";
import {useAuth} from "../../hooks/useAuth";

export const RequireAuth  = ()=>{
    const { user } = useAuth();
    const location = useLocation();

    return (
        user ? <Outlet />
             : <Navigate  to = "/Login" state ={{from: location}} replace></Navigate>
    )
}