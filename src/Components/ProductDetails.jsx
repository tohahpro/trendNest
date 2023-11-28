import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

    const { user, loading } = useContext(AuthContext)



    // for get review 
    const { refetch, data: review = []
    } = useQuery({
        queryKey: ["product-review", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/product-review/${productLoad._id}`)
            return res.data;
        }
    })

    // for get vote 

    const { data: vote = [] } = useQuery({
        queryKey: ["product-vote", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/product-vote/${productLoad?._id}`)
            return res.data;
        }
    })


    const totalVote = vote.reduce((previous, current) => previous + current.vote, 0)

    const voteEmailFind = vote.find(item => item?.email === user?.email)

    const ownerEmail = productLoad?.email === user?.email


    // for get report 

    const { data: report = [] } = useQuery({
        queryKey: ["product-report"],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosPublic.get(`/product-report/${productLoad?._id}`)
            return res.data;
        }
    })



    const reportEmailFind = report.find(item => item.email === user?.email)


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



    // upVote 

    const handleVote = () => {
        const vote = {
            productId: productLoad._id,
            email: user.email,
            vote: 1,

        }
        axiosPublic.post('/product-vote', vote)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        title: 'Thanks For Your Vote please reload page for update',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });

                }
            })
    }


    const handleReport = () => {

        const report = {
            productName: productLoad.name,
            productId: productLoad._id,
            email: user.email,
            report: 1,

        }
        axiosPublic.post('/product-report', report)
            .then(res => {
                console.log(res.data.insertedId);
                if (res.data.insertedId) {
                    refetch()
                    Swal.fire({
                        title: 'Your report add please reload page for update',
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                    });

                }
            })
    }


    return (
        <div className="mt-24 mx-96">

            <Helmet>
                <title>TrendNest | Home</title>

            </Helmet>

            <div>
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure className="flex-1"><img className="w-96" src={productLoad.image} alt="Album" /></figure>
                    <div className="card-body flex-1">
                        <h2 className="card-title">{productLoad?.name}</h2>
                        <p className="rounded-lg font-medium text-white py-1 bg-orange-300 w-1/5 text-center">{productLoad?.category}</p>
                        <p>{productLoad.recipe}</p>
                        <div>
                            <p>Vote: {totalVote}</p>
                            <p>Report: {report?.length}</p>
                        </div>
                        <div className="card-actions">
                            {
                                voteEmailFind || ownerEmail ?

                                    <button disabled className="btn px-4"><MdHowToVote></MdHowToVote> UpVote</button>

                                    :
                                    <button onClick={handleVote} className="btn px-4"><MdHowToVote></MdHowToVote> UpVote</button>
                            }


                            {
                                reportEmailFind || ownerEmail ? <button disabled className="btn px-4"><GoReport /> Report</button>
                                    :
                                    <button onClick={handleReport} className="btn px-4"><GoReport /> Report</button>
                            }


                        </div>
                    </div>
                </div>
            </div>


            <section>
                <ReviewSlider review={review} />
            </section>


            <section className="mt-10">
                <h2 className="text-center text-2xl font-semibold">Review </h2>
                <div className="px-16 py-5 flex w-full border-2 border-black rounded-lg mb-20 mt-10">
                    <div className="flex items-center">
                        <div>
                            <img className="w-32 rounded-lg" src={user?.photoURL} alt="" />
                            <h3 className="py-4 text-base font-medium text-center">{user?.displayName}</h3>
                        </div>
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