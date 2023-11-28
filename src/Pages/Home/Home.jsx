import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "../../Components/FeaturedProducts";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {

    const axiosPublic = useAxiosPublic()

    const { data: products = [] } = useQuery({
        queryKey: ["all-products"],

        queryFn: async () => {
            const res = await axiosPublic.get(`/all-products`)
            return res.data;
        }
    })






    return (
        <div className="pt-20">

            <Helmet>
                <title>TrendNest | Home</title>

            </Helmet>

            <section className="home-banner h-[35vh] lg:h-[60vh] w-full bg-center bg-cover">
                <div className="flex justify-center items-center h-full">
                    <div className="pb-16 space-y-3">
                        <h1 className="text-6xl font-semibold text-center">Welcome to <br /><span className="text-[#96AE00]">
                            Trend</span>Nest</h1>
                        <p className="w-[350px] text-xl text-center">Your Ultimate Destination for Chic Living, Fashion, and Beyond!</p>
                    </div>

                </div>
            </section >


            <section className="lg:mx-56 py-20">
                <div className="grid grid-cols-3 gap-10">
                    {
                        products.slice(0, 6).map((item, idx) =>
                            item.status === 'accept' ?


                                <div key={idx}>
                                    <div className="card card-compact bg-base-100 shadow-xl">
                                        <figure><img className="h-44" src={item.image} alt="Shoes" /></figure>
                                        <div className="card-body">
                                            <div className="space-y-3">
                                                <p className="rounded-md font-medium text-white py-1 bg-orange-300 w-1/5 text-center">{item.category}</p>
                                                <h2 className="card-title">{item.name}</h2>
                                                <p>Price: {item.price} $</p>

                                            </div>
                                            <div className="">

                                                <Link to={`/product-details/${item._id}`}>
                                                    <button className="w-full py-2 bg-green-400 rounded-lg flex items-center justify-center gap-1 "><TbListDetails />Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div >
                                </div>

                                :
                                <></>
                        )
                    }
                </div >

                <div className="flex justify-center py-10">
                    <Link to={'/products'}>
                        <p className=" text-center py-2 px-8 rounded-lg font-medium bg-green-400">Show All Products</p>
                    </Link>
                </div>
            </section>


            <section className="lg:mx-56 py-20">
                <FeaturedProducts />
            </section>


        </div >
    );
};

export default Home;