import { NavLink, Outlet } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';

const Dashboard = () => {



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
                    <ul className="menu p-4 w-52 md:w-80 min-h-full bg-base-200 text-base-content">

                        <li><NavLink to='/'>Home</NavLink></li>
                        <div className="">
                            <li>
                                <NavLink to='/dashboard/profile'>Profile</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/add-item'>Add Item</NavLink>
                            </li>
                        </div>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default Dashboard;