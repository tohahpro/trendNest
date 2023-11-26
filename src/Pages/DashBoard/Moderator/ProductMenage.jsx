import { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const ProductMenage = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { refetch, data: products = [] } = useQuery({
        queryKey: ["products", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user?.email}`)
            return res.data;
        }
    })

    console.log(products);




    const handleFeatured = (item) => {
        axiosSecure.patch(`/product-featured/${item._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: `${item.name} set in Featured Products`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }


    return (
        <div>
            <div className="lg:py-20 px-4 lg:px-48">
                <div className="hidden md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                    <div className="md:flex justify-between items-center gap-6">
                        <label></label>
                        <label className="md:w-32">Name</label>

                    </div>
                    <div className="text-center pr-5 w-20">
                        Name
                    </div>
                    <div className="text-start w-20">Featured</div>
                    <div className="text-center w-20">Status</div>

                    <div className="pr-10">
                        <label>Action</label>
                    </div>
                </div>
                <hr className="border border-black hidden md:flex" />
                {
                    products.map((item, idx) =>
                        <div key={item._id}>
                            <div className="grid md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                                <div className="md:flex w-40 items-center gap-3">
                                    <div>{idx + 1}</div>
                                    {item.name}
                                </div>
                                <div className="text-center w-20">
                                    <Link className="btn">Details</Link>
                                </div>
                                {
                                    item?.role === 'featured' ?

                                        <div className="text-center w-20 btn" disabled>Featured</div>
                                        :
                                        <div onClick={() => handleFeatured(item)} className="text-center w-20 btn bg-green-400">Featured</div>
                                }



                                <div className="text-center pl-12 w-20">{item.status}</div>

                                <div>
                                    {
                                        item.status === 'accept' || item.status === 'reject' ? <button className="btn " disabled>Accept/Reject</button>
                                            :
                                            <Link to={`/dashboard/product-status-update/${item._id}`} className="btn px-5  text-white bg-red-400">Accept/Reject</Link>
                                    }



                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProductMenage;