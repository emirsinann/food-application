import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    console.log(isAuthenticated);

    return (
        isAuthenticated
            ? <Outlet />
            : <Navigate to="login" state={{ from: location}} replace />
    );
};

export default RequireAuth;