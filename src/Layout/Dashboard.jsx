import { NavLink, Outlet } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Dashboard = () => {

    const [role, setRole] = useState(null)
    const axiosPublic = useAxiosPublic()

    const { user } = useContext(AuthContext)

    axiosPublic.get(`/user/${user?.email}`)
        .then(res => {
            setRole(res.data.role)
        })


    return (
        <div className="min-h-screen">

            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <div className="flex justify-end pr-2">
                        <label htmlFor="my-drawer-2" className="absolute p-2 rounded-lg border top-3 lg:hidden"><BiMenu></BiMenu></label>
                    </div>
                    <Outlet />

                </div>

                {/* navbar  */}

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content text-lg font-semibold">


                        {
                            role === 'admin' ?
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/admin-home"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                            }
                                        >
                                            Admin Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                            }
                                        >
                                            Manage Users
                                        </NavLink>
                                    </li>
                                </>
                                :

                                <>

                                </>
                        }


                        {
                            role === 'moderator' ?

                                <>

                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                            }
                                        >
                                            Manage Products
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to="/dashboard/manage-users"
                                            className={({ isActive, isPending }) =>
                                                isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                            }
                                        >
                                            Manage Reports
                                        </NavLink>
                                    </li>
                                </>
                                :
                                <></>
                        }


                        <li>
                            <NavLink
                                to="/dashboard/add-item"
                                className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                }
                            >
                                Add Products
                            </NavLink>
                        </li>

                        <li><NavLink to='/'>Home</NavLink></li>
                        <div className="">
                            <li>
                                <NavLink to='/dashboard/my-profile'>My Profile</NavLink>
                            </li>

                        </div>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;