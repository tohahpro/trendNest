import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const CouponUpdate = () => {


    const couponLoad = useLoaderData()
    console.log(couponLoad);

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleCoupon = e => {
        e.preventDefault()


        const discount = e.target.discount.value
        const coupon = e.target.coupon.value
        const description = e.target.description.value
        const endDate = e.target.end.value

        const couponUpdate = {
            discount: discount,
            coupon: coupon,
            description: description,
            endDate: endDate
        }

        console.log(couponUpdate);
        axiosPublic.patch(`/coupon-update/${couponLoad._id}`, couponUpdate)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `Coupon updated`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate('/dashboard/manage-coupon')
                }
            })
    }

    return (
        <div>
            <div className="md:mx-10 lg:mx-56 py-20">
                <form onSubmit={handleCoupon}>
                    <div className='flex gap-8 '>
                        <div className='w-1/2'>
                            <label>Discount</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="number" name="discount" defaultValue={couponLoad.discount} placeholder="Discount %" />
                        </div>
                        <div className='w-1/2'>
                            <label>Coupon</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="text" name="coupon" defaultValue={couponLoad.coupon} placeholder="coupon" required />
                        </div>
                    </div>


                    <div className='flex gap-8 '>
                        <div className='w-1/2'>
                            <label>Description</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="text" defaultValue={couponLoad.description} name="description" />
                        </div>
                        <div className='w-1/2'>
                            <label>End Day</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="date" name='end' />
                        </div>
                    </div>

                    <input type="submit" value="Booking" className='text-center w-full bg-[#96AE4A] btn text-white mt-10' />
                </form>
            </div>
        </div>
    );
};


export default CouponUpdate;