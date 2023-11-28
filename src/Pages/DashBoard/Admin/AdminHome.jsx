import { useContext } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);






const AdminHome = () => {




    const axiosSecure = useAxiosSecure()
    const { user, loading } = useContext(AuthContext)

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats');
            return res.data;
        }
    })

    console.log(stats);
    console.log(stats.users);


    const data = {
        labels: ['Users', 'Products', 'Orders'],
        datasets: [
            {
                label: 'total',
                data: [stats.users, stats.products, stats.orders],
                backgroundColor: [
                    'rgba(255, 8, 8, 1)',
                    'rgba(8, 8, 255, 1)',
                    'rgba(252, 217, 8, 1)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1,
            },
        ],
    }





    return (
        <div className="flex justify-center mt-20">
            <Helmet>
                <title>TrendNest | Admin Home</title>

            </Helmet>
            <div className="w-4/12">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default AdminHome;