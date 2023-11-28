import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {

    const { user } = useContext(AuthContext)

    const axiosPublic = useAxiosPublic()

    const axiosSecure = useAxiosSecure()

    const [role, setRole] = useState('')

    const [member, setMember] = useState({})


    axiosPublic.get(`/user/${user?.email}`)
        .then(res => {
            setRole(res.data.role)
        })


    axiosSecure.get(`/payments/${user?.email}`)
        .then(res => {
            setMember(res.data)
        })

    // console.log(member)


    return (
        <div className="min-h-screen flex justify-center items-center">
            <Helmet>
                <title>TrendNest | Profile</title>

            </Helmet>
            <div className="p-10 bg-slate-200">
                <div className="flex justify-center">
                    <div>
                        <img className="w-24 h-24 ml-4 rounded-full" src={user.photoURL} alt="" />
                        <p className="flex justify-center bg-lime-700 rounded-md mt-3 px-4 py-1 text-white font-medium"> {role?.toUpperCase()}</p>
                    </div>
                </div>
                <div className="mt-10">
                    <h3>Name : {user?.displayName}</h3>
                    <p>Email : {user?.email}</p>

                    <p>Last SignIn : {user?.metadata?.lastSignInTime
                    }</p>
                </div>

                {
                    role === 'admin' || role === 'moderator' ?
                        ''

                        :
                        <div className="p-10">
                            <h3 className="text-center">Membership</h3>
                            <div className="flex justify-center mt-4">

                                {
                                    member.status ?
                                        <><p className="px-5 py-2 bg-green-500 rounded-lg text-white font-medium">{member.status}</p></>
                                        :
                                        <Link to='/dashboard/user-payment'>
                                            <button className="btn px-8 bg-red-500 text-white mt-8">Subscribe</button>
                                        </Link>
                                }


                            </div>
                        </div>
                }



            </div>
        </div>
    );
};


export default UserProfile;