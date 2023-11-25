import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import { Link } from "react-router-dom";
import { BsPencilFill } from 'react-icons/bs';
// import { MdDelete } from 'react-icons/md';




const ManageUsers = () => {

    const axiosSecure = useAxiosSecure()






    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            });
            return res.data
        }
    })




    return (
        <div>
            {users.length}

            <div className="lg:py-20 px-4 lg:px-56">
                <div className="hidden md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                    <div className="md:flex justify-between items-center gap-6">
                        <label></label>
                        <label className="md:w-32">Email</label>

                    </div>
                    <div className="text-center pr-20 w-60">
                        Name
                    </div>
                    <div className="text-center pr-8 w-40">
                        Role
                    </div>
                    <div className="mr-10">
                        <label>Action</label>
                    </div>
                </div>
                <hr className="border border-black hidden md:flex" />
                {
                    users.map((item, idx) =>
                        <div key={item._id}>
                            <div className="grid md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                                <div className="md:flex w-60 items-center gap-3">
                                    <div>{idx + 1} .</div>
                                    <p>{item.email}</p>
                                </div>
                                <div className="text-start w-60">
                                    {item.name}
                                </div>
                                <div className="text-start w-40">
                                    {item?.role}
                                </div>
                                <div className="mr-2">

                                    <div>
                                        <Link to={`/dashboard/user-update/${item._id}`} className="btn px-5  text-white bg-green-400"><BsPencilFill></BsPencilFill></Link>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ManageUsers;