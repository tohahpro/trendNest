import { useQuery } from "@tanstack/react-query";
import FeaturedProducts from "../../Components/FeaturedProducts";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import banner from '../../assets/Imge/ecommerce_banner.jpg'

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
        <div className="">

            <Helmet>
                <title>TrendNest | Home</title>

            </Helmet>

            <section className="">
                <div className="min-h-screen" style={{ backgroundImage: `url(${banner})` }}>
                    {/* <div className="hero-overlay bg-opacity-60"></div> */}
                    <div className="flex justify-start min-h-screen items-center pl-32">
                        <div className="w-[500px]">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                            <button className="btn btn-primary">Get Started</button>
                        </div>
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