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
            <h3 className="text-4xl font-bold text-center pt-20"> Discount Coupon</h3>

            <div className="flex justify-center mt-10">
                <div className="p-10 border-2  flex justify-center">
                    <form onSubmit={handleCoupon}>
                        <div className=" space-y-3">
                            <div>
                                <label>Discount</label>
                                <input type="number" name="discount" className="border border-black w-full" />
                            </div>
                            <div>
                                <label>Coupon</label>
                                <input type="text" name="coupon" className="border border-black w-full" />
                            </div>

                            <div>
                                <label>Start Date</label>
                                <input type="date" name="start" className="border border-black w-full"></input>
                            </div>

                            <div>
                                <label>End Date</label>
                                <input type="date" name="end" className="border border-black w-full"></input>
                            </div>
                        </div>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageCoupons;