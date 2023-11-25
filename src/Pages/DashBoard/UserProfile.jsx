import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";


const UserProfile = () => {

    const { user } = useContext(AuthContext)

    const axiosPublic = useAxiosPublic()
    const [role, setRole] = useState('')

    axiosPublic.get(`/user/${user?.email}`)
        .then(res => {
            setRole(res.data.role)
        })

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="p-10 bg-slate-200">
                <div className="flex justify-center">
                    <div>
                        <img className="w-24 h-24 rounded-full" src={user.photoURL} alt="" />
                        <p className="flex justify-center bg-lime-700 rounded-md mt-3 text-white font-medium"> {role?.toUpperCase()}</p>
                    </div>
                </div>
                <div className="mt-10">
                    <h3>Name : {user?.displayName}</h3>
                    <p>Email : {user?.email}</p>

                    <p>Last SignIn : {user?.metadata?.lastSignInTime
                    }</p>
                </div>


                <div className="p-10">
                    <h3 className="text-center">Membership</h3>
                    <div className="flex justify-center">
                        <Link to='/dashboard/user-payment'>
                            <button className="btn px-8 bg-red-500 text-white mt-8">Subscribe</button>
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    );
};


export default UserProfile;