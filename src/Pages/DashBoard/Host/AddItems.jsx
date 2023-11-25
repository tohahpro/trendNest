import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { TagsInput } from "react-tag-input-component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {


    const { user } = useContext(AuthContext)

    const [selected, setSelected] = useState([]);


    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()


    const onSubmit = async (data) => {

        // image upload to imageBB and then get url 
        const imageFile = { image: data.image[0] }
        const res = await axios.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }

        });
        if (res.data.success) {
            const productItem = {
                ownerName: user.displayName,
                ownerPhoto: user.photoURL,
                email: user.email,
                name: data.name,
                category: selected[0],
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            console.log(productItem);
            axiosSecure.post('/menu', productItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({

                            icon: "success",
                            title: "Your work has been saved",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard/my-products')
                    }
                })



        }

    }
    return (
        <div>
            <div className="mt-20 p-5 lg:p-20 bg-[#F3F3F3] mx-2 lg:mx-56">

                <div className="mb-8 flex justify-center">
                    <img className="w-20 h-20 rounded-full" src={user.photoURL} alt="" />
                </div>
                <div className="flex gap-10">
                    <div className="w-1/2">
                        <input type="text" value={user.displayName} className="input input-bordered input-info w-full " />
                    </div>
                    <div className="w-1/2">
                        <input type="text" value={user.email} className="input input-bordered input-info w-full " />
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="flex">Recipe name</label>
                        <input {...register("name", { required: true })}
                            required
                            type="text" placeholder="Type here" className="input input-bordered input-info w-full " />


                    </div>

                    <div className="md:flex gap-10 mt-5">
                        <div className="flex-1">
                            <label className="flex">Category</label>

                            <TagsInput
                                required
                                value={selected}
                                onChange={setSelected}
                                placeHolder="enter product category"
                                className="input input-bordered input-info w-full "
                            />
                        </div>
                        <div className="flex-1">
                            <label className="flex">Price</label>
                            <input {...register("price", { required: true })}
                                required
                                type="number" placeholder="Type here" className="input input-bordered input-info w-full " />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>

                        </label>
                        <textarea {...register("recipe")}

                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="w-full my-6">
                        <input {...register("image", { required: true })}
                            required
                            type="file" className="w-full" />
                    </div>

                    <input className="w-full btn mt-10 border" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddItems;