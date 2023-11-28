import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { MdHowToVote } from "react-icons/md";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useContext(AuthContext)



    const { data: products = [] } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-products')
            return res.data
        }
    })


    const handleVote = (item) => {
        const vote = {
            productId: item._id,
            email: user.email,
            vote: 1,

        }

        console.log(vote);
        axiosPublic.post('/product-vote', vote)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {

                    Swal.fire({
                        title: 'Thanks For Your Vote please reload page for update',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });

                }
            })

    }


    return (
        <div>
            <div>
                <h3 className="text-center my-16 text-4xl font-bold">Our Featured Products</h3>
            </div>
            <div className="grid grid-cols-4 gap-10">
                {
                    products.map((item, idx) =>
                        item?.role ?


                            <div key={idx + 1}>

                                <div className="card card-compact bg-base-100 shadow-xl">
                                    <figure className="h-40"><img className="h-40" src={item.image} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <div className="">
                                            <p className="rounded-md font-medium text-white py-1 bg-orange-300 w-1/5 text-center">{item.category}</p>
                                            <Link to={`/product-details/${item._id}`}>
                                                <h2 className="card-title">{item.name}</h2>
                                            </Link>

                                            <p>Price: {item.price} $</p>

                                        </div>
                                        <div className="card-actions flex justify-between">
                                            <button
                                                onClick={() => handleVote(item)}
                                                className="px-5 py-2 rounded-lg bg-green-400 flex items-center gap-1"><MdHowToVote />Upvote</button>

                                            {/* <button className="px-5 py-2 bg-green-400 rounded-lg flex items-center gap-1"><TbListDetails />Details</button> */}

                                        </div>
                                    </div>
                                </div >

                            </div>

                            :
                            <></>
                    )
                }
            </div >
        </div >
    );
};

export default FeaturedProducts;