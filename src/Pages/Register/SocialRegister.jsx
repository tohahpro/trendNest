
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';






const SocialRegister = () => {

    const { google } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const location = useLocation()
    const navigate = useNavigate()


    const handleSocialLogin = (media) => {
        media()
            .then(res => {
                if (res.user) {
                    toast.success('Login successful')
                }
                const userInfo = {
                    email: res.user?.email,
                    name: res.user?.displayName,
                    role: 'user'
                }
                axiosPublic.post('/user-email', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state ? location.state : '/')
                    })




            })
            .catch(error => {
                return toast.error(error.message)
            })

    }

    return (
        <div>

            <div className="divider text-lg font-semibold">Continue With</div>
            <div className="flex gap-12">
                <div
                    onClick={() => handleSocialLogin(google)}
                    className="py-2 px-8 flex items-center gap-2 border rounded-md hover:cursor-pointer hover:shadow-2xl shadow-gray-300">
                    <FcGoogle className="text-2xl"></FcGoogle> <span className="text-lg font-medium">Google</span>
                </div>
            </div>
        </div>
    );
};

export default SocialRegister;