import { useLoaderData } from "react-router-dom";
import { MdHowToVote } from "react-icons/md";
import { GoReport } from "react-icons/go";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import ReviewSlider from "./ReviewSlider";


const ProductDetails = () => {

    const productLoad = useLoaderData()
    const axiosPublic = useAxiosPublic()


    const { user } = useContext(AuthContext)


    const { refetch, data: review = []
    } = useQuery({
        queryKey: ["product-review", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/product-review/${productLoad._id}`)
            return res.data;
        }
    })



    const handleReview = (e) => {
        e.preventDefault()

        const review = e.target.review.value
        const rating = e.target.rating.value

        const userReview = {
            userPhoto: user.photoURL,
            userName: user.displayName,
            rating, review,
            productId: productLoad._id
        }

        axiosPublic.post('/product-reviews', userReview)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        title: 'Thanks For Your Review',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    e.target.reset();
                }
            })


    }


    return (
        <div className="mt-24 mx-96">
            <div>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure className="flex-1"><img className="w-96" src={productLoad.image} alt="Album" /></figure>
                    <div className="card-body flex-1">
                        <h2 className="card-title">{productLoad.name}</h2>
                        <p className="rounded-lg font-medium text-white py-1 bg-orange-300 w-1/5 text-center">{productLoad.category}</p>
                        <p>{productLoad.recipe}</p>
                        <div>
                            <p>Vote: 0</p>
                            <p>Report: 0</p>
                        </div>
                        <div className="card-actions">
                            <button className="btn px-4"><MdHowToVote></MdHowToVote> UpVote</button>
                            <button className="btn px-4"><GoReport /> Report</button>
                        </div>
                    </div>
                </div>
            </div>


            <section>
                <ReviewSlider review={review} />
            </section>


            <section className="mt-10">
                <h2 className="text-center text-2xl font-semibold">Review </h2>
                <div className="px-16 py-5 flex w-full">
                    <div>
                        <img className="w-32 rounded-lg" src={user.photoURL} alt="" />
                        <h3 className="py-4 text-base font-medium">{user.displayName}</h3>
                    </div>
                    <div className="flex-1 pl-10">
                        <form onSubmit={handleReview}>
                            <div className="flex flex-col mb-6">
                                <label>Rating</label>
                                <input type="number" name="rating" className="border-2 border-black  w-1/2 rounded-md px-3 py-1" />
                            </div>

                            <textarea name="review" className=" w-full border-2 border-black h-32 p-3 rounded-lg"
                                placeholder="Review Description
                                "></textarea>

                            <input type="submit" value="Review Submit" className="btn bg-green-400" />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;