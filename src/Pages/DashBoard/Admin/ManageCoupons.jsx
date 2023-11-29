import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const ManageCoupons = () => {

    const axiosPublic = useAxiosPublic()
    const handleCoupon = e => {
        e.preventDefault()
        const discount = e.target.discount.value
        const coupon = e.target.coupon.value
        const startDate = e.target.start.value
        const endDate = e.target.end.value

        const couponData = {
            discount: discount,
            coupon: coupon,
            startDate: startDate,
            endDate: endDate
        }

        console.log(couponData);
        axiosPublic.post('/coupons', couponData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: `Coupon publish`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    e.target.reset();
                }
            })

    }

    return (
        <div>
            <h3 className="text-4xl font-bold text-center pt-20"> Discount <span className="text-[#96AE4A]">Coupon</span></h3>



            <div className="md:mx-10 lg:mx-56 py-20">
                <form onSubmit={handleCoupon}>
                    <div className='flex gap-8 '>
                        <div className='w-1/2'>
                            <label>Discount</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="number" name="discount" placeholder="Discount %" />
                        </div>
                        <div className='w-1/2'>
                            <label>Coupon</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="text" name="coupon" placeholder="coupon" required />
                        </div>
                    </div>


                    <div className='flex gap-8 '>
                        <div className='w-1/2'>
                            <label>Start Date</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="date" name="start" />
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

export default ManageCoupons;