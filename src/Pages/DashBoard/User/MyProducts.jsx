import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { BsPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const MyProducts = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: menu = [] } = useQuery({
        queryKey: ["menu", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/menu?email=${user?.email}`)
            return res.data;
        }
    })


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/product-delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: `Order cancel`,
                                icon: "success",
                                showConfirmButton: false,
                                timer: 2500
                            });
                        }
                    })
            }
        })
    }


    return (
        <div>
            {menu.length}

            <div className="lg:py-20 px-4 lg:px-56">
                <div className="hidden md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                    <div className="md:flex justify-between items-center gap-6">
                        <label></label>
                        <label className="md:w-32">Image</label>

                    </div>
                    <div className="text-center pr-24 w-60">
                        Name
                    </div>
                    <div className="text-end pr-10 w-32">Status</div>
                    <div className="text-center w-20">Vote</div>
                    <div className="text-center  w-40">
                        Price
                    </div>
                    <div className="pr-10">
                        <label>Action</label>
                    </div>
                </div>
                <hr className="border border-black hidden md:flex" />
                {
                    menu.map((item, idx) =>
                        <div key={item._id}>
                            <div className="grid md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                                <div className="md:flex items-center gap-3">
                                    <div>{idx + 1}</div>
                                    {
                                        item.image && <img className="md:w-32 rounded-lg" src={item.image} alt="" />
                                    }

                                </div>
                                <div className="text-start pl-10 w-60">
                                    {item.name}
                                </div>
                                <div className="text-center pl-8 w-20">{item.status}</div>
                                <div className="text-center pl-16 w-20">10</div>
                                <div className="text-center pl-16 w-40">
                                    {item.price} $
                                </div>
                                <div>
                                    <Link to={`/dashboard/product-update/${item._id}`} className="btn px-5  text-white bg-green-400"><BsPencilFill></BsPencilFill></Link>

                                    <button onClick={() => handleDelete(item._id)} className="btn px-5  text-white bg-[#FF3811]"><MdDelete></MdDelete></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyProducts;