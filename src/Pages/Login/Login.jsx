import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "./SocialLogin";





const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const axiosPublic = useAxiosPublic()

    const navigate = useNavigate();
    const location = useLocation();
    const { Login } = useContext(AuthContext)


    const handleLogin = e => {
        e.preventDefault()


        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);


        Login(email, password)
            .then(res => {

                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    role: 'user'
                }
                axiosPublic.post('/user-email', userInfo)
                    .then(res => {

                        console.log(res.data)
                    })

                if (res.user) {
                    toast.success('Login successful')
                    navigate(location?.state ? location.state : '/')
                }



            })
            .catch(error => {
                return toast.error(error.message)
            })
    }



    return (
        <div className="bg-[#F8F8FC]">
            <div className="lg:mx-56 px-4 py-20">
                <div className="lg:flex p-0">
                    <div className="flex-1 flex items-center justify-center lg:justify-start">
                        <img src="" alt="" />
                    </div>
                    <div className="card flex-1 justify-between flex-shrink-0  lg:border my-40">
                        <div className="card-body">
                            <h1 className="text-4xl font-semibold text-center">Login</h1>

                            <form onSubmit={handleLogin}>
                                <div className='mx-auto p-8 space-y-3'>
                                    {/* email field  */}
                                    <div>

                                        <input className='border text-black w-full rounded-md p-3 my-2' type="text" name="email" placeholder='Type your email' required />
                                    </div>

                                    {/* password field  */}
                                    <div>

                                        <div className='flex relative'>
                                            <input className='border text-black w-full rounded-md p-3 my-2 ' type={showPassword ? 'text' : 'password'} name="password" placeholder='Type your password' required />
                                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-6 right-2 text-lg text-black" required>{showPassword ? <AiOutlineEye></AiOutlineEye> : <AiOutlineEyeInvisible></AiOutlineEyeInvisible>}</span>
                                        </div>

                                    </div>
                                    {/* <input type="submit" value="Login" className="p-3 btn border hover:cursor-pointer w-full  rounded-lg bg-[#BEAD8E] text-white" /> */}
                                    <button type="submit" className="p-3 btn border hover:cursor-pointer w-full  rounded-lg bg-[#BEAD8E] text-white">
                                        Login
                                    </button>

                                    <label className='mt-2'>Already Have Account ? Please  <Link to='/register'>
                                        <span className='text-blue-600'>
                                            <span className='underline'>Register</span>
                                        </span>
                                    </Link>

                                    </label>
                                    <SocialLogin />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;