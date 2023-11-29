import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const CouponSlide = () => {


    const axiosPublic = useAxiosPublic()

    const { data: coupon = [] } = useQuery({
        queryKey: ['coupons'],
        queryFn: async () => {
            const res = await axiosPublic.get('/coupons')
            return res.data
        }
    })

    console.log(coupon);
    return (
        <div className='lg:mx-64 py-20'>
            <div className='hidden md:flex'>
                {
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={60}
                        slidesPerView={2}
                        autoplay={true}
                        // navigation
                        pagination={{ clickable: true }}
                    >



                        {
                            coupon.map((item, idx) =>
                                <div key={idx + 1}>
                                    <SwiperSlide>
                                        <div className='p-10 h-full bg-gray-200 shadow-xl'>

                                            <div className='py-5 px-3 space-y-4'>
                                                <div className='flex justify-center'>
                                                    <div className='w-40 h-40 rounded-full border-2 border-black flex items-center justify-center'>
                                                        <div>
                                                            <h2 className='text-center text-5xl font-medium'>{item.discount}%</h2>
                                                            <p className='text-center text-3xl font-light'>OFF</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <p className='text-center text-3xl font-light'>Coupon : {item.coupon}</p>
                                                    <p className='text-center'>{item.description}</p>
                                                    <p className='text-center'>Expiry Date: {item.endDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            )
                        }




                    </Swiper>
                }
            </div>




            <div className='flex md:hidden'>
                {
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, A11y, Autoplay]}
                        spaceBetween={60}
                        slidesPerView={1}
                        autoplay={true}
                        // navigation
                        pagination={{ clickable: true }}
                    >



                        {
                            coupon.map((item, idx) =>
                                <div key={idx + 1}>
                                    <SwiperSlide>
                                        <div className='p-10 h-full bg-gray-200 shadow-xl'>

                                            <div className='py-5 px-3 space-y-4'>
                                                <div className='flex justify-center'>
                                                    <div className='w-40 h-40 rounded-full border-2 border-black flex items-center justify-center'>
                                                        <div>
                                                            <h2 className='text-center text-3xl font-medium'>{item.discount}%</h2>
                                                            <p className='text-center text-3xl font-light'>OFF</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    <p className='text-center text-lg font-light border border-black my-4'>Coupon : {item.coupon}</p>
                                                    <p className='text-center'>{item.description}</p>
                                                    <p className='text-center'>Expiry Date: {item.endDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            )
                        }




                    </Swiper>
                }
            </div>
        </div>
    );
};

export default CouponSlide;