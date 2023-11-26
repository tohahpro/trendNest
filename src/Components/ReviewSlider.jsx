import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const ReviewSlider = ({ review }) => {


    console.log(review);

    return (
        <div>

            {
                review.length > 1 ?

                    <div className='hidden md:flex my-20'>
                        {
                            review.length > 0 ?

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
                                        review.map((item, idx) =>
                                            <div key={idx}>
                                                <SwiperSlide>
                                                    <div className='p-10 h-full bg-gray-200 shadow-xl'>
                                                        <div className='flex justify-center'>
                                                            <img className='w-32 rounded-full' src={item?.userPhoto} alt="" />
                                                        </div>
                                                        <div className='py-5 px-3 space-y-4'>
                                                            <h2 className='text-center text-3xl font-medium'>{item.userName}</h2>
                                                            <p className='text-center text-base font-medium'>{item.review}</p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </div>
                                        )
                                    }




                                </Swiper>
                                :
                                <>
                                    <div className='w-full h-60 flex items-center justify-center'>
                                        <p className='text-xl font-bold'>There are no review about this product</p>
                                    </div>

                                </>
                        }

                    </div> :

                    <div className='hidden md:flex my-20'>
                        {
                            review.length > 0 ?

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
                                        review.map((item, idx) =>
                                            <div key={idx}>
                                                <SwiperSlide>
                                                    <div className='p-10 h-full bg-blue-300'>
                                                        <div className='flex justify-center'>
                                                            <img src={item?.userPhoto} alt="" />
                                                        </div>
                                                        <div className='py-5 px-3 space-y-4'>
                                                            <h2 className='text-center text-3xl font-medium'>{item.userName}</h2>
                                                            <p className='text-center text-base font-medium'>{item.review}</p>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </div>
                                        )
                                    }




                                </Swiper>
                                :
                                <>
                                    <div className='w-full h-60 flex items-center justify-center'>
                                        <p className='text-xl font-bold'>There are no review about this product</p>
                                    </div>

                                </>
                        }

                    </div>
            }
            {/* <div className='hidden md:flex my-20'>
                {
                    review.length > 0 ?

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
                                review.map((item, idx) =>
                                    <div key={idx}>
                                        <SwiperSlide>
                                            <div className='p-10 h-full bg-blue-300'>
                                                <div className='flex justify-center'>
                                                    <img src={item?.userPhoto} alt="" />
                                                </div>
                                                <div className='py-5 px-3 space-y-4'>
                                                    <h2 className='text-center text-3xl font-medium'>{item.userName}</h2>
                                                    <p className='text-center text-base font-medium'>{item.review}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    </div>
                                )
                            }




                        </Swiper>
                        :
                        <>
                            <div className='w-full h-60 flex items-center justify-center'>
                                <p className='text-xl font-bold'>There are no review about this product</p>
                            </div>

                        </>
                }

            </div> */}

        </div>
    );
};

export default ReviewSlider;