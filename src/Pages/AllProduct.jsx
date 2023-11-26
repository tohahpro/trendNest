import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllProduct = () => {

    const axiosPublic = useAxiosPublic()

    const { data: products = [] } = useQuery({
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