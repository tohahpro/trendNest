import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const UserUpdate = () => {


    const data = useLoaderData()
    const navigate = useNavigate()



    const axiosSecure = useAxiosSecure()
    const handleUpdateRole = (e) => {

        e.preventDefault()
        const role = e.target.userRole.value;


        axiosSecure.put(`/user-update/${data._id}`, { role })
            .then(res => {

                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `User Role has been Updated`,
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate('/dashboard/manage-users')
                }
            })

    }



    return (
        <div>
            <div className='p-16 rounded-xl my-20  space-y-8 w-1/4 mx-auto bg-[#F8F8F8]'>
                <form onSubmit={handleUpdateRole}>
                    <div className='flex gap-8 '>

                        <div className='w-full'>
                            <label>Update user Role</label> <br />
                            <select name="userRole" className="w-full py-2">
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <input type="submit" value="Update Role" className='text-center w-full bg-[#FF3811] btn text-white mt-5' />
                </form>

            </div>
        </div>
    );
};

export default UserUpdate;