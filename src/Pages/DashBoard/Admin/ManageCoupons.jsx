import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BsPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageCoupons = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const handleCoupon = e => {
        e.preventDefault()
        const discount = e.target.discount.value
        const coupon = e.target.coupon.value
        const description = e.target.description.value
        const endDate = e.target.end.value

        const couponData = {
            discount: discount,
            coupon: coupon,
            description: description,
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





    const { refetch, data: coupon = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons')
            return res.data
        }
    })

    console.log(coupon);

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

                axiosSecure.delete(`/coupon-delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: `Coupon Delete`,
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
            <div>
                <div className="lg:py-20 px-4 lg:px-56">
                    <div className="hidden md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                        <div className="md:flex w-40 items-center gap-6">
                            <label></label>
                            <label>Discount</label>

                        </div>
                        <div className="text-start pl-10 w-40">
                            Coupon
                        </div>
                        <div className="text-center pl-20 w-80">
                            Expiry Date
                        </div>
                        <div className="pr-10">
                            <label>Action</label>
                        </div>
                    </div>
                    <hr className="border border-black hidden md:flex" />
                    {
                        coupon.map((item, idx) =>
                            <div key={idx}>
                                <div className="grid md:flex items-center justify-between my-5 space-y-3 p-4 md:p-0 border md:border-none rounded-lg">

                                    <div className="md:flex w-40 items-center gap-3 pl-10">

                                        {item.discount}%

                                        {/* <p className="pt-2 w-36">{item.name}</p> */}
                                    </div>
                                    <div className="text-start w-60">
                                        {item.coupon}
                                    </div>
                                    <div >
                                        {item.endDate}
                                    </div>
                                    <div>
                                        <Link to={`/dashboard/coupon-update/${item._id}`} className="btn px-5  text-white bg-green-400"><BsPencilFill></BsPencilFill></Link>

                                        <button onClick={() => handleDelete(item._id)} className="btn px-5  text-white bg-[#FF3811]"><MdDelete></MdDelete></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

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
                            <label>Description</label> <br />
                            <input className='border w-full p-3 rounded-lg' type="text" name="description" />
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