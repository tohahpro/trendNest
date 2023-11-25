import axios from "axios";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'

})
const useAxiosSecure = () => {

    // const { logout } = useContext(AuthContext)
    // const navigate = useNavigate()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config

    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        // console.log('status error in the interceptor', error);
        // const status = error.response.status;

        // for 401 or 403 logout the user and move the user to the login page 
        // if (status === 401 || status === 403) {
        //     await logout();
        //     navigate('/login');
        // }

        return Promise.reject(error);
    })

    return axiosSecure
};

export default useAxiosSecure;