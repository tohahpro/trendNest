import { Link, NavLink } from "react-router-dom";
import { BiMenu, BiMenuAltRight } from 'react-icons/bi';
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { AiOutlineShoppingCart } from 'react-icons/ai';





const Navbar = () => {

    const [open, setOpen] = useState(false)

    const { user, logout } = useContext(AuthContext)









    return (

        <nav className="lg:mx-56">
            <div className="flex items-center justify-between py-4">
                <h2 className="text-3xl font-bold">Logo</h2>
                <div className="md:hidden justify-end text-2xl text-black" onClick={() => setOpen(!open)}>
                    {
                        open === true ? <BiMenuAltRight></BiMenuAltRight> : <BiMenu></BiMenu>
                    }
                </div>

                <ul
                    className={`absolute md:flex items-center w-full md:w-fit mt-64 bg-white/50 md:m-0 p-6 md:p-0 lg:m-0 duration-2000
                        ${open ? ' ' : 'hidden'} md:static 
                        md:bg-transparent text-center gap-8 z-50`}>
                    <li className="text-xl font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className=" text-xl font-medium">
                        <NavLink
                            to="/"
                            className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                            }
                        >
                            Our Menu
                        </NavLink>
                    </li>
                    <li className="flex justify-center mt-2 lg:mt-0">
                        <Link to='/dashboard/my-cart' className="relative">
                            <span className="absolute -top-2 ml-1 bg-green-400 px-2 text-sm rounded-full text-center font-semibold">0</span>
                            <AiOutlineShoppingCart className="text-2xl font-medium"></AiOutlineShoppingCart>
                        </Link>
                    </li>

                    <>
                        {
                            user?.email ?
                                <>
                                    <div className="dropdown dropdown-end">
                                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                            {
                                                user?.photoURL ?
                                                    <div className="w-12 h-12 rounded-full border">
                                                        <img className="rounded-full" src={user?.photoURL} />
                                                    </div>
                                                    : ''
                                            }
                                        </label>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            <li><a>Settings</a></li>
                                            <li onClick={logout}>Logout</li>
                                        </ul>
                                    </div>

                                </>
                                :
                                <li className=" text-xl font-medium">
                                    <NavLink
                                        to="/"
                                        className={({ isActive, isPending }) =>
                                            isPending ? "pending" : isActive ? "text-[#FF444A] underline" : ""
                                        }
                                    >
                                        Login
                                    </NavLink>
                                </li>
                        }
                    </>

                </ul>
            </div>
        </nav >

    );
};

export default Navbar;