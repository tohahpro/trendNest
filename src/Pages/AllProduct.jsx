import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

import { TbListDetails } from "react-icons/tb";

import FeaturedProducts from "../Components/FeaturedProducts";
import { useEffect, useState } from "react";

const AllProduct = () => {

    const axiosPublic = useAxiosPublic()


    const { data: products = [] } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-products')
            return res.data
        }
    })


    // pagination 

    const { count } = useLoaderData()

    const [currentPage, setCurrentPage] = useState(0)

    console.log(count);

    const numberOfPages = Math.ceil(count / 20)

    const pages = [...Array(numberOfPages).keys()]

    console.log(pages);

    const [product, setProduct] = useState(products)

    const itemPerPages = 20

    useEffect(() => {
        fetch(`http://localhost:5000/products-pagination?page=${currentPage}&size=${itemPerPages}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [currentPage]);




    return (
        <div className="min-h-screen pt-32 mx-56">
            <Helmet>
                <title>TrendNest | Products</title>

            </Helmet>
            <div className="grid grid-cols-4 gap-10">
                {
                    product.map((item, idx) =>
                        item.status === 'accept' ?


                            <div key={idx}>
                                <div className="card card-compact bg-base-100 shadow-xl">
                                    <figure><img src={item.image} alt="Shoes" /></figure>
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

            <FeaturedProducts />



            <p>Current page : {currentPage + 1}</p>
            <div className="flex justify-center py-20">

                <div className="pagination">
                    {
                        pages.map(page =>
                            <button
                                className={currentPage === page ? 'selected' : ''}
                                onClick={() => setCurrentPage(page)} key={page}>{page + 1}</button>
                        )
                    }
                </div>
            </div>


        </div >
    );
};

export default AllProduct;