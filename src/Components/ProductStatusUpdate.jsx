import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";


const ProductStatusUpdate = () => {

    const data = useLoaderData()
    const navigate = useNavigate()

    console.log(data);

    const axiosSecure = useAxiosSecure()
    const handleUpdateStatus = (e) => {

        e.preventDefault()
        const status = e.target.productStatus.value;
        console.log(status);

        axiosSecure.put(`/product-status/${data._id}`, { status })
            .then(res => {
                console.log(res.data.modifiedCount);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `user Role has been delete`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate('/dashboard/manage-products')
                }
            })

    }


    return (
        <div>
            <div className='p-16 rounded-xl my-20  space-y-8 w-1/4 mx-auto bg-[#F8F8F8]'>
                <form onSubmit={handleUpdateStatus}>
                    <div className='flex gap-8 '>

                        <div className='w-full'>
                            <label>Update Product Status</label> <br />
                            <select name="productStatus" className="w-full py-2">
                                <option value="accept">Accept</option>
                                <option value="reject">Reject</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Update Role" className='text-center w-full bg-[#FF3811] btn text-white mt-5' />
                </form>

            </div>
        </div>
    );
};

export default ProductStatusUpdate;