import { useQuery } from "@tanstack/react-query";
import { MdDelete } from 'react-icons/md';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ReportMenage = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { refetch, data: report = [] } = useQuery({
        queryKey: ["products"],

        queryFn: async () => {
            const res = await axiosPublic.get(`/products`)
            return res.data;
        }
    })

    console.log(report);


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
        <div className="flex justify-center">
            <Helmet>
                <title>TrendNest | Report Menage</title>

            </Helmet>
            <div className="lg:py-20 px-4 w-3/6">
                <div className="hidden md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                    <div className="md:flex justify-between items-center gap-6">
                        <label></label>
                        <label className="md:w-40">Name</label>

                    </div>

                    <div className="text-end pr-10 w-32">Details</div>
                    <div className="pr-10">
                        <label>Action</label>
                    </div>
                </div>
                <hr className="border border-black hidden md:flex" />
                {
                    report.map((item, idx) =>
                        <div key={item._id}>
                            <div className="grid md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                                <div className="md:flex w-40 items-center gap-3">
                                    <div>{idx + 1} .</div>
                                    {item.name}
                                </div>

                                <div className="text-center pl-8 w-32">
                                    <Link to={`/product-details/${item._id}`} className="btn">Details</Link>
                                </div>
                                <div className="pr-10">
                                    <button onClick={() => handleDelete(item.productId)} className="btn px-5  text-white bg-[#FF3811]"><MdDelete></MdDelete></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ReportMenage;