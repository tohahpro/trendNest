import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useState } from "react";


const AdminRoute = ({ children }) => {


    const [role, setRole] = useState(null)
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate()

    const { user, loading, logout } = useContext(AuthContext)

    axiosPublic.get(`/user/${user?.email}`)
        .then(res => {
            setRole(res.data.role)
        })

    if (loading) {
        <div className="flex justify-center items-center h-[90vh]">
            <span className="loading loading-spinner text-warning"></span>
        </div>
    }

    if (user?.email && role === 'admin') {
        return children;

    }

    if (!user?.email && !role === 'admin') {
        logout()
        return navigate('/login')
    }
};

export default AdminRoute;