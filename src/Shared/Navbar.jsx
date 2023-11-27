import { Link, NavLink } from "react-router-dom";
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import logo from './../../public/Logo.png'


const Navbar2 = () => {

    const [open, setOpen] = useState(false)
    const { user, logout } = useContext(AuthContext)



    return (
        <div>
            <nav className=" left-0 right-0 z-[2]           
                        fixed items-center justify-between lg:top-0 lg:left-0 lg:w-full lg:z-[10]  lg:px-56 shadow-md bg-white py-1">


                <div className="flex items-center justify-between">
                    <Link to='/'>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg lg:text-2xl font-bold text-[#2b2868] flex items-center"><img className="w-10 mr-2" src={logo} alt="" /><span className="text-[#96AE00]">
                                Trend</span>Nest</h2>
                        </div>
                    </Link>


                    <div className="lg:hidden justify-end text-2xl pr-2 text-slate-400" onClick={() => setOpen(!open)}>
                        {
                            open === true ? <BiMenuAltRight></BiMenuAltRight> : <BiMenu></BiMenu>
                        }
                    </div>

                    <div
                        className={`
                        absolute lg:flex flex-wrap mt-60 lg:m-0 w-full lg:w-fit p-6 lg:p-0 bg-white/90 border lg:border-none  duration-4000 ${open ? ' ' : 'hidden'} lg:static text-[#2b2868] lg:bg-transparent text-center  space-y-2 z-20`}
                    >
                        <ul className="lg:flex lg:gap-12 items-center  z-70 text-lg font-semibold">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/products"
                                    className={({ isActive, isPending }) =>
                                        isPending ? "pending" : isActive ? "text-[#96AE00]" : ""
                                    }
                                >
                                    Products
                                </NavLink>
                            </li>

                            <li className="flex justify-center mt-2 lg:mt-0 ">
                                <Link to='/dashboard/my-cart' className="relative">
                                    <span className="absolute -top-2 ml-1 bg-green-400 px-2 text-sm rounded-full text-center font-semibold">0</span>
                                    <AiOutlineShoppingCart className="text-2xl font-medium"></AiOutlineShoppingCart>
                                </Link>
                            </li>

                        </ul>

                        <div className="lg:ml-12">
                            {
                                user ?

                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            {
                                                user?.photoURL ?
                                                    <div className="w-12 h-12 rounded-full">
                                                        <img className="rounded-full" src={user?.photoURL} />
                                                    </div>
                                                    : ''
                                            }
                                        </label>
                                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 text-2xl font-medium bg-black/80 text-white">
                                            <li>
                                                <a className="justify-between">
                                                    {user?.displayName}
                                                </a>
                                            </li>
                                            <li>

                                                <Link to='/dashboard'>Dashboard</Link>
                                            </li>
                                            <li>
                                                <button className="py-2 px-3 hover:text-white" onClick={logout}>Logout</button>
                                            </li>

                                        </ul>
                                    </div>
                                    :
                                    <ul className="md:flex justify-center items-center gap-4">
                                        <li className="text-lg font-semibold pb-2">
                                            <NavLink
                                                to='/login'
                                                className={({ isActive, isPending }) =>
                                                    isPending ? "pending" : isActive ? "text-[#67B6F4] underline" : ""
                                                }
                                            >LogIn
                                            </NavLink>
                                        </li>


                                    </ul>

                            }
                        </div>

                    </div>
                </div>

            </nav >

        </div >
    );
};

export default Navbar2;