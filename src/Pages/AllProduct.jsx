import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllProduct = () => {

    const axiosPublic = useAxiosPublic()

    const { refetch, data: products = [], isPending: loading } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-products')
            return res.data
        }
    })

    console.log(products);

    return (
        <div>

        </div>
    );
};

export default AllProduct;