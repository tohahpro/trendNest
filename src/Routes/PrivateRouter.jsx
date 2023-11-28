import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoute = ({ children }) => {

    const location = useLocation()
    const { user, loading } = useContext(AuthContext)


    if (loading) {
        <div className="flex justify-center items-center h-[90vh]">
            <span className="loading loading-spinner text-warning"></span>
        </div>
    }

    if (!loading && !user?.email) {
        return <Navigate state={location.pathname} to="/login" replace></Navigate>

    }
    return children;

};


export default PrivateRoute;